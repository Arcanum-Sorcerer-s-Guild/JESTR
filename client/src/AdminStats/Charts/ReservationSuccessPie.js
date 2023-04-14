import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReservationSuccessPie = ({dateRange,reserveList}) => {
  const [reservationSuccessData, setReservationSuccessData] = useState();

  useEffect(() => {
    ChartJS.register(ChartDataLabels,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
  });

  useEffect(() => {
    if (reserveList.length > 0) {

      let reservations = reserveList.filter(
        (reservation) =>
          reservation.date.startOf('day') >= dateRange.start.startOf('day') &&
          reservation.date.startOf('day') <= dateRange.end.startOf('day')
      );

      setReservationSuccessData({
        labels: ['Completed', 'Pending', 'Denied'],
        datasets: [
          {
            label: `Reservations from ${dateRange.start.toFormat(
              'MMM dd, yyyy'
            )} to ${dateRange.end.toFormat('MMM dd, yyyy')}}`,
            data: [
              reservations.filter((res) => res.status === 'Approved').length,
              reservations.filter((res) => res.status === 'Pending').length,
              reservations.filter((res) => res.status === 'Rejected').length,
            ],
            backgroundColor: [
              'rgba(60, 179, 113, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(60, 179, 113, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [dateRange, reserveList]);

  return(<>        <div className="flex flex-col">
  <h3 className="text-2xl mb-2">Completed vs Denied Reservations</h3>
  <div>
    {reservationSuccessData ? (
      <Pie
        width={250}
        height={250}
        options={{
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0;
              },
              color: 'black',
              formatter: Math.round,
              offset: -20,
              align: 'start',
            },
          },
        }}
        data={reservationSuccessData}
      />
    ) : (
      <></>
    )}
    </div>
    </div></>)


}

export default ReservationSuccessPie;
