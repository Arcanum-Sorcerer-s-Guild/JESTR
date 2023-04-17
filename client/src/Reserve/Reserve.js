import React, { useEffect, useContext, useMemo, useState } from 'react';
import { Context } from '../App';

import DualTimeSelector from './DualTimeSelector';
import ReserveMap from './ReserveMap';
import UserForm from './UserForm';
import ListTableNoCheck from './ListTableNoCheck';
import { json } from 'react-router-dom';
import { useCollapse } from 'react-collapsed';
import { GiCompass, GiObservatory } from "react-icons/gi";
import { FaMountain } from "react-icons/fa"
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5"
import DmsCoordinates, { parseDms } from "dms-conversion";
import { Resizable } from "re-resizable";
import { DateTime } from "luxon";
import Modal from './Modal';


let formColumns = [
  {
    Header: 'Equip',
    accessor: 'Equipment',
  },
  {
    Header: 'Threat',
    accessor: 'Threat',
  },
];


const Reserve = () => {
  const { listUrl } = useContext(Context);
  // const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [rangeList, setRangeList] = useState([])
  const [center, setCenter] = useState([
    -146.44166473513687, 64.31714411488758,
  ]);



  const [timeList, setTimeList] = useState([]);
  const [formNewColumns, setFormNewColumns] = useState([]);
  const [dateForm, setDateForm] = useState([]);
  const [requestedWeek, setRequestedWeek] = useState([]);
  const [userForm, setUserForm] = React.useState({
    name: '',
    dsn: '',
    squadron: '',
  });
  const [selectedData, setSelectedData] = useState([]);

  const [showModale, setShowModale] = useState(false);


  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`,
      { credentials: 'include', }
    )
      .then((res) => res.json())
      .then((data) => {
        setRangeList([...new Set(data.d.results.map(a => a.Range))])
        setData(data.d.results)
        setData(data.d.results.map(asset => (
          { ...asset, dms: new DmsCoordinates(Number(asset.Latitude), Number(asset.Longitude)) })))
      });
  }, []);

  const selectAll = (e) => {
    let allAssets = data.map(asset => asset.Serial)
    if (selected.toString() !== allAssets.toString() && e.target.checked === true) setSelected(allAssets)
    if (selected.length === allAssets.length) setSelected([])
  }


  useEffect(() => {
    setSelectedData(data.filter((line) => selected.includes(line.Serial)))
  }, [selected])


  let excludeFilter = (array, filters) => {
    console.log(array)
    let test = array.filter(({ id }) => {

      console.log("test", id === filters)
      return true
    }
    )

    return test

  }


  const dropdownHandler = (row, target) => {
    const newdateForm = dateForm;

    // const dropdownHandler = (row, target, e) => {
    let times = [];
    const requestDate = target.id.split("--")[1];





    if (target.value === "none") {
      timeList.forEach(({ name, start, end }) => {
        let data = excludeFilter(newdateForm, (row.original.Serial + '--' + requestDate));
        console.log("data", data)
        setDateForm(prevItems => [data]);
      })
      return 'removed all'
    }
    if (target.value === 'all') {
      timeList.forEach(({ name, start, end }) => {
        // let data = excludeFilter(dateForm, `${row.original.Serial}--${requestDate}`)
        let dataNew = [{
          id: `${row.original.Serial}--${requestDate}`,
          times: `${start}-${end}`,
          Range: row.original.Range,
          SiteLocation: row.original.SiteLocation,
          Threat: row.original.Threat,
          Equipment: row.original.Equipment,
          ThreatType: row.original.ThreatType,
          EventDate: DateTime.fromISO(`${requestDate}T${start}`).toLocal().toUTC().toISO(),
          EndDate: DateTime.fromISO(`${requestDate}T${end}`).toLocal().toUTC().toISO(),
          Status: 'Pending'
        }]
        setDateForm(prevItems => [...prevItems, ...dataNew]);
      })
    }

    // console.log("dataNew", dataNew)

    // setDateForm([...dateForm, {
    //   id: `${row.original.Serial}--${requestDate}`,
    //   times: `${start}-${end}`,
    //   Range: row.original.Range,
    //   SiteLocation: row.original.SiteLocation,
    //   Threat: row.original.Threat,
    //   Equipment: row.original.Equipment,
    //   ThreatType: row.original.ThreatType,
    //   EventDate: DateTime.fromISO(`${requestDate}T${start}`).toLocal().toUTC().toISO(),
    //   EndDate: DateTime.fromISO(`${requestDate}T${end}`).toLocal().toUTC().toISO(),
    //   Status: 'Pending'
    // }])

  }






  //   //todo Add POC name

  const optionsFormat = () => {
    return requestedWeek.map((x, index) => {
      return {
        Header: x,
        accessor: x,
        Cell: ({ row, column }) => (
          <div>
            <select id={`row-${row.id}-col--${column.id}`} name="timeSelector" onChange={(e) => {

              const requestDate = e.target.id.split("--")[1];
              const id = `${row.original.Serial}--${requestDate}`;
              
              const newDateForm = dateForm.filter((item, index) => {
                // console.log(dateForm)
                console.log(item.id, id);
                return item.id === id
              })

              if (newDateForm.length === 0) {
                // console.log("test")
                setDateForm(prevItems => [...prevItems, { rowOrigional: row.original, targetId: e.target.id, targetValue: e.target.value, id: id }])
              }

              console.log(newDateForm)


            }
            }>
              <option value="none">None</option>
              {timeList.map((y, index) => {
                return (
                  <option key={index} value={y.name}>
                    {y.name}
                  </option>
                  // <></>
                );
              })}
              <option value="all">All</option>
            </select>
          </div>
        ),
      }
    });
  }

  useEffect(() => {
    let options = optionsFormat();
    setFormNewColumns([...formColumns, ...options]);
  }, [requestedWeek, timeList])

  //TODO
  const sendForm = () => {
    console.log(userForm);
  };



  return (
    <>

      <div className="flex flex-row">
        <Resizable className="border-double hover:border-dashed border-r-2 border-black mt-5 ml-5"
          defaultSize={{
            width: 475,
            height: 750,
          }}
          minWidth={475} minHeight={750} maxHeight={750}

        >
          <div className=" border border-black mr-2 h-full overflow-scroll">
            <input type="checkbox" onChange={(e) => selectAll(e)} className="ml-3 mr-3" />Select All
            {rangeList.length > 0 ?
              rangeList.map(range => <CollapsibleChild key={range} range={range} selected={selected} setSelected={setSelected} setCenter={setCenter} assets={data.filter(asset => asset.Range === range)} />)
              : <>Loading...</>}
          </div>
        </Resizable>

        <ReserveMap assetList={data} selected={selected} center={center} setCenter={setCenter} />
        

      </div>
      <button onClick={() => setShowModale(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Open Form</button>

      {/* {console.log("selectedData", selectedData)}
          {console.log(data)} */}
      <Modal
        isvisible={showModale}
        onClose={() => {
          setShowModale(false);
        }}
      >
        {<>
          <div className="flex">
            <UserForm setUserForm={setUserForm} setRequestedWeek={setRequestedWeek} />
            <DualTimeSelector timeList={timeList} setTimeList={setTimeList} />
            {/* TODO, make the input wok for all items  */}
            <input type="text" onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })} name="Notes" placeholder="Notes" />
            
          </div>
          {selectedData.length !== 0 ? <ListTableNoCheck
            data={selectedData}
            columns={formNewColumns}
            selected={selected}
            setSelected={setSelected}
          /> : "Please close this form and select Threats"}
          
          <br></br>
          Number of requests: {dateForm.length}
            <br></br>
          JSON Test: {JSON.stringify(dateForm, null, 2)}
        </>}
      </Modal>


    </>
  );
};


const CollapsibleChild = ({ range, assets, selected, setSelected, setCenter }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [selectAll, setSelectAll] = useState(false)


  const handleChange = (name) => {
    if (selected.includes(name)) {
      const index = selected.indexOf(name);
      setSelected(selected.filter((asset) => asset !== name))
    } else {
      setSelected([...selected, name])
    }
  }

  const selectRange = (e) => {
    let allAssets = assets.filter(asset => asset.Range === range).map(asset => asset.Serial)
    let allIncluded = assets.reduce((acc, curr) => acc ? selected.includes(curr.Serial) : false, true)
    if (!allIncluded && e.target.checked) setSelected([...selected, ...allAssets])
    if (allIncluded) setSelected(selected.filter(asset => !allAssets.includes(asset)))
  }

  const centerOnAsset = (lat, lon) => {
    setCenter([Number(lon), Number(lat)])
  }

  return (
    <div>
      <input
        type="checkbox"
        className="ml-3 mr-3"
        checked={assets.reduce((acc, curr) => acc ? selected.includes(curr.Serial) : false, true)}
        onChange={(e) => selectRange(e)}
      />
      <button {...getToggleProps()}>
        {isExpanded ? '↓ ' : '> '}Range: {range}
      </button>
      <section {...getCollapseProps()}>
        {assets.map(asset => {
          return (<>

            <div key={asset.Serial} className={`mb-1 flex flex-row overflow whitespace-nowrap`}>
              <div className="flex w-full">
                <div className="flex items-center min-w-[450px] ">
                  <input className="ml-7 mr-3" checked={selected.includes(asset.Serial)} type="checkbox" onChange={() => handleChange(asset.Serial)} />
                  <GiObservatory />
                  <span className="font-medium w-1/3 ml-1 mr-3">{asset.Serial.toUpperCase()}</span>
                  <div className="w-full flex justify-end">
                    <button className=" w-full rounded-full p-1 text-sm bg-blue border border-black ml-2 mr-2 flex flex-row gap-1 items-center"
                      onClick={() => centerOnAsset(asset.Latitude, asset.Longitude)}>
                      <IoLocationSharp />
                      <span className="pl-1">{`${asset.dms.toString().slice(0, 12)}${asset.dms.toString().slice(24, 41)}${asset.dms.toString().slice(-3, 57)}`}</span>
                    </button>
                  </div>

                </div>


                <div className="flex flex-row min-w-2/3 items-center">
                  <div className="flex flex-row items-center gap-1"><FaMountain />{`El: ${asset.Elevation}`}</div>
                  <div className={`ml-2 flex justify-between border-2 min-w-[450px] overflow:hidden whitespace-nowrap text-center
                      ${asset.Status === 'AMBER' ? `border-yellow bg-yellow/40` : ``}
                      ${asset.Status === 'GREEN' ? `border-green bg-green/40` : ``}
                      ${asset.Status === 'RED' ? `border-red bg-red/40` : ``}
                      ${asset.Status === 'NA' ? `border-gray bg-gray/40` : ``}
                    `}>
                    <span className="font-medium pl-1">{`${asset.ThreatType.toUpperCase()}`}</span>
                    <span className="pr-1">{`Equip: ${asset.Equipment}  Threat: ${asset.Threat} Status: ${asset.Status}`}</span>
                  </div>

                  <div className="flex flex-row ml-2 items-center font-medium">Schedulable: {asset.Schedulable ? <>✔️</> : <>❌</>}</div>
                  <div className="flex flex-row ml-2 items-center font-medium">OpStatus: {asset.Operational ? <>✔️</> : <>❌</>}</div>
                  <span className=" ml-3 whitespace-nowrap">{`Located at Site: ${asset.SiteLocation}`}</span>


                </div>

              </div>
            </div>
          </>)
        }
        )}
      </section>



    </div>
  )
}

export default Reserve;
