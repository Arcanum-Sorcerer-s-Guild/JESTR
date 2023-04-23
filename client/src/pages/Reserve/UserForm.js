import React, { useEffect, useState, useContext } from 'react';
import UserDropDown from './UserDropDown';
import AppContext from '../../Context/AppContext.js';
import { DateTime } from 'luxon';

const squadronDDOpts = ['Other', 'Demons', 'Falcons'];
export default function UserForm({ setUserForm, setRequestedWeek }) {
  const defaultWeek = DateTime.now()
    .startOf('week')
    .toISOWeekDate()
    .toString()
    .split('-');
  const title = useContext(AppContext).userData.Title;
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
        <div className="flex ">
          <div className="p-1.5 w-full">
            <label className="text-gray-light text-left block text-xs font-light mb-0.5 ml-1">
              Squadron:
            </label>
            <UserDropDown
              dropDownItems={squadronDDOpts}
              dropdown={squadronDD}
              setDropdown={setSquadronDD}
            />
          </div>
          {squadronDD === squadronDDOpts[0] ? (
            <div className="p-1.5 w-full">
              <label className="text-gray-light text-left block text-xs font-light ml-1">
                Squadron Name:
              </label>
              <input
                type="text"
                placeholder="squadron name..."
                className="form-input bg-gray-dark relative w-full cursor-default rounded-md border-none text-gray-light py-1 pl-3 pr-10 text-left shadow-md text-xs"
                onChange={(e) => setSquadron(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="p-1.5 w-full">
            <label className="text-gray-light text-left block text-xs font-light ml-1">
              POC:
            </label>
            <input
              type="text"
              className="form-input bg-gray-dark relative w-full cursor-default rounded-md border-none text-gray-light py-1 pl-3 pr-10 text-left shadow-md    text-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="p-1.5 w-full">
            <label className="text-gray-light text-left block text-xs font-light ml-1">
              DSN:
            </label>
            <input
              type="tel"
              placeholder="xxx-xxx-xxxx"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              minlength="9"
              maxlength="14"
              size="20"
              className="form-input bg-gray-dark relative w-full cursor-default rounded-md border-none text-gray-light py-1 pl-3 pr-10 text-left shadow-md text-xs"
              onChange={(e) => setDSN(e.target.value)}
            />
          </div>
          <div className="p-1.5 w-full">
            <label className="text-gray-light text-left block text-xs font-light ml-1">
              Week:
            </label>

            <input
              type="week"
              className="form-input bg-gray-dark relative w-full cursor-default rounded-md border-none text-gray-light py-1 pl-3 text-left shadow-md text-xs"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
