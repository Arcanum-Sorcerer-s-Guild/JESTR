import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStats = () => {
  const [successReservationData, setSuccessReservationData] = useState();
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);
  const [assetLists, setAssetLists] = useState([]);
  const [showSpanInput, setShowSpanInput] = useState(false)
  const [dateMessage, setDateMessage] = useState('All reservations on: ')
  const [timeFrame,setTimeFrame] = useState('day')
  const [operationalBarData,setOperationalBarData] = useState()
  const [schedulableData,setSchedulableData] = useState()
  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });



  useEffect(() => {
    ChartJS.register(ChartDataLabels,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
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
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((data) => {
        setAssetLists(data.d.results);
        })
  }, []);


  useEffect(()=> {
    if (assetLists.length > 0) {
      console.log(assetLists)
      let totalUnschedulable = assetLists.filter(asset => asset.Schedulable === false).length;
      let totalOperational = assetLists.filter(asset => asset.Schedulable === true && asset.Operational === true ).length;
      let totalUnOperational = assetLists.filter(asset => asset.Schedulable === true && asset.Operational === false).length;
    let assetBarData = [totalUnschedulable,totalOperational,totalUnOperational]
    if (assetLists.length > 0) {
      setOperationalBarData({
        labels: ['Unschedulable','Operational','Unavailable'],
        datasets: [
            {
              data: assetBarData,
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }

        ]
      })

    }
  }}, [assetLists])


  useEffect(() => {
    if (lists.length > 0) {

      let reservations = lists.filter(
        (reservation) =>
          reservation.date.startOf('day') >= dateRange.start.startOf('day') &&
          reservation.date.startOf('day') <= dateRange.end.startOf('day')
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
      setTimeFrame === 'span' 
      ? setDateRange({start:value,end:dateRange.end})
      : setDateRange({start:value,end:value})
    }
    if(name === 'end') {
      setDateRange({start:dateRange.start,end:value})
    }
  }

  const dateSpanChange = (e) => {

    if (e.target.name === 'day') {
      setDateRange({start:dateRange.start,end:dateRange.start})
      setDateMessage('All reservations on: ')
      setShowSpanInput(false)
      setTimeFrame('day')
    }
    if (e.target.name === 'week') {
      setDateRange({start:dateRange.start,end:dateRange.start.plus({day:7})})
      setDateMessage('All reservations a week from: ')
      setShowSpanInput(false)
      setTimeFrame('week')
    }
    if (e.target.name === 'year') {
      setDateRange({start:dateRange.start,end:dateRange.start.plus({year:1})})
      setDateMessage('All reservations a year from: ')
      setShowSpanInput(false)
      setTimeFrame('year')
    }
    if (e.target.name === 'span') {
      setDateMessage('All reservations between: ')
      setShowSpanInput(true)
      setTimeFrame('span')
    }

  }

  return (<>
    <div className="m-5">
      <div className="mb-5 mt-5 flex flex-col">
        <div>
        <h3 className="text-center text-2xl">Reservation Date Range Selection</h3>
          <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group"
          >
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="day"
              onClick={(e)=>dateSpanChange(e)}
            >
              Day
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="week"
              onClick={(e)=>dateSpanChange(e)}
            >
              Week
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="year"
              onClick={(e)=>dateSpanChange(e)}
            >
              Year
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="span"
              onClick={(e)=>dateSpanChange(e)}
            >
              Span
            </button>
          </div>
          <div>
            {dateMessage}
            <input name="start" type="date" defaultValue={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
            <input className={showSpanInput ? `visible` : `invisible`}name="end" type="date" defaultValue={dateRange.start.toFormat('yyyy-MM-dd')} min={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
          </div>
          </div>
      </div>
      <div className="flex flex-col text-center content-start">
      <h1 className="text-center text-4xl mb-5">Reservation Statistics</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
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
        </div>
      </div>
      <h1  className="text-center text-4xl mb-5 mt-5">Asset Statistics</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h3 className="text-2xl mb-2">Operational vs Non Operational</h3>
          <div>
            {operationalBarData ?              
            <Bar
              width={250}
              height={250}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend:false
                }

              }}
              data={operationalBarData}
            /> : <></>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminStats;