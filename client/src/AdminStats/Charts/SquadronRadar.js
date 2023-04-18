import React, {useEffect, useState} from 'react'
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';


const SquadronRadar = ({dateRange, reserveList}) => {
  const [squadronRangeData,setSquadronRangeData] = useState([])

  useEffect(()=>{
    if(reserveList.length > 0) {

      let daySpan = parseInt(dateRange.end.diff(dateRange.start).toFormat('dd'))
      let reservations = []

      if (daySpan < 4) {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') < dateRange.start.startOf('day').plus({ day: 3 })
        );
      } else {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') < dateRange.end.startOf('day')
        );
      }
      
      let rangeList = [...new Set(reservations.map(a => a.range))]
      let squadronList = [...new Set(reservations.map(a => a.squadron))]

      let dataSets = squadronList.map(sq=>{
          return(
          {label: sq,
           data: rangeList.map(rng=>
            reservations.reduce((acc,res)=> res.range===rng && res.squadron===sq ? acc+1:acc,0))
          }
          )
        })
  
      setSquadronRangeData({
        labels : rangeList,
        datasets: dataSets
      })
        
    }
  },[dateRange,reserveList])


  return(<>
      <div className="flex flex-col">
        <h3 className="text-2xl mb-2">Squadron Site Usage</h3>
          <div>
            {Object.keys(squadronRangeData).length>0 
            ? <Radar 
              width={250} 
              height={250} 
              data={squadronRangeData} 
              options={{maintainAspectRatio: false, responsive: true,}}
            /> 
            : <></>}
          </div>
      </div>
        
        
  </>)
}
export default SquadronRadar
