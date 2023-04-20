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
  console.log(daySpan)

  let squadronList = [... new Set (reservations.map(res=>res.squadron))]
  let tempData = squadronList.map(sq=>reservations.filter(res=>res.squadron===sq))

  if (daySpan < 50) {
    tempData = tempData.map(resArray=> { 
      return({
        x: resArray.filter(res=>res.status==='Rejected').length,
        y: resArray.filter(res=>res.status==='Approved').length,
        r: resArray.length,
      })
    })
  } else {
    tempData = tempData.map(resArray=> { 
      return({
        x: resArray.filter(res=>res.status==='Rejected').length / 10,
        y: resArray.filter(res=>res.status==='Approved').length / 10,
        r: resArray.length / 10,
      })
    })
  }


  const options= {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "green"
        },
        ticks: {
          color: "pink"
        }
      },
      y: {
        grid: {
          color: "green"
        },
        ticks: {
          color: "pink"
        }
      }
    },
    plugins: {
      datalabels: {

        color: 'pink',
        formatter: function(value, context) {
          console.log(value)
          return daySpan > 50 ? value.r * 10 : value.r;
        },
        offset: -40,
        align: 'start',
      }
  }
    // plugins: {
    //   legend: false,
    // },

  }


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
          <h3 className=" flex justify-center text-2xl mb-2 text-text">{`Success Reservations by Squadron`}</h3>
          <div>
          {bubbleSquadronData ? <>  
            <Bubble options={options} data={bubbleSquadronData} height={500} width={500} />  
          </>:<></>}

          </div>
        </div>
  </>)
}

export default SquadronBubble