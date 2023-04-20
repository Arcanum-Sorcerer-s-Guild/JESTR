import React, { useRef, useState, useEffect } from 'react'
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
  const [reservations,setReservations] = useState([])
  const [allReservations,setAllReservations] = useState([])
  const [dataDayOne,setDataDayOne] = useState({})
  const [dataDayTwo,setDataDayTwo] = useState({})
  const chartRef = useRef()
  let startDay = selectedDate
  let endDay = startDay.plus({Day:1})
  let squadrons = [... new Set(resArray.map(res=>res.Squadron))]
  let colors = ['#36A2EB','#FF6384','#4BC0C0','#9966FF','#FFCD56','#16F834','#FF9F40']
  let sqColors = squadrons.reduce((acc,elem,index)=>{return({...acc,[elem]:colors[index]})},{} )



  useEffect(()=>{
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
          }));
        setAllReservations(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          }))

        
      });
  },[])

  
  const handleSquadronClick = (squadron) => {
    if (squadron === 'all') {
      setReservations(allReservations)
    } else {
      setReservations(resArray.filter(res=>res.Squadron === squadron))
    }


  }

  const onChartClick = (event) => {
    // console.log(event)
    // let element = getElementAtEvent(chartRef.current,event)[0]
    // console.log(element)
    // console.log(reservations[element.index])
    // // if (element !== undefined) {
    //   //   if (element.index === 0) setAltRes(currRes)
    //   // else setAltRes(conflictArray[element.index -1])
    //   // setShowModal(true)  
    
  }


  
  
  useEffect(()=>{
    if (reservations.length > 0) { 

    let resDayOne = reservations.filter((res) => res.start.toFormat('dd MMM yyyy') === startDay.toFormat('dd MMM yyyy')).sort((a,b)=> {
      if (a.Squadron.toLowerCase() > b.Squadron.toLowerCase()) {
        return 1 
      } else {
        return -1
      }
    })

    let resDayTwo = reservations.filter((res)=> res.start.toFormat('dd MMM yyyy') === endDay.toFormat('dd MMM yyyy')).sort((a,b)=> {
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

    let colorsDayOne=resDayOne.map(res=> sqColors[res.Squadron])
    let colorsDayTwo=resDayTwo.map(res=> sqColors[res.Squadron])


    setDataDayOne({
      labels: labelsDayOne,
      datasets: [{
        backgroundColor: colorsDayOne,
        data: dataArrayDayOne,
      }]
    })
    
    setDataDayTwo({
      labels: labelsDayTwo,
      datasets: [{
        backgroundColor: colorsDayTwo,
        data: dataArrayDayTwo,
      }]
    })

    }
  },[reservations,resArray,selectedDate])




  let options = {
    indexAxis: 'y' ,
    scales: {
      x: {
        position: 'top',
        min: '06:00',       //DateTime.now().toFormat('hh:mm'), //'2022-02-01',
        max: '18:00',
        type: 'time',
        time: { unit: 'hour' },
        grid: {color:"#5A5A5A"},
        stacked: true,
        ticks: { color: "lime" }
      },
      y: {
        beginAtZero: true,
        ticks: { color: "lime" },
        grid: {color:"#5A5A5A"}
      }
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

  return(<>
  <div className="flex flex-col">
    <div className="flex flex-row gap-5 justify-center">
      {Object.entries(sqColors).map(sq=>  <div 
      className="border border-black rounded-lg w-48 mt-4 text-center font-medium" 
      style={{backgroundColor:sq[1]}}
      onClick={()=>handleSquadronClick(sq[0])}
      >{sq[0]}</div> )}
      
    </div>

    <div className="flex flex-row w-screen justify-center mt-10 gap-32 bg-blue-darker mb-5">
      <div className="flex flex-col justify-center "> 
        <h1 className="text-md text-primary bg-pink/25 rounded-lg px-10 text-gray-light uppercase text-center">{startDay.toFormat('EEE dd MMM')}</h1>
        {Object.keys(dataDayOne).length > 0 ? <Bar width={500} height={500} options={options} data={dataDayOne} ref={chartRef} onClick={onChartClick}/> : <></>}
      </div>

      <div>
        <h1 className="text-xl text-center text-primary">{endDay.toFormat('EEE dd MMM')}</h1>
        <Bar width={750} height={750} options={options} data={dataDayTwo} ref={chartRef} onClick={onChartClick}/>
      </div>
    </div>
  </>)
}

export default TwoDayTimeLineChart;
