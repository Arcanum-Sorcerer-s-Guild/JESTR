import React, { useEffect,useState } from 'react'
import { Bubble } from 'react-chartjs-2';



const SquadronBubble = ({reserveList,dateRange}) => {

    reserveList.sort((a, b) => {return a.date - b.date});
    let daySpan = parseInt(dateRange.end.diff(dateRange.start).toFormat('dd'));
    let reservations = [];

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
  

  console.log(dateRange.start.toFormat('dd MMM yyyy'))
  console.log(dateRange.end.toFormat('dd MMM yyyy'))

  let squadronList = [... new Set (reservations.map(res=>res.squadron))]
  
  let tempData = squadronList.map(sq=>reservations.filter(res=>res.squadron===sq))
  
  tempData = tempData.map(resArray=> { 
    return({
      x: resArray.filter(res=>res.status==='Rejected').length,
      y: resArray.filter(res=>res.status==='Approved').length,
      r: resArray.length,
    })
  })

  const options= {

  }

  console.log(tempData)
  // console.log(reserveList)


  const bubbleSquadronData = {
    datasets: [{
      label: 'Squadrons',
      data: tempData,
      backgroundColor: 'rgb(255, 99, 132)'
    }]
  };


  return(<>
        <div className="flex flex-col">
          <h3 className="text-2xl mb-2">{`Success Reservations by Squadron`}</h3>
          <div>
          {bubbleSquadronData ? <>  
            <Bubble options={options} data={bubbleSquadronData} height={250} width={250} />  
          </>:<></>}

          </div>
        </div>
  </>)
}

export default SquadronBubble