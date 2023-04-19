import React, { useRef } from 'react'
import 'chartjs-adapter-luxon'
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

const TwoDayTimeLineChart = ({resArray,selectedDate}) => {
  const chartRef = useRef()
  // let startDay = DateTime.now().startOf('day')
  let startDay = selectedDate
  let endDay = startDay.plus({Day:1})

  let resDayOne = resArray.filter((res) => res.start.toFormat('dd MMM yyyy') === startDay.toFormat('dd MMM yyyy'));
  let resDayTwo = resArray.filter((res)=> res.start.toFormat('dd MMM yyyy') === endDay.toFormat('dd MMM yyyy'))
  console.log('Day One',resDayOne)
  console.log('Day Two',resDayTwo)

  let labelsDayOne = resDayOne.map(res=>`${res.Squadron}: #${res.Id}`);
  let labelsDayTwo = resDayTwo.map(res=>`${res.Squadron}: #${res.Id}`);

  let dataArrayDayOne = resDayOne.map(res => ([res.start.toFormat('HH:mm'),res.end.toFormat('HH:mm')]))
  let dataArrayDayTwo = resDayTwo.map(res => ([res.start.toFormat('HH:mm'),res.end.toFormat('HH:mm')]))

  console.log(labelsDayOne,dataArrayDayOne)
  // labels= ['Label 1','Label 2']
  // dataArray = [['19 12:00','19 16:00'],['19 16:00','19 20:00']]

  const onChartClick = (event) => {
    let element = getElementAtEvent(chartRef.current,event)[0]

    // if (element !== undefined) {
    //   if (element.index === 0) setAltRes(currRes)
    //   else setAltRes(conflictArray[element.index -1])
    //   setShowModal(true)  
    // }

  }

  const options = {
    indexAxis: 'y' ,
    scales: {
      x: {
        min: '06:00',       //DateTime.now().toFormat('hh:mm'), //'2022-02-01',
        max: '18:00',
        type: 'time',
        time: {
          unit: 'hour',
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
      legend: false,
      title: {
        display: false,
        text: ` Reservations` ,
      },
    },
  };

  const dataDayOne = {
    labels: labelsDayOne,
    datasets: [
      {
      label: `Conflicts`,
      data: dataArrayDayOne,
      barPercentage: .25,
  }]
}

  const dataDayTwo = {
    labels: labelsDayTwo,
    datasets: [
      {
      data: dataArrayDayTwo,
      barPercentage: .25,
  }]
  }




  return(<>
    <div className="flex flex-row gap-32">
      <div>
        <h1 className="text-xl text-center text-primary">{startDay.toFormat('EEE dd MMM')}</h1>
        <Bar width={750} height={750} options={options} data={dataDayOne} ref={chartRef} onClick={onChartClick}/>
      </div>

      <div>
        <h1 className="text-xl text-center text-primary">{endDay.toFormat('EEE dd MMM')}</h1>
        <Bar width={750} height={750} options={options} data={dataDayTwo} ref={chartRef} onClick={onChartClick}/>
      </div>
    </div>
  </>)
}

export default TwoDayTimeLineChart
