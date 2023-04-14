import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Info } from 'luxon';
import { Line } from 'react-chartjs-2';

const EventLine = ({dateRange,reserveList}) => {

  const [eventLineData, setEventLineData] = useState()
  const [lineLabels,setLineLabels] = useState({labels:['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],data:[],range:'Week'})

  useEffect(()=>{
    if(reserveList.length > 0) {
      reserveList.sort((a,b)=>{return a.date - b.date})

      let daySpan = parseInt((dateRange.end.diff(dateRange.start)).toFormat('dd'))
      let tempArray2 = []
      
      let reservations = reserveList.filter(
        (reservation) =>
          reservation.date.startOf('day') >= dateRange.start.startOf('day') &&
          reservation.date.startOf('day') <= dateRange.end.startOf('day')
      );

      if (reservations.length > 0) {

      // if (daySpan > 7 && daySpan <= 14) {
      //   for(let i = 0; i < reservations.length; i++) {
      //     tempArray[parseInt(reservations[i].date.toFormat('c'))-1] += 1
      //     tempArray2.push(Info.weekdays('short')[i%7])
      //   }
      //   console.log(tempArray2)
      //   setLineLabels({labels:tempArray2,data:tempArray,range:'Week'})
      // }

      if (daySpan === 7) {  
        let tempArray = new Array(7).fill(0)
        for(let i = 0; i < reservations.length; i++) {
          tempArray[parseInt(reservations[i].date.toFormat('c'))-1] += 1
          tempArray2.push(Info.weekdays('short')[reservations[i].date.toFormat('c')-1])
        }
        setLineLabels({labels:[... new Set(tempArray2)],data:tempArray,range:'Week'})
      } 
      
      if (daySpan > 14) {
        
        let tempArray = new Array(12).fill(0)
        for(let i = 0; i < reservations.length; i++) {
          tempArray[parseInt(reservations[i].date.toFormat('M'))-1] += 1
        }
        let startMonth = parseInt(reservations[0].date.toFormat('M')-1)
        let tempArray2 = new Array(12).fill(startMonth)
        for (let i = 0; i < 12; i++) {
          tempArray2[i] = (tempArray2[i] + i) % 12
        }
        tempArray2 = tempArray2.map(month => {return(  Info.months('short')[month])})
        setLineLabels({labels:tempArray2,data:tempArray,range:'Year'})
      } 
    }
    }
  },[dateRange])


  useEffect(()=> {
    setEventLineData({
      labels:lineLabels.labels,
      datasets: [{
        label: lineLabels.range,
        data: lineLabels.data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }]
    })
},[lineLabels])


  return(<>
    <div className="flex flex-col">
      <h3 className="text-2xl mb-2">{`Reservations by ${lineLabels.range}`}</h3>
      <div>
        {eventLineData 
        ? <Line 
          width={250} 
          height={250} 
          options={
            {
              maintainAspectRatio: false, 
              plugins: {legend:false,datalabels: {offset:-20,align: 'start'}},
              scales: {x:{suggestedMin:lineLabels.labels.length }}
            }
            } 
          data={eventLineData} />
        :<></>}
      </div>
    </div>
  </>)
}

export default EventLine
