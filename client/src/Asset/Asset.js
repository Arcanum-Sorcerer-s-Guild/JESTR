import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import './asset.css'
import AssetMap from './AssetMap.js'
import EditAsset from './EditAsset'
import DmsCoordinates, { parseDms } from "dms-conversion";
import { useNavigate } from 'react-router-dom'
import { DateTime } from 'luxon';
import { AiOutlineNumber } from 'react-icons/ai'
import { FaCrosshairs } from 'react-icons/fa'
import { GiAntiAircraftGun } from 'react-icons/gi'
import { FiArrowRight } from 'react-icons/fi'
import { FaTools } from 'react-icons/fa'



const Asset = () => {
  const [assets,setAssets] = useState([])
  const [currAsset,setCurrAsset] = useState([])
  let params = useParams();
  const [editToggle, setEditToggle] = useState(false)
  const [timeLine,setTimeLine] = useState([])
  const navigate = useNavigate() 




  useEffect(()=>{
    fetch("http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items", {credentials: 'include'})
      .then((response) => response.json())
      .then((data) => {
        setAssets(data.d.results.map(asset=> (
          {...asset,dms:new DmsCoordinates(Number(asset.Latitude),Number(asset.Longitude)) }) ) )  
      });
  },[])

  useEffect(()=>{
    if (assets.length > 0) setCurrAsset(  assets.filter(a=>a.Id===parseInt(params.id))[0] )
  },[params,assets])

  const changePage = (page) => {
    if(page === 'prev' && params.id !== 1) {
      navigate(`/Asset/${parseInt(params.id) - 1}`)
    }
    if(page === 'next' && parseInt(params.id) + 1 !== assets.length + 1 ) {
      console.log(parseInt(params.id) + 1,assets.length)
      navigate(`/Asset/${parseInt(params.id) + 1}`)
    }
    setEditToggle(!editToggle)
  }

  useEffect(()=>{
    if (Object.keys(currAsset).length > 0) {
      setTimeLine( [
        {name:'Coordinate Recorded',time:DateTime.fromISO(currAsset.CoordRecordedDate)},
        {name:'Status Recorded',time:DateTime.fromISO(currAsset.StatusDate)},
        {name:'Asset Created',time:DateTime.fromISO(currAsset.created)},
        {name:'Asset Modified',time:DateTime.fromISO(currAsset.modified)},
        {name:'ETIC',time:DateTime.fromISO(currAsset.ETIC)}
    ])
    }
  },[currAsset])

  return (<>
    {assets && Object.keys(currAsset).length>0 ? 
    <div className="w-full h-screen block text shadow-lg p-2 ">
      <div className="flex flex-row gap-5 h-3/12 mb-4">
        <button onClick={()=>changePage('prev')}>Previous</button>
        
        <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-row">
          <div className="w-1/3 ">
           <AiOutlineNumber size={70} className="h-full pl-2"/>
          </div>
          <div className="w-2/3 align-middle mt-1">
            <h1 className="text-xl font-medium">{`ID# ${currAsset.Id}`}</h1>
            <div>{`Serial: ${currAsset.Serial}`}</div>
            <div>{`Author Id: ${currAsset.AuthorId}`}</div>
          </div>
        </div>

        <div className="w-1/5 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-row">
          <div className="w-1/3">
            <FaCrosshairs size={70} className="h-full pl-2"/>
          </div>
          <div className="w-2/3 align-middle mt-1">
            <h1 className="text-xl font-medium">Coordinates</h1>
            <span className="">{`${currAsset.dms.toString().slice(0,12)}${currAsset.dms.toString().slice(24,41)}${currAsset.dms.toString().slice(-3,57)}`}</span>
            <div>{`Elevation: ${currAsset.Elevation} Feet`}</div>
            <div>{`Measured with: ${currAsset.CoordSource}`}</div>
          </div>
        </div>

        <div className="w-1/4 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-row">
          <div className="w-1/3">
            <GiAntiAircraftGun size={70} className="h-full pl-2"/>
          </div>
          <div>
            <h1 className="text-xl font-medium">Range & Equipment Data</h1>
            <div>{`${currAsset.ThreatType.toUpperCase()} ${currAsset.Equipment} as ${currAsset.Threat}`}</div>
            <span>{`in ${currAsset.Range} at ${currAsset.SiteLocation}`}</span>
          </div>
        </div>

        <div className="w-1/4 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden flex flex-row">
          <div className="w-1/3">
            <FaTools size={70} className="h-full pl-2"/>
          </div>
          <div>
            <h1 className="text-xl font-medium">Asset Status</h1>
            <div>{`Color Code: ${currAsset.Status}`}</div>
            <div>{`Operational:`}{currAsset.Operational ? <>✔️</>:<>❌</>}</div>
            <div>{`Schedulable:`}{currAsset.Schedulable ? <>✔️</>:<>❌</>}</div>
          </div>  
        </div>

        <button onClick={()=>changePage('next')}>Next</button>
      </div>

      <div className="flex flex-row gap-5 mb-4 ml-8 mr-2">
        <div className="w-1/2 h-4/6 ">
          <AssetMap serial={currAsset.Serial} center={[currAsset.Longitude,currAsset.Latitude]} /> 
        </div>

        <div className="flex flex-col gap-5 w-1/2 mr-10">

          <div className="h-1/3 block rounded-lg bg-bluer/25 border border-black text-center flex flex-row justify-between">


          <>
          <ol className="mt-4 border-t border-neutral-300 w-full flex flex-row justify-around">


          { timeLine.length > 0 ? [...timeLine].sort((a, b) => {return a.time - b.time}).map((event,index)=> {return(
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
                <h4 className="mb-1.5 text-lg font-semibold">
                {event.name}{ index !== timeLine.length - 1  ? '-->' : <></> }
                </h4>
                <p className="mt-2 text-sm font-medium text-neutral-500">
                  {event.time.toFormat('dd MMM yyyy')}
                </p>
                <p className="text-sm">
                {`at ${event.time.toFormat('mm:ss')}`}
                </p>
              </div>
              <div className="ml-4 mt-2 pb-5 md:ml-0">
                <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                  {event.name === 'Asset Modified' ? <>{`Editor ID: ${currAsset.EditorId}`}</> : <></> } 
                </p>
                </div>
            </li>
          
          )}):<></>}
          </ol>
          </>
              
          </div>

          <div className="flex flex-row h-full gap-5">

            <div className="w-1/2 h-full block rounded-lg bg-bluer/25 border border-black">
              <div className="flex flex-col">
                
                  <h1 className="text-xl font-medium text-center">System Information</h1>
                  <div className="text-center">{`${currAsset.SystemInformation}`}</div>
                  <div className="p-5">{`${currAsset.Remarks}`}</div>
                

                <div className="flex flex-row justify-center gap-5">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
            
              </div>
            </div>

            <div className="w-1/2 h-full block rounded-lg bg-bluer/25 border border-black"></div>
          </div>
        </div>
      </div>


    </div>


          
        


    : <></>}
  
  </>)

};

export default Asset;

