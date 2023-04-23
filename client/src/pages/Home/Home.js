import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TwoDayTimeLineChart from './TwoDayTimeLineChart.js';
import { DateTime } from 'luxon';
import { listFetch } from '../../utils/api/endPoints.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  // const [resArray, setResArray] = useState([]);
  // const [selectedDate, setSelectedDate] = useState();

  // listFetch('Reservations', data => {
  //   setResArray(
  //     data.d.results.map((res) => {
  //       return {
  //         ...res,
  //         start: DateTime.fromISO(res.EventDate).toLocal(),
  //         end: DateTime.fromISO(res.EndDate).toLocal(),
  //       };
  //     })
  //   );
  // })

  return (<></>





    // {selectedDate !== undefined ? <>
    // <TwoDayTimeLineChart resArray={resArray} selectedDate={selectedDate}/>
    // </>:<></>}
    //   </div>






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
