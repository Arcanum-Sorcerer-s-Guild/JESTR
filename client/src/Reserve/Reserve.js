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
    Header: 'Add Info',
    accessor: 'Select',
    Cell: ({ row }) => (
      <div
        {...row.getToggleRowExpandedProps({
          style: {
            paddingLeft: `${row.depth * 2}rem`,
          },
        })}
      >
        {row.isExpanded ? ' 👇 ' : ' 👉 '}
      </div>
    ),
  },
  {
    Header: 'Equipment',
    accessor: 'Equipment',
  },
  {
    Header: 'Serial',
    accessor: 'Serial',
  },
  {
    Header: 'Threat',
    accessor: 'Threat',
  },
  {
    Header: 'ThreatType',
    accessor: 'ThreatType',
  },
  {
    Header: 'SiteLocation',
    accessor: 'SiteLocation',
  },
  {
    Header: 'Range',
    accessor: 'Range',
  },
  {
    Header: 'Latitude',
    accessor: 'Latitude',
  },
  {
    Header: 'Longitude',
    accessor: 'Longitude',
  },
  {
    Header: 'Elevation',
    accessor: 'Elevation',
  },

];

function SubRowComponent({ data }) {
  return (
    <div>
      <p>Additional information for {data.Equipment}</p>
      <ul>
        <li>SystemInformation: {data.SystemInformation}</li>
        <li>StatusDate: {data.StatusDate}</li>
        <li>Status: {data.Status}</li>
        <li>Remarks: {data.Remarks}</li>
        <li>Schedulable: {data.Schedulable}</li>
        <li>Serial: {data.Serial}</li>
        <li>Status: {data.Status}</li>
        <li>Status: {data.Status}</li>
        <li>Coord Accuracy: {data.Accuracy}</li>
        <li>CoordSource: {data.CoordSource}</li>
        <li>CoordRecordedDate: {data.CoordRecordedDate}</li>
        {/* <li>created: {data.created} | modified: {data.modified} | AuthorId: {data.created} | EditorId: {data.EditorId}</li> */}
      </ul>
    </div>
  );
}

const Reserve = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

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
    squadron: '',
  });

  //TODO
  const sendForm = () => {
    console.log(userForm);
  };

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((data) => setData(data.d.results));
  }, []);

  return (
    <>
    {/* {JSON.stringify(selected)} */}
      <ReserveMap assetList={selected} />
      <ListTable
        data={data}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        SubRowComponent={SubRowComponent}
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
