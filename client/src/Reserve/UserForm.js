import React, { useEffect, useState, useContext } from 'react';
import UserDropDown from './UserDropDown';
import { Context } from '../App';
import { DateTime } from 'luxon';

const squadronDDOpts = ['Other', 'Demons', 'Falcons'];
export default function UserForm({ setUserForm, setRequestedWeek }) {
  const defaultWeek = DateTime.now()
    .startOf('week')
    .toISOWeekDate()
    .toString()
    .split('-');
  const title = useContext(Context).userData.Title;
  const [squadronDD, setSquadronDD] = useState(squadronDDOpts[0]);
  const [name, setName] = useState(title);
  const [dsn, setDSN] = useState('');
  const [week, setWeek] = useState(`${defaultWeek[0]}-${defaultWeek[1]}`);
  const [squadron, setSquadron] = useState('');

  useEffect(() => {
    setUserForm({
      POC: name,
      ContactDSN: dsn,
      Squadron: squadron,
    });
  }, [name, dsn, squadron, setUserForm]);

  useEffect(() => {
    const weekDays = [];
    for (let i = 1; i < 8; i++) {
      let day = DateTime.fromISO(`${week}-${i}`).toISODate();
      weekDays.push(day);
    }
    setRequestedWeek(weekDays);
  }, [week]);

  useEffect(() => {
    if (squadronDD === squadronDDOpts[0]) {
      setSquadron('');
    } else if (squadronDD === squadronDDOpts[1]) {
      setSquadron('Demons');
    } else if (squadronDD === squadronDDOpts[2]) {
      setSquadron('Falcons');
    }
  }, [squadronDD]);

  return (
    <>
      {/* //Todo convert to flex */}
      <div className="top-16 w-72">
        <div className="p-5">
          Squadron:
          <UserDropDown
            dropDownItems={squadronDDOpts}
            dropdown={squadronDD}
            setDropdown={setSquadronDD}
          />
          Name:
          <input
            type="text"
            className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {squadronDD === squadronDDOpts[0] ? (
            <>
              Squadron:
              <input
                type="text"
                className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                onChange={(e) => setSquadron(e.target.value)}
              />
            </>
          ) : (
            <></>
          )}
          DSN:
          <input
            type="tel"
            className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            onChange={(e) => setDSN(e.target.value)}
          />
          Week:
          <input
            type="week"
            className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
