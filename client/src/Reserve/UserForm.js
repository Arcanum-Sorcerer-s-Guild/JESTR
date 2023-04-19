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
      <div className="text-center">
        <div className="p-2 flex ">
          <div className="p-1 w-full">
            <label className="text-text text-center underline block text-sm font-medium text-gray-700">
              Squadron
            </label>
            <UserDropDown
              dropDownItems={squadronDDOpts}
              dropdown={squadronDD}
              setDropdown={setSquadronDD}
            />
          </div>
          <div className="p-1 w-full">
            <label className="text-text text-center underline block text-sm font-medium text-gray-700">
              POC
            </label>
            <input
              type="text"
              className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md    sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {squadronDD === squadronDDOpts[0] ? (
            <div className="p-1 w-full">
              <label className="text-text text-center underline block text-sm font-medium text-gray-700">
                Squadron
              </label>
              <input
                type="text"
                className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md    sm:text-sm"
                onChange={(e) => setSquadron(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="p-1 w-full">
            <label className="text-text text-center underline block text-sm font-medium text-gray-700">
              DSN
            </label>
            <input
              type="tel"
              className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm"
              onChange={(e) => setDSN(e.target.value)}
            />
          </div>
          <div className="p-1 w-full">
            <label className="text-text text-center underline block text-sm font-medium text-gray-700">
              Week
            </label>

            <input
              type="week"
              className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md sm:text-sm"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
