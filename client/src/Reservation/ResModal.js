import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const ResModal = ({showModal , setShowModal, altRes}) => {

  return(<>
    {console.log(showModal)}
    <div className={showModal ? '' : 'hidden'}>
      <div id='wrapper' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" >
        <div className="relative md:w-[60%] w-[90%] flex flex-col">
          <div  className="h-2/3 block rounded-lg bg-bluer/50 border border-black flex flex-row justify-center">
            <button className="text-black text=xl place-self-end absolute right-2 top-2" onClick={()=>setShowModal(false)}>❌</button>
            {altRes !== undefined ? <>
            <div className="flex flex-col">

            <div>{altRes.Id}</div>
            <div>{altRes.Squadron}</div>
            <div>{altRes.POC}</div>
            <div>{altRes.DSN}</div>
            {/* <div>{altRes.start.toFormat('dd MMM yyyy')}</div>
            <div>{altRes.start.toFormat('hh:mm')}</div>
          <div>{altRes.end.toFormat('hh:mm')}</div>  */}
            <div>{altRes.Notes}</div>
          </div>
            </>:<></>}
          
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default ResModal