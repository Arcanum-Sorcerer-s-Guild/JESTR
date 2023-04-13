import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStats = () => {
  const [successReservationData, setSuccessReservationData] = useState();
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });



  useEffect(() => {
    ChartJS.register(ChartDataLabels);
  });

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
      .then((res) => res.json())
      .then((data) => {
        setLists(
          data.d.results.map((reservation) => {
            return {
              date: DateTime.fromISO(reservation.EventDate).toLocal(),
              status: reservation.Status,
              squadron: reservation.Squadron,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      let reservations = lists.filter(
        (reservation) =>
          reservation.date.toFormat('MMM dd, yyyy') >= dateRange.start.toFormat('MMM dd, yyyy') &&
          reservation.date.toFormat('MMM dd, yyyy') <= dateRange.end.toFormat('MMM dd, yyyy')
      );

      setSuccessReservationData({
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
  }, [dateRange, lists]);

  const dateInputChange = (e) => {
    let name = e.target.name
    let value = DateTime.fromISO(e.target.value).toLocal()
    if(name === 'start') {
      setDateRange({start:value,end:dateRange.end})
    }
    if(name === 'end') {
      setDateRange({start:dateRange.start,end:value})
    }
    console.log(dateRange)
  }

  return (
    <>
      <h1 className="text-center text-4xl mb-5">Reservation Statistics</h1>
      <div className="mb-5 mt-5 flex flex-col">
        <h3 className="text-center text-2xl">Date Range Selection</h3>
          <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group"
          >
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
            >
              Day
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
            >
              Week
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
            >
              Year
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
            >
              Span
            </button>
          </div>
          <div>
            <input name="start" type="date" defaultValue={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
            <input name="end" type="date" defaultValue={dateRange.end.toFormat('yyyy-MM-dd')} min={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
          </div>

      </div>
      <div className="flex flex-col text-center content-start">
        <h3 className="text-2xl mb-2">Completed vs Denied Reservations</h3>
        <div>
          {successReservationData ? (
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
              data={successReservationData}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminStats;
