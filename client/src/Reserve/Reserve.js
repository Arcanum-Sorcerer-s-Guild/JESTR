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
import { FaMountain } from "react-icons/fa"
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import DmsCoordinates, { parseDms } from "dms-conversion";
import { Resizable } from "re-resizable";



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
        <Resizable className="border-double hover:border-dashed border-r-2 border-black mt-5 ml-5"
        defaultSize={{
          width:475,
          height:750,
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

            <div key={asset.Serial} className={`mb-1 flex flex-row overflow-hidden whitespace-nowrap`}>
            <div className="flex w-full">
              <div className="flex items-center min-w-[450px] ">
                <input className="ml-7 mr-3" checked={selected.includes(asset.Serial)} type="checkbox" onChange={() => handleChange(asset.Serial)} />
                <GiObservatory />
                <span className="font-medium w-1/3 ml-1 mr-3">{asset.Serial.toUpperCase()}</span>
                <div className="w-2/3 flex justify-end">
                  <button className="rounded-full p-1 text-sm bg-blue border border-black ml-2 mr-2 flex flex-row gap-1 items-center"
                    onClick={() => centerOnAsset(asset.Latitude, asset.Longitude)}>
                    <GiCompass/>
                    {`${asset.dms.toString().slice(0,12)}${asset.dms.toString().slice(24,41)}${asset.dms.toString().slice(-3,57)}`}
                  </button>
                </div>

              </div>


              <div className="flex flex-row min-w-2/3 items-center">
                    <div className="flex flex-row items-center gap-1"><FaMountain/>{`El: ${asset.Elevation}`}</div>
                    <div className={`ml-2 flex justify-between border border-2 min-w-[450px] overflow:hidden whitespace-nowrap text-center
                      ${asset.Status === 'AMBER' ? `border-yellow bg-yellow/40` : ``}
                      ${asset.Status==='GREEN'? `border-green bg-green/40`:``}
                      ${asset.Status === 'RED' ? `border-red bg-red/40` :``}
                      ${asset.Status==='NA'?`border-gray bg-gray/40`:``}
                    `}>
                      <span className="font-medium pl-1">{`${asset.ThreatType.toUpperCase()}`}</span>
                      <span className="pr-1">{`Equip: ${asset.Equipment}  Threat: ${asset.Threat} Status: ${asset.Status}`}</span>
                    </div>

                  <div className="flex flex-row ml-2 items-center font-medium">Schedulable: {asset.Schedulable ? <>✔️</>:<>❌</>}</div>
                  <div className="flex flex-row ml-2 items-center font-medium">OpStatus: {asset.Operational ? <>✔️</>:<>❌</>}</div>
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
