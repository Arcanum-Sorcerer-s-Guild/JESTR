import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
// import ReservationThreatsForm from './ReservationThreatsForm';
// import ReservationUserForm from './ReservationUserForm';
import TimeSelector from './DuelTimeSelector';
import ReserveMap from './ReserveMap';
import UserForm from './UserForm';
import ListTable from './ListTable';
import { json } from 'react-router-dom';


const columns = [
  {
    Header: "",
    accessor: "Select",
    Cell: ({ row }) => (
      <div
        {...row.getToggleRowExpandedProps({
          style: {
            paddingLeft: `${row.depth * 2}rem`,
          },
        })}
      >
        {row.isExpanded ? "-" : "+"}
      </div>
    ),
  },
  {
    Header: "Equipment",
    accessor: "Equipment",
  },
  {
    Header: "Threat",
    accessor: "Threat",
  },
  {
    Header: "ThreatType",
    accessor: "ThreatType",
  },
  {
    Header: "SystemInformation",
    accessor: "SystemInformation",
  },
  {
    Header: "StatusDate",
    accessor: "StatusDate",
  },
  {
    Header: "Status",
    accessor: "Status",
  },
  {
    Header: "Remarks",
    accessor: "Remarks",
  },
  {
    Header: "Schedulable",
    accessor: "Schedulable",
  },
  {
    Header: "Serial",
    accessor: "Serial",
  },
  {
    Header: "SiteLocation",
    accessor: "SiteLocation",
  },
  {
    Header: "Latitude",
    accessor: "Latitude",
  },
  {
    Header: "Longitude",
    accessor: "Longitude",
  },
  {
    Header: "Elevation",
    accessor: "Elevation",
  },
  {
    Header: "Accuracy",
    accessor: "Accuracy",
  },
  {
    Header: "CoordSource",
    accessor: "CoordSource",
  },
  {
    Header: "CoordRecordedDate",
    accessor: "CoordRecordedDate",
  },
  {
    Header: "created",
    accessor: "created",
  },
  {
    Header: "modified",
    accessor: "modified",
  },
  {
    Header: "AuthorId",
    accessor: "AuthorId",
  },
  {
    Header: "EditorId",
    accessor: "EditorId",
  }
]
const Reserve = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((data) => {
        setLists(data.d.results);
      });
  }, []);


  const [userForm, setUserForm] = React.useState({
    name: '',
    dsn: '',
    week: '',
    squadron: ''
  })

  //TODO
  const sendForm = () => {
    console.log(userForm)
  }

  useEffect(() => {
    fetch("http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items")
      .then(res => res.json())
      .then(data => setData(data.d.results))
  }, [])

  return (
    <>
      <ReserveMap assetList={lists} />
      <ListTable
        data={data}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="flex">
        <UserForm setUserForm={setUserForm} />
        <TimeSelector />

      </div>

      {JSON.stringify(selected)}
    </>
  );
};

export default Reserve;
