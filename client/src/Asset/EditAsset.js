import React, {useState} from 'react'

const EditAsset = ({asset}) => {
  const [inputs, setInputs] = useState();
  const [opStatus,setOpStatus] = useState(asset.Operational)
  const [schedulable,setSchedulable] = useState(asset.Schedulable)
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name==='Schedulable') setSchedulable(!schedulable)
    if (name==='OpStatus') setOpStatus(!opStatus)
    setInputs(values => ({...values,[name]:value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Fetch
  }

  useState(()=>{
    setOpStatus(asset.Operational)
    setSchedulable(asset.Schedulable)
  },[asset])

  return(<>
      <form onSubmit={handleSubmit}>
        {console.log(inputs)}
        {console.log(opStatus,schedulable)}
        {/* <div className="flex flex-col gap-1">
          <div>ID#</div>
          <div className="flex justify-between">Accuracy: <input name="Accuracy" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Coordinate Source: </div>
          <div className="flex justify-between">Equipment: <input name="Equipment" onChange={()=>handleChange()}/></div>

          <div className="flex justify-between">Range: <input name="Range" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Remarks: <input name="Remarks" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Schedulable: <input name="Schedulable" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Serial: </div>
          <div className="flex justify-between">Site Location: <input name="SiteLocation" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Status: <input name="Status" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">System Information: <input name="SystemInformation" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Threat: <input name="Threat" onChange={()=>handleChange()}/></div>
          <div className="flex justify-between">Threat Type: <input name="ThreatType" onChange={()=>handleChange()}/></div>
        </div> */}
        <>
          <div>{`ID: ${asset.Id}`}</div>
          <div>{`Serial: `}<input name="Serial" onChange={(e)=>handleChange(e)} defaultValue={asset.Serial}/></div>

          <div className="flex flex-col">
            LAT:<input className="w-32 h-6" type="number" name="Latitude" onChange={(e)=>handleChange(e)} defaultValue={asset.Latitude}/>
            LON:<input className="w-32 h-6" type="number" name="Longitude" onChange={(e)=>handleChange(e)} defaultValue={asset.Longitude}/>
            EL:<input className="w-32 h-6" name="Elevation" onChange={(e)=>handleChange(e)} defaultValue={asset.Elevation}/>
          </div>
            
          <div>
          Coordinate Source<input name="CoordSource" defaultValue={asset.CoordSource} onChange={(e)=>handleChange(e)}/>
            </div>
          <div>{`On ${asset.Range} at ${asset.SiteLocation} `}</div>
          
          <div className={`flex flex-row ml-2 items-center font-medium `}>Schedulable:<input type="checkBox" name="Schedulable"  value={opStatus} onChange={(e)=>handleChange(e)}/></div>
          <div className={`flex flex-row ml-2 items-center font-medium `}>OpStatus:<input type="checkBox" name="OpStatus" value={schedulable} onChange={(e)=>handleChange(e)}/></div>
          <div>{`Current Status: ${asset.Status} as of ${asset.StatusDate}`}</div>


          <div>{`${asset.ThreatType.toUpperCase()}: ${asset.Equipment} as ${asset.Threat}`}</div>

          <div>{`System Information: ${asset.SystemInformation}`}</div>
          <div>{`Remarks: ${asset.Remarks}`}</div>


          <div>{`ETIC: ${asset.ETIC}`}</div>
          <div>{`Created: ${asset.created}`}</div>
          <div>{`Modified: ${asset.modified}`}</div>
          </>
      </form>
  
  </>)
}

export default EditAsset