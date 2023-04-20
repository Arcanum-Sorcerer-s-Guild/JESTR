import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TwoDayTimeLineChart from './TwoDayTimeLineChart.js';
import { DateTime } from 'luxon';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [resArray, setResArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  const handleDateSelection = (e) => {
    setSelectedDate(DateTime.fromISO(e.target.value).toLocal());
  };

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      { credentials: 'include' }
    )
      .then((res) => res.json())
      .then((data) => {
        setResArray(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          })
        );
      });
    setSelectedDate(DateTime.now().toLocal());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-5 bg-gray-100 flex items-center justify-center bg-gray-100">
        <div className="w-full lg:w-5/6 shadow-xl">
          <div className="bg-blue-darker mb-4 relative rounded overflow-hidden flex justify-center pb-2">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <div className="flex flex-row gap-5 items-center">
              <button
                className="flex items-center gap-1  bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => setSelectedDate(selectedDate.minus({ Day: 1 }))}
              >
                <span>
                  <BiChevronLeft />
                </span>
                Previous
              </button>

              {selectedDate !== undefined ? (
                <input
                  type="date"
                  onChange={handleDateSelection}
                  value={selectedDate.toFormat('yyyy-MM-dd')}
                  className="border-none bg-gray-dark rounded-md text-gray-light"
                />
              ) : (
                <></>
              )}

              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => setSelectedDate(selectedDate.plus({ Day: 1 }))}
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

      <div className="bg-blue-darker rounded-lg shadow-xl mt-5 mr-40 ml-40 overflow-hidden flex justify-center">
        {selectedDate !== undefined ? (
          <>
            <TwoDayTimeLineChart
              resArray={resArray}
              selectedDate={selectedDate}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;

// <h1>Awesomeness</h1>
// <div>
//   <Pie
//     width={250}
//     height={250}
//     options={{ maintainAspectRatio: false }}
//     data={data}
//   />
// </div>

// export const data = {
//   labels: ['Brandon', 'David', 'Jacob', 'Jason', 'Joseph', 'Kyle'],
//   datasets: [
//     {
//       label: 'Awesomeness',
//       data: [12, 12, 12, 3, 12, 50],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
