import React, { useEffect, useState } from 'react';
import UserDropDown from './UserDropDown';
const squadronDDOpts = ['Other', 'Demons', 'Falcons']

export default function UserForm({ setUserForm }) {
  const [squadronDD, setSquadronDD] = useState(squadronDDOpts[0])
  const [name, setName] = useState('')
  const [dsn, setDSN] = useState('')
  const [week, setWeek] = useState('')
  const [squadron, setSquadron] = useState('')

  useEffect(() => {
    setUserForm({
      name: name,
      dsn: dsn,
      week: week,
      squadron: squadron
    })
  }, [name, dsn, week, squadron, setUserForm])

  useEffect(() => {
    if (squadronDD === squadronDDOpts[0]) {
      setSquadron('')
    } else if (squadronDD === squadronDDOpts[1]) {
      setSquadron('Demons')
    } else if (squadronDD === squadronDDOpts[2]) {
      setSquadron('Falcons')
    }
  }, [squadronDD])

  return (
    <>
      <div className="top-16 w-72">
        <div className='p-5'>
          Squadron: <UserDropDown dropDownItems={squadronDDOpts} dropdown={squadronDD} setDropdown={setSquadronDD} />
          Name: <input type='text' className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" onChange={(e) => setName(e.target.value)} />
          {squadronDD === squadronDDOpts[0] ? <>Squadron: <input type='text' className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" onChange={(e) => setSquadron(e.target.value)} /></> : <></>}
          DSN: <input type='tel' className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" onChange={(e) => setDSN(e.target.value)} />
          Week: <input type='week' className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" onChange={(e) => setWeek(e.target.value)} />
        </div>
      </div>
    </>
  )
}
