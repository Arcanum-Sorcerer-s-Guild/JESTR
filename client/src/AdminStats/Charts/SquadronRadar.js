import React, {useEffect, useState} from 'react'
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};



const SquadronRadar = ({dateRange, reserveList}) => {
  const [squadronRangeData,setSquadronRangeData] = useState([])
  useEffect(()=>{
    if(reserveList.length > 0) {
      let reservations = reserveList.filter(
        (res) =>
        res.date.startOf('day') >= dateRange.start.startOf('day') &&
        res.date.startOf('day') < dateRange.end.startOf('day')
      )
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
      
      setSquadronRangeData(      {
        labels : rangeList,
        datasets: dataSets
      })
        

      console.log(dataSets)
    }
  },[dateRange])


  return(<>
      <div className="flex flex-col">
        <h3 className="text-2xl mb-2">Squadron Site Usage</h3>
          <div>
            <Radar 
              width={250} 
              height={250} 
              data={squadronRangeData} 
              options={{maintainAspectRatio: false, responsive: true,}}
            />
          </div>
      </div>
        
        
  </>)
}

export default SquadronRadar
