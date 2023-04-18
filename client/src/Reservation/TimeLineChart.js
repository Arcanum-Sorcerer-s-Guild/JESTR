import React from 'react'
import 'chartjs-adapter-luxon'
import { Bar } from 'react-chartjs-2';
import { DateTime } from 'luxon';
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



const TimeLineChart = ({conflictArray,currRes}) => {

  let labels = [... new Set(conflictArray.map(conflict=>conflict.Squadron))];
  labels.push('Current')

  console.log(conflictArray)

  const options = {
    indexAxis: 'y' ,
    scales: {
      x: {
        min: DateTime.now().toFormat('hh:mm'), //'2022-02-01',
        max: '18:00',
        type: 'time',
        time: {
          unit: 'hour'
        }
      },
      y: {
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };


  const data = {
    labels,
    datasets: [
      {
      label: `Conflicts`,
      data: conflictArray.map(conflict => ([conflict.start.toFormat('HH:mm'),conflict.end.toFormat('HH:mm')])),
      borderColor: 'rgb(255,0,0,.5)',
      backgroundColor: 'rgb(255,0,0)',
      barPercentage: .50,
  },
  //     {
  //     label: `Conflicts`,
  //     data: [currRes.start.toFormat('HH:mm'),currRes.end.toFormat('HH:mm')],
  //     borderColor: 'rgb(0,0,255,.5)',
  //     backgroundColor: 'rgb(0,0,255)',
  //     barPercentage: .50,
  // },

]}
  
  // const data = {
  //   labels,
  //   datasets: [
  
  //     {
  //       label: 'Dataset 1',
  //       data: [ ['2022-02-01','2022-02-01'],['2022-02-02','2022-02-04'],['2022-02-03','2022-02-07'],['2022-02-04','2022-02-09'],['2022-02-05','2022-02-06'] ],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       barPercentage: .50,
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: [500],
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       barPercentage: .50,
  //     },
  //   ],
  // };
  return(<>
    {conflictArray.map(conflict=> console.log(conflict.start.toFormat('hh:mm'),conflict.end.toFormat('hh:mm')))}
    <Bar options={options} data={data} />;
  </>)
}

export default TimeLineChart









