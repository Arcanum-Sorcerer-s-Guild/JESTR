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

  resArray.sort((a,b)=>a.Squadron > b.Squadron)
  
  const chartRef = useRef()
  let startDay = selectedDate
  let endDay = startDay.plus({Day:1})

  let resDayOne = resArray.filter((res) => res.start.toFormat('dd MMM yyyy') === startDay.toFormat('dd MMM yyyy')).sort((a,b)=> {
    if (a.Squadron.toLowerCase() > b.Squadron.toLowerCase()) {
      return 1 
    } else {
      return -1
    }
  })
  let resDayTwo = resArray.filter((res)=> res.start.toFormat('dd MMM yyyy') === endDay.toFormat('dd MMM yyyy')).sort((a,b)=> {
    if (a.Squadron.toLowerCase() > b.Squadron.toLowerCase()) {
      return 1 
    } else {
      return -1
    }
  })

  let labelsDayOne = resDayOne.map(res=>`${res.Squadron}: #${res.Id}`);
  let labelsDayTwo = resDayTwo.map(res=>`${res.Squadron}: #${res.Id}`);

  let dataArrayDayOne = resDayOne.map(res => ([res.start.toFormat('HH:mm'),res.end.toFormat('HH:mm')]))
  let dataArrayDayTwo = resDayTwo.map(res => ([res.start.toFormat('HH:mm'),res.end.toFormat('HH:mm')]))


  let squadrons = [... new Set(resArray.map(res=>res.Squadron))]
  let colors = ['#36A2EB','#FF6384','#4BC0C0','#FF9F40','#9966FF','#FFCD56']

  let sqColors = squadrons.reduce((acc,elem,index)=>{return({...acc,[elem]:colors[index]})},{} )

  let colorsDayOne=resDayOne.map(res=> sqColors[res.Squadron] )
  let colorsDayTwo=resDayTwo.map(res=> sqColors[res.Squadron])

  const dataDayOne = {
    labels: labelsDayOne,
    datasets: [
      {
      backgroundColor: colorsDayOne,
      data: dataArrayDayOne,
      barPercentage: .25,
      }]
  }
  
    const dataDayTwo = {
      labels: labelsDayTwo,
      datasets: [
        {
        backgroundColor: colorsDayTwo,
        data: dataArrayDayTwo,
        barPercentage: .25,
    }]
    }
  
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
        },
        stacked: true,
        // grid: {
        //   color: "green"
        // },
        ticks: {
          color: "green"
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "green"
        }
        
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
