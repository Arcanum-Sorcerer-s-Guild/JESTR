import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon';
import TimeLineChart  from './TimeLineChart.js'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import ResModal from './ResModal.js'



const Reservation = () => {
  const params = useParams()
  const [resArray,setResArray] = useState([])
  const [currRes,setCurrRes] = useState({})
  const [conflictArray, setConflictArray] = useState([])
  const navigate = useNavigate()
  const [toggle,setToggle] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [altRes,setAltRes] = useState({})

  useEffect(() => {
    fetch("http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",{credentials: 'include'})
    .then(res=>res.json())
    .then(data=> {
      setResArray(
        data.d.results.map((res) => {return ({
          ...res,
          start: DateTime.fromISO(res.EventDate).toLocal(),
          end: DateTime.fromISO(res.EndDate).toLocal(),
        }) }) )
    })
  },[])

  useEffect(()=>{},[toggle])

  useEffect(()=>{
    if (resArray.length > 0) {
    let res = currRes; 
    setConflictArray(resArray.filter(conflict=>{
      // if(res.star.toStart() >= conflict.start && res.start < conflict.end || res.end > conflict.start && res.end < conflict.end) {return(conflict)}
      if(res.start.toFormat('dd MMM yyyy') === conflict.start.toFormat('dd MMM yyyy')) {return(conflict)}
    }))
  }

  },[currRes])

  useEffect(()=>{
    if (resArray.length > 0) setCurrRes(resArray.filter((res)=>res.Id === parseInt(params.id))[0])
  },[resArray,toggle])

  const changePage = (page) => {
    if(page === 'prev' && parseInt(params.id) !== 1) {
      navigate(`/Reservation/${parseInt(params.id) - 1}`)
      setToggle(!toggle)

    }
    if(page === 'next' && parseInt(params.id) + 1 !== resArray.length + 1 ) {
      navigate(`/Reservation/${parseInt(params.id) + 1}`)
      setToggle(!toggle)

    }
  }
  
  const handleAltResClick = (altRes) => {
    setAltRes(altRes)
    setShowModal(true)
    console.log(showModal)
  }
  
  

  return (<>
     

    <ResModal showModal={showModal} setShowModal={setShowModal} altRes={altRes}/>
      {/* {console.log(JSON.stringify(currRes) !== '{}')} */}
      {JSON.stringify(currRes) !== '{}'}
      {currRes !== undefined ? <>
      <div className="w-full h-screen block text shadow-lg p-2 ">
        <div className="flex flex-col gap-10">

          <div className="flex flex-row w-full justify-center gap-5">
            <button className="ml-5" onClick={()=>changePage('prev')}>
            <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full">
            <FiArrowLeft className="mt-10"/>
            </div>
            </button>

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
            <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-col">
              {currRes.start !== undefined ? <div>{`${currRes.start.toFormat('dd MMM yyyy')} from ${currRes.start.toFormat('hh:mm')} to ${currRes.end.toFormat('hh:mm')}`}</div> : <></>}
              <div>{`Status: ${currRes.Status}`}</div>
              <div className="flex flex-row justify-center gap-10 ">
                  <button className="border border-black rounded bg-bluer h-8 p-1">Approve</button>
                  <button className="border border-black rounded bg-bluer h-8 p-1">Deny</button>
                </div>

            </div>

            <button onClick={()=>changePage('next')}>
            <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full ">
            <FiArrowRight className="mt-10"/>
            </div>
            </button>
          </div> 
          <div className="flex flex-row w-full gap-10 h-1/2">
                        {/* <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden"></div> */}
                        <div className=" block rounded-lg bg-bluer/25 border border-black w-1/2 h-full p-10">
                          { conflictArray.length > 0 && JSON.stringify(currRes) !== '{}' ? <TimeLineChart conflictArray={conflictArray} currRes={currRes} altRes={altRes} setAltRes={setAltRes} setShowModal={setShowModal}/> : <></>}
                        </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-5">
              <div className="block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden w-full h-1/2">
                <h1 className="flex justify-center text-xl font-medium border-b-2 border-black">Conflicting Reservations</h1>
                <div className="flex flex-col content-between h-max">
                  <div>
                    <table class="table-fixed w-full">
                      <thread className="flex break-words w-full ml-5 gap-10 ">
                      <tr className="flex flex-row justify-center">
                        <th >ID</th>
                        <th>Squadron</th>
                        <th>POC</th>
                        <th>DSN</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Date</th>
                      </tr>
                      </thread>
                    <tbody>
                    {conflictArray.filter(conflict=>
                      {if(currRes.start >= conflict.start && currRes.start < conflict.end || currRes.end > conflict.start && currRes.end < conflict.end) return(conflict)}
                    ).map((res,index)=> {
                      return(<>
                        {res.Id !== currRes.Id ?
                        <tr onClick={()=>handleAltResClick(res)} key={index}> 
                          <td>{res.Id}</td>
                          <td>{res.Squadron}</td>
                          <td>{res.POC}</td>
                          <td>{res.start.toFormat('hh:mm')}</td>
                          <td>{res.end.toFormat('hh:mm')}</td>
                          <td>{res.start.toFormat('dd MMM yyyy')}</td>
                        </tr>
                        : <></>} 
                        </>)})
                    }
                    </tbody>
                    </table>
                  </div>
                </div>

              </div>
              <div className="block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden w-full h-1/2">
                <h1 className="flex justify-center text-xl font-medium border-b-2 border-black">Notes:</h1>
                {`${currRes.Notes}`}
              </div>
            </div>

          </div>

          </div>

        </div>
            {/* <div>{`Current: ${currRes.start.toFormat('hh:mm')} ${currRes.end.toFormat('hh:mm')}`}</div> */}
            {/* {conflictArray.length > 0 ? conflictArray.map(conflict=><div>{`${conflict.Squadron}: ${conflict.start.toFormat('hh:mm')} ${conflict.end.toFormat('hh:mm')}`}</div>) : <></>} */}
            
      </div>
        


      </>:<></>}
    
  </>);
};

export default Reservation;
