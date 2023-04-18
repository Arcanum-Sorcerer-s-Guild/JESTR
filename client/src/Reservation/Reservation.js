import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon';
import TimeLineChart  from './TimeLineChart.js'



const Reservation = () => {
  const params = useParams()
  const [resArray,setResArray] = useState([])
  const [currRes,setCurrRes] = useState({})
  const [conflictArray, setConflictArray] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",{credentials: 'include'})
    .then(res=>res.json())
    .then(data=> {
      
        // res.start=DateTime.fromISO(res.EventDate).toLocal()
        // res.end=DateTime.fromISO(res.EndDate).toLocal()
        // })
      setResArray(
        data.d.results.map((res) => {return ({
          ...res,
          start: DateTime.fromISO(res.EventDate).toLocal(),
          end: DateTime.fromISO(res.EndDate).toLocal(),
          // conflicts: data.d.results.filter(conflict=>{
          //   if(res.start >= conflict.start && res.start <= conflict.end || res.end >= conflict.start && res.end <= conflict.end) {return(conflict)}
          // })
        }) }) )
      

    })
  },[])

  useEffect(()=>{
    let res = currRes; 
    setConflictArray(resArray.filter(conflict=>{
      if(res.start >= conflict.start && res.start < conflict.end || res.end > conflict.start && res.end < conflict.end) {return(conflict)}
    }))

    console.log(conflictArray)
  },[currRes])

  useEffect(()=>{
    setCurrRes(resArray.filter((res)=>res.Id === parseInt(params.id))[0])
  },[resArray])



  return (<>
    <div>
      {console.log(currRes)}
      {currRes !== undefined ? <>
        <div className="w-full h-screen block text shadow-lg p-2 ">

          <div className="flex flex-row">
            <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-col">
              <h2 className="text-xl">{`ID: ${currRes.Id}`}</h2>
              <div>{`Author: ${currRes.AuthorId}`}</div>
              <div>{`Editor: ${currRes.EditorId}`}</div>
            </div>
            <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-col">
              <div>{`Squadron: ${currRes.Squadron}`}</div>
              <div>{`Point of Contact: ${currRes.POC}`}</div>
              <div>{`DSN: ${currRes.ContactDSN}`}</div>
            </div>
          </div> 

          <div>
            {console.log(conflictArray)}
          </div>

        { conflictArray.length > 0 && currRes ? <TimeLineChart conflictArray={conflictArray} currRes={currRes} /> : <></>}
        </div>
        


      </>:<></>}
    </div>
  </>);
};

export default Reservation;
