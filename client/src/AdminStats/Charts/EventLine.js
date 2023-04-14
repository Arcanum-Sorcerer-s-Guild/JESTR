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
      // console.log(reserveList.forEach((res)=>console.log(res.date.toFormat('dd MMM yyyy'))))

      let daySpan = parseInt((dateRange.end.diff(dateRange.start)).toFormat('dd'))
      

      let reservations = reserveList.filter(
        (reservation) =>
          reservation.date.startOf('day') >= dateRange.start.startOf('day') &&
          reservation.date.startOf('day') <= dateRange.end.startOf('day')
      );

      console.log(reservations.forEach(res=>res.date.toFormat('dd MMM yyyy')))
      let tempArray = new Array(reservations.length).fill(0)
      let tempArray2 = []

      // if (daySpan > 7 && daySpan <= 14) {
      //   for(let i = 0; i < reservations.length; i++) {
      //     tempArray[parseInt(reservations[i].date.toFormat('c'))-1] += 1
      //     tempArray2.push(Info.weekdays('short')[i%7])
      //   }
      //   console.log(tempArray2)
      //   setLineLabels({labels:tempArray2,data:tempArray,range:'Week'})
      // }

      if (daySpan === 7) {
        for(let i = 0; i < reservations.length; i++) {
          tempArray[parseInt(reservations[i].date.toFormat('c'))-1] += 1
        }
        setLineLabels({labels:['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],data:tempArray,range:'Week'})
        
        // setEventLineArray(eventLineArray.reduce((acc,event) => {
        //   console.log(parseInt(event.date.toFormat('c'))-1)
        //   // return(acc[parseInt(event.date.toFormat('c'))-1]+=1)
        //   // acc[event.date.toFormat('c')] += 1
        // },[0,0,0,0,0,0,0,0]))
      } else if (daySpan === 366) {

        for(let i = 0; i < reservations.length; i++) {

          tempArray[parseInt(reservations[i].date.toFormat('MM'))-1] += 1
        }

        setLineLabels({labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],data:tempArray,range:'Year'})
      } else {
        

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
