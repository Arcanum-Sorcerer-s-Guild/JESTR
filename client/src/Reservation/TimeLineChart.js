import React, { useRef } from 'react';
import 'chartjs-adapter-luxon';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
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

const TimeLineChart = ({ conflictArray, currRes, setAltRes, setShowModal }) => {
  const chartRef = useRef();

  // conflictArray.unshift(currRes)

  let labels = conflictArray.map(
    (conflict) => `${conflict.Squadron}: #${conflict.Id}`
  );
  let colorArray = conflictArray.map((conflict) =>
    conflict.Status === 'Approved' ? 'rgba(0,255,0)' : 'rgba(255,0,0'
  );
  let dataArray = conflictArray.map((conflict) => [
    conflict.start.toFormat('HH:mm'),
    conflict.end.toFormat('HH:mm'),
  ]);
  // if (conflictArray.includes(currRes) === false) conflictArray.unshift(currRes)
  labels.unshift(`Reservation #${currRes.Id}`);
  colorArray.unshift('rgba(0,0,255)');
  dataArray.unshift([
    `${currRes.start.toFormat('HH:mm')}`,
    `${currRes.end.toFormat('HH:mm')}`,
  ]);

  const onChartClick = (event) => {
    let element = getElementAtEvent(chartRef.current, event)[0];

    if (element !== undefined) {
      if (element.index === 0) setAltRes(currRes);
      else setAltRes(conflictArray[element.index - 1]);
      setShowModal(true);
    }
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: '06:00', //DateTime.now().toFormat('hh:mm'), //'2022-02-01',
        max: '18:00',
        type: 'time',
        time: {
          unit: 'hour',
        },
        ticks: { color: 'grey' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'grey' },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: `All reservations (including #${currRes.Id}) on ${currRes.start.toFormat('dd MMM yyyy')}`,
        color: 'pink'
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Conflicts`,
        data: dataArray,
        backgroundColor: colorArray,
        barPercentage: 0.25,
      },
      //     {
      //     label: `Conflicts`,
      //     data: [currRes.start.toFormat('HH:mm'),currRes.end.toFormat('HH:mm')],
      //     borderColor: 'rgb(0,0,255,.5)',
      //     backgroundColor: 'rgb(0,0,255)',
      //     barPercentage: .50,
      // },
    ],
  };

  return (
    <>
      <Bar
        width={400}
        height={400}
        options={options}
        data={data}
        ref={chartRef}
        onClick={onChartClick}
      />
    </>
  );
};

export default TimeLineChart;
