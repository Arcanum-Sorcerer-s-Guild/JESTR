import React, { useRef, useState, useEffect } from 'react';
import 'chartjs-adapter-luxon';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TwoDayTimeLineChart = ({ resArray, selectedDate }) => {
  const [reservations, setReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [dataDayOne, setDataDayOne] = useState({});
  const [dataDayTwo, setDataDayTwo] = useState({});
  const [dateRange, setDateRange] = useState({
    start: DateTime.now(),
    end: DateTime.now().plus({ Day: 1 }),
  });
  const [sqColors, setSqColors] = useState({});
  const chartRef = useRef();
  // let startDay = selectedDate
  // let endDay = startDay.plus({Day:1})

  let colors = [
    '#36A2EB',
    '#FF6384',
    '#4BC0C0',
    '#9966FF',
    '#FFCD56',
    '#16F834',
    '#FF9F40',
  ];

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      { credentials: 'include' }
    )
      .then((res) => res.json())
      .then((data) => {
        setReservations(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          })
        );
        setAllReservations(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          })
        );
        let squadrons = [...new Set(data.d.results.map((res) => res.Squadron))];
        setSqColors(
          squadrons.reduce((acc, elem, index) => {
            return { ...acc, [elem]: colors[index] };
          }, {})
        );
      });
  }, []);

  const handleSquadronClick = (squadron) => {
    if (squadron === 'all') {
      setReservations(allReservations);
    } else {
      setReservations(
        allReservations.filter((res) => res.Squadron === squadron)
      );
    }
  };

  const onChartClick = (event) => {
    //   let element = getElementAtEvent(chartRef.current,event)
    //   console.log(element,reservations)
    //   // console.log(element)
    //   // console.log(reservations[element.index])
    //   // // if (element !== undefined) {
    //   //   //   if (element.index === 0) setAltRes(currRes)
    //   //   // else setAltRes(conflictArray[element.index -1])
    //   //   // setShowModal(true)
  };

  useEffect(() => {
    if (reservations.length > 0 && Object.keys(dateRange).length > 0) {
      let resDayOne = reservations
        .filter(
          (res) =>
            res.start.toFormat('dd MMM yyyy') ===
            dateRange.start.toFormat('dd MMM yyyy')
        )
        .sort((a, b) => {
          if (a.Squadron.toLowerCase() > b.Squadron.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });

      let resDayTwo = reservations
        .filter(
          (res) =>
            res.start.toFormat('dd MMM yyyy') ===
            dateRange.end.toFormat('dd MMM yyyy')
        )
        .sort((a, b) => {
          if (a.Squadron.toLowerCase() > b.Squadron.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });

      let labelsDayOne = resDayOne.map((res) => `${res.Squadron}: #${res.Id}`);
      let labelsDayTwo = resDayTwo.map((res) => `${res.Squadron}: #${res.Id}`);

      let dataArrayDayOne = resDayOne.map((res) => [
        res.start.toFormat('HH:mm'),
        res.end.toFormat('HH:mm'),
      ]);
      let dataArrayDayTwo = resDayTwo.map((res) => [
        res.start.toFormat('HH:mm'),
        res.end.toFormat('HH:mm'),
      ]);

      let colorsDayOne = resDayOne.map((res) => sqColors[res.Squadron]);
      let colorsDayTwo = resDayTwo.map((res) => sqColors[res.Squadron]);

      setDataDayOne({
        labels: labelsDayOne,
        datasets: [
          {
            backgroundColor: colorsDayOne,
            data: dataArrayDayOne,
          },
        ],
      });

      setDataDayTwo({
        labels: labelsDayTwo,
        datasets: [
          {
            backgroundColor: colorsDayTwo,
            data: dataArrayDayTwo,
          },
        ],
      });
    }
  }, [reservations, resArray, dateRange]);

  let options = {
    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        min: '06:00', //DateTime.now().toFormat('hh:mm'), //'2022-02-01',
        max: '18:00',
        type: 'time',
        time: { unit: 'hour' },
        grid: { color: '#5A5A5A' },
        stacked: true,
        ticks: { color: 'lime' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'lime' },
        grid: { color: '#5A5A5A' },
      },
    },
    elements: {
      bar: { borderWidth: 2 },
    },
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,
        text: ` Reservations`,
      },
    },
  };

  const handleDateSelection = (e) => {
    // setSelectedDate(DateTime.fromISO(e.target.value).toLocal());
  };

  // return(<></>)

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-5 bg-gray-100 flex items-center justify-center bg-gray-100">
          <div className="w-full lg:w-5/6 shadow-xl">
            <div className="bg-blue-darker mb-4 relative rounded overflow-hidden flex justify-center pb-2">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
              <div className="flex flex-row gap-5 items-center">
                <button
                  className="flex items-center gap-1  bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                  onClick={() =>
                    setDateRange({
                      start: dateRange.start.minus({ Day: 1 }),
                      end: dateRange.end.minus({ Day: 1 }),
                    })
                  }
                >
                  <span>
                    <BiChevronLeft />
                  </span>
                  Previous
                </button>

                <input
                  type="date"
                  onChange={handleDateSelection}
                  value={dateRange.start.toFormat('yyyy-MM-dd')}
                  className="border-none bg-gray-dark rounded-md text-gray-light"
                />

                <button
                  className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                  onClick={() =>
                    setDateRange({
                      start: dateRange.start.plus({ Day: 1 }),
                      end: dateRange.end.plus({ Day: 1 }),
                    })
                  }
                >
                  Next
                  <span>
                    <BiChevronRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="flex justify-center">
      <div className="bg-blue-darker w-full lg:w-5/6 rounded-lg shadow-xl flex justify-center">
        <div className="flex flex-col justify-center">
          
          <div className="flex flex-row justify-center flex-wrap ">
            <div className="flex flex-row flex-wrap w-5/6 gap-3 justify-center">
            {Object.keys(sqColors).length > 0 ? (
              Object.entries(sqColors).map((sq) => (
                <div
                  className="border border-black rounded-lg w-48 mt-3 text-center font-medium"
                  style={{ backgroundColor: sq[1] }}
                  onClick={() => handleSquadronClick(sq[0])}
                >
                  {sq[0]}
                </div>
              ))
            ) : (
              <></>
            )}
            </div>
          </div>


          <div className="flex flex-row justify-center mt-5 gap-32 bg-blue-darker mb-5 overflow-hidden">
            <div className="flex flex-col justify-center ">
              <h1 className="text-md text-primary bg-pink/25 rounded-lg px-10 text-gray-light uppercase text-center">
                {dateRange.start.toFormat('EEE dd MMM')}
              </h1>
              {Object.keys(dataDayOne).length > 0 ? (
                <Bar
                  width={500}
                  height={500}
                  options={options}
                  data={dataDayOne}
                  ref={chartRef}
                  onClick={onChartClick}
                />
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-md text-primary bg-pink/25 rounded-lg px-10 text-gray-light uppercase text-center">
                {dateRange.end.toFormat('EEE dd MMM')}
              </h1>
              {Object.keys(dataDayTwo).length > 0 ? (
                <Bar
                  width={500}
                  height={500}
                  options={options}
                  data={dataDayTwo}
                  ref={chartRef}
                  onClick={onChartClick}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            className="border border-black bg-bluer text-gray-light uppercase "
            onClick={() => {
              handleSquadronClick('all');
            }}
          >
            See All Squadrons
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default TwoDayTimeLineChart;
