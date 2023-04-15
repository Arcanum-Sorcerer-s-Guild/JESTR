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

const Reserve = () => {
  const { listUrl } = useContext(Context);
  // const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [rangeList, setRangeList] = useState([])

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`,
      { credentials: 'include', }
    )
      .then((res) => res.json())
      .then((data) => {
        setRangeList([...new Set(data.d.results.map(a => a.Range))])
        setData(data.d.results)
      });
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className=" w-2/3 border border-black mt-5 ml-5">
        <input type="checkbox" className="ml-3 mr-3"/>Select All
          {rangeList.length > 0 ?
            rangeList.map(range => <CollapsibleChild key={range} range={range} selected={selected} setSelected={setSelected} assets={data.filter(asset=>asset.Range === range)}/>)
            : <>Loading...</>}
        </div>
        <ReserveMap assetList={data} selected={selected} />
      </div>
    </>
  );
};


const CollapsibleChild = ({range,assets,selected,setSelected}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const handleChange = (name) => {
    if (selected.includes(name)) {
      const index = selected.indexOf(name);
      setSelected(selected.filter((asset)=> asset !== name))
    } else {
      setSelected([...selected,name])
    }
  }



  return(
    <div>
      <button {...getToggleProps()} className="ml-3">
        Range: {range}
      </button>
      <section {...getCollapseProps()}>
        {assets.map(asset=><div key={asset.Serial}><input className="ml-7 mr-3" type="checkbox" onChange={()=>handleChange(asset.Serial)}/>Asset: {asset.Serial}</div>)}
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
