import React, {useState,useEffect} from 'react'

const EditAsset = ({showModal, setShowModal, asset}) => {
  
  const [inputs, setInputs] = useState();
  const [schedulable,setSchedulable] =useState();
  const [operational,setOperational] =useState();

  useEffect(()=>{
    setSchedulable(asset.Schedulable)
    setOperational(asset.Operational)
  },[asset])

  
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name==='Schedulable') {
      value = e.target.checked
      setSchedulable(value)
    }
    if (name==='Operational') {
      value = e.target.checked
      setOperational(value)
    }
    setInputs(values => ({...values,[name]:value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    let reqOpts = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputs),
    }

    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(${asset.Id})`, reqOpts)
    .then(res=>console.log(res.json()))
   
  }



  return(<>


      <div className={showModal ? '' : 'hidden'}>
        
      

    
      <div id='wrapper' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" >
      <div className="relative md:w-[60%] w-[90%] flex flex-col">
      
      <div  className="h-2/3 block rounded-lg bg-bluer/50 border border-black flex flex-row justify-center">
      <form onSubmit={handleSubmit}>
      <div className="flex flex-row">

        <div className="w-1/2 font-medium">


          <div className="flex flex-col w-full p-5">
              <div className="border border-black block rounded-lg flex flex-row w-full">

                <div className="border border-black rounded-lg w-full ">
                    <div>{`ID: ${asset.Id}`}</div>
                    <span>Serial</span><input name="Serial" onChange={(e)=>handleChange(e)} defaultValue={asset.Serial}/>
                <span>Threat Type:</span>
                <select name="ThreatType" onChange={(e)=>handleChange(e)}>
                  <option value="Unmanned" selected={asset.ThreatType === 'Unmanned' ? 'selected' : '' } >UNMANNED</option>
                  <option value="Manned" selected={asset.ThreatType === 'Manned' ? 'selected' : '' } >MANNED</option>
                </select>
                </div>
                <div className="border border-black rounded-lg w-full">
                  <div className="flex flex-col">
                  <span >Latitude:</span><input className="w-32 h-6" type="number" name="Latitude" onChange={(e)=>handleChange(e)} defaultValue={asset.Latitude}/>
                  <span >Longitude:</span><input className="w-32 h-6" type="number" name="Longitude" onChange={(e)=>handleChange(e)} defaultValue={asset.Longitude}/>
                  <span >Elevation:</span><input className="w-32 h-6" name="Elevation" onChange={(e)=>handleChange(e)} defaultValue={asset.Elevation}/>
                  <span >Coordinate Source</span><input name="CoordSource" defaultValue={asset.CoordSource} onChange={(e)=>handleChange(e)}/>
                  </div>
                </div>

              </div>

              <div className="border border-black block rounded-lg flex flex-row">
              <div className="border border-black rounded-lg w-full">
                  <span>Range:</span>
                  <input name="Range" defaultValue={asset.Range} onChange={(e)=>handleChange(e)}/>
                  <span>Site Location:</span>
                  <input name="SiteLocation" defaultValue={asset.SiteLocation} onChange={(e)=>handleChange(e)}/>

              </div>
              <div className="border border-black rounded-lg w-full">

    
                <div>{`Current Status: ${asset.Status}`}</div>
                <div className={`flex flex-row ml-2 items-center font-medium `}>OpStatus:<input type="checkBox" name="Operational"  checked={operational} onChange={(e)=>handleChange(e)}/></div>
                <div className={`flex flex-row ml-2 items-center font-medium `}>Schedulable:<input type="checkBox" name="Schedulable" checked={schedulable} onChange={(e)=>handleChange(e)}/></div>
                <span>Equipment:</span>
                <input name="Equipment" defaultValue={asset.Equipment} onChange={(e)=>handleChange(e)}/>
                <div>Threat:</div>
                <input name="Threat" defaultValue={asset.Threat} onChange={(e)=>handleChange(e)} />

              </div>

              </div>
          </div>



  
            
          <div>
          
            </div>
          





        </div>
        <div className="w-1/3 p-5 font-medium">
          <span>System Information</span> <input name="SystemInformation" defaultValue={asset.SystemInformation} onChange={(e)=>handleChange(e)}/>
          <textarea name="Remarks" className="mt-3" rows="8" cols="50" defaultValue={asset.Remarks} onChange={(e)=>handleChange(e)}/>
          <div className="flex flex-row">
            <div>
              <div>{`ETIC: ${asset.ETIC}`}</div>
              <div>{`Created: ${asset.created}`}</div>
              <div>{`Modified: ${asset.modified}`}</div>
            </div>
            <div>
            <button onClick={handleSubmit} className="border border-black block rounded-lg bg-blue p-2 justify-center w-full">Submit</button>
            </div>
          </div>
        </div>
      </div>
        
      </form>
      <button className="text-black text=xl place-self-end absolute right-2 top-2" onClick={()=>setShowModal(false)}>❌</button>
      </div>
      </div>
      </div>
      </div>
  </>)
}

export default EditAsset