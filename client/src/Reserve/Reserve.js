import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
// import ReservationThreatsForm from './ReservationThreatsForm';
// import ReservationUserForm from './ReservationUserForm';
import DualTimeSelector from './DualTimeSelector';
import ReserveMap from './ReserveMap';
import UserForm from './UserForm';
import ListTable from './ListTable';
import { json } from 'react-router-dom';
import { useCollapse } from 'react-collapsed';
import { GiCompass, GiObservatory } from "react-icons/gi";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import DmsCoordinates, { parseDms } from "dms-conversion";

const Reserve = () => {
  const { listUrl } = useContext(Context);
  // const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [rangeList, setRangeList] = useState([])
  const [center, setCenter] = useState([
    -146.44166473513687, 64.31714411488758,
  ]);

  useEffect(() => {
    let offset = 1000000000
    fetch(`${listUrl}/GetByTitle('Assets')/items`,
      { credentials: 'include', }
    )
      .then((res) => res.json())
      .then((data) => {
        setRangeList([...new Set(data.d.results.map(a => a.Range))])
        setData(data.d.results)
        setData(data.d.results.map(asset=> (
          {...asset,dms:new DmsCoordinates(Number(asset.Latitude),Number(asset.Longitude)) }) ) )
      });
  }, []);

  const selectAll = (e) => {
    let allAssets = data.map(asset => asset.Serial)
    if (selected.toString() !== allAssets.toString() && e.target.checked === true) setSelected(allAssets)
    if (selected.length === allAssets.length) setSelected([])
  }

  return (
    <>

      <div className="flex flex-row">
        <div className=" w-2/3 border border-black mt-5 ml-5">
          <input type="checkbox" onChange={(e) => selectAll(e)} className="ml-3 mr-3" />Select All
          {rangeList.length > 0 ?
            rangeList.map(range => <CollapsibleChild key={range} range={range} selected={selected} setSelected={setSelected} setCenter={setCenter} assets={data.filter(asset => asset.Range === range)} />)
            : <>Loading...</>}
        </div>
        <ReserveMap assetList={data} selected={selected} center={center} setCenter={setCenter} />
      </div>
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
            <div key={asset.Serial} className={`mb-1 flex flex-row`}>
              <div className="flex flex-row w-1/2">
                <input className="ml-7 mr-3" checked={selected.includes(asset.Serial)} type="checkbox" onChange={() => handleChange(asset.Serial)} />
                <GiObservatory />
                <span className="font-medium">{asset.Serial.toUpperCase()}</span>
                {/* <span>{` in ${asset.SiteLocation}`}</span> */}
                <button className="rounded-full p-1 text-sm bg-blue border border-black ml-2 flex flex-row gap-1"
                  onClick={() => centerOnAsset(asset.Latitude, asset.Longitude)}>
                  {asset.Latitude} N
                  {/* {asset.dms.toString()} */}
                  <GiCompass />
                  {asset.Longitude} W
                </button>
              </div>
              <div className={`ml-2 border border-2 w-5/12 text-center ${asset.Status === 'RED' ? `border-red bg-red/40` : `border-green bg-green/40`} ${asset.Status === 'AMBER' ? `border-yellow bg-yellow/40` : ``}`}>
                <span>{`Status: ${asset.Status} Equip: ${asset.Equipment}  Threat: ${asset.Threat}`}</span>
              </div>
              {/* <div className="flex flex-row">{asset.Operational ? <GrCheckboxSelected/>:<GrCheckbox/>}</div> */}
            </div>
          </>)
        }
        )}
      </section>
    </div>
  )
}

export default Reserve;




      // useEffect(() => {
  //   fetch(`${listUrl}/GetByTitle('Assets')/items`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLists(data.d.results);
  //     });
  // }, []);


  // const [userForm, setUserForm] = React.useState({
  //   name: '',
  //   dsn: '',
  //   week: '',
  //   squadron: '',
  // });

  // //TODO
  // const sendForm = () => {
  //   console.log(userForm);
  // };



      //   {/* <ListTable
      //   data={data}
      //   columns={columns}
      //   selected={selected}
      //   setSelected={setSelected}
      //   SubRowComponent={SubRowComponent}
      // /> */}

      //       {/* <div className="flex">
      //   <UserForm setUserForm={setUserForm} />
      //    <DualTimeSelector />
      // </div>
      // {JSON.stringify(selected)} */}

      // const columns = [
//   {
//     Header: 'Add Info',
//     accessor: 'Select',
//     Cell: ({ row }) => (
//       <div
//         {...row.getToggleRowExpandedProps({
//           style: {
//             paddingLeft: `${row.depth * 2}rem`,
//           },
//         })}
//       >
//         {row.isExpanded ? ' 👇 ' : ' 👉 '}
//       </div>
//     ),
//   },
//   {
//     Header: 'Equipment',
//     accessor: 'Equipment',
//   },
//   {
//     Header: 'Serial',
//     accessor: 'Serial',
//   },
//   {
//     Header: 'Threat',
//     accessor: 'Threat',
//   },
//   {
//     Header: 'ThreatType',
//     accessor: 'ThreatType',
//   },
//   {
//     Header: 'SiteLocation',
//     accessor: 'SiteLocation',
//   },
//   {
//     Header: 'Range',
//     accessor: 'Range',
//   },
//   {
//     Header: 'Latitude',
//     accessor: 'Latitude',
//   },
//   {
//     Header: 'Longitude',
//     accessor: 'Longitude',
//   },
//   {
//     Header: 'Elevation',
//     accessor: 'Elevation',
//   },
// ];

// function SubRowComponent({ data }) {

//   return (
//     <div>
//       <p>Additional information for {data.Equipment}</p>
//       <ul>
//         <li>SystemInformation: {data.SystemInformation}</li>
//         <li>StatusDate: {data.StatusDate}</li>
//         <li>Status: {data.Status}</li>
//         <li>Remarks: {data.Remarks}</li>
//         <li>Schedulable: {data.Schedulable}</li>
//         <li>Serial: {data.Serial}</li>
//         <li>Status: {data.Status}</li>
//         <li>Status: {data.Status}</li>
//         <li>Coord Accuracy: {data.Accuracy}</li>
//         <li>CoordSource: {data.CoordSource}</li>
//         <li>CoordRecordedDate: {data.CoordRecordedDate}</li>
//         {/* <li>created: {data.created} | modified: {data.modified} | AuthorId: {data.created} | EditorId: {data.EditorId}</li> */}
//       </ul>
//     </div>
//   );
// }
