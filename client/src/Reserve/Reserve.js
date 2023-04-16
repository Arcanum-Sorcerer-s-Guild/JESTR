import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';

import DualTimeSelector from './DualTimeSelector';
import ReserveMap from './ReserveMap';
import UserForm from './UserForm';
import ListTable from './ListTable';
import { DateTime } from 'luxon';

let assetColumns = [
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
let formColumns = [
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

  const [timeList, setTimeList] = useState([]);
  const [formNewColumns, setFormNewColumns] = useState([]);
  const [dateForm, setDateForm] = useState([]);

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`,
      { credentials: 'include', }
    )
      .then((res) => res.json())
      .then((data) => {
        setLists(data.d.results);
      });
  }, []);



  const [requestedWeek, setRequestedWeek] = useState([]);
  const [userForm, setUserForm] = React.useState({
    name: '',
    dsn: '',
    squadron: '',
  });

  const dropdownHandler = (row, target, e) => {
    let times = [];
    if (target.value === "none") {
      times = [];
    } else if (target.value === 'all') {
      times.push(...timeList);
    } else {
      timeList.map(time => {
        if (time.name === target.value) {
          times.push(time);
        }
      })
    }

    //todo Add POC name
    times.map(({ name, start, end }) => {
      const vulName = name;
      const startTime = start;
      const endTime = end;
      const requestDate = target.id.split("--")[1];

      // requests[`${row.original.Serial}--${requestDate}--${startTime}-${endTime}`] = {
      //   Range: row.original.Range,
      //   SiteLocation: row.original.SiteLocation,
      //   Threat: row.original.Threat,
      //   Equipment: row.original.Equipment,
      //   ThreatType: row.original.ThreatType,
      //   EventDate: DateTime.fromISO(`${requestDate}T${startTime}`).toLocal().toUTC().toISO(),
      //   EndDate: DateTime.fromISO(`${requestDate}T${endTime}`).toLocal().toUTC().toISO(),
      //   Status: 'Pending'
      // }

      setDateForm(dateForm => [...dateForm, {
        title: `${row.original.Serial}--${requestDate}--${startTime}-${endTime}`,
        Range: row.original.Range,
        SiteLocation: row.original.SiteLocation,
        Threat: row.original.Threat,
        Equipment: row.original.Equipment,
        ThreatType: row.original.ThreatType,
        EventDate: DateTime.fromISO(`${requestDate}T${startTime}`).toLocal().toUTC().toISO(),
        EndDate: DateTime.fromISO(`${requestDate}T${endTime}`).toLocal().toUTC().toISO(),
        Status: 'Pending'
      }]);

    });



  }


  const optionsFormat = () => {
    return requestedWeek.map((x, index) => {
      return {
        Header: x,
        accessor: x,
        Cell: ({ row, column }) => (
          <div>
            <select id={`row-${row.id}-col--${column.id}`} name="timeSelector" onChange={(e) => dropdownHandler(row, e.target, e)}>
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

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`,
      { credentials: 'include', }
    )
      .then((res) => res.json())
      .then((data) => setData(data.d.results));
  }, []);

  return (
    <>
      <ReserveMap assetList={selected} />
      <ListTable
        data={data}
        columns={assetColumns}
        selected={selected}
        setSelected={setSelected}
        SubRowComponent={SubRowComponent}
      />
      <div className="flex">
        <UserForm setUserForm={setUserForm} setRequestedWeek={setRequestedWeek} />
        <DualTimeSelector timeList={timeList} setTimeList={setTimeList} />
        {/* TODO, make the input wok for all items  */}
        <input type="text" onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })} name="Notes" placeholder="Notes" />
      </div>

      <ListTable
        data={selected}
        columns={formNewColumns}
        selected={selected}
        setSelected={setSelected}
        SubRowComponent={SubRowComponent}
      />

    </>
  );
};

export default Reserve;
