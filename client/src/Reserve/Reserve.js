import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
// import ReservationThreatsForm from './ReservationThreatsForm';
// import ReservationUserForm from './ReservationUserForm';
import TimeSelector from './DuelTimeSelector';
import ReserveMap from './ReserveMap';

const Reserve = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results[0].AuthorId);
        setLists(data.d.results);
      });
  }, []);

  const [data, setData] = useState([])

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
      .then(data => setData(data))
  })

  return (
    <>
      <h1>Reserve</h1>
      <ReserveMap assetList={lists}/>
      <TimeSelector name="Time 1" />
    </>
  );
};

  return (<>
    {JSON.stringify(data)}
    <div className='flex content-center text-center p-auto m-auto'>
      <UserForm setUserForm={setUserForm} />

      <TimeSelector />
    </div>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={sendForm}>  Submit </button>

  </>)
}

export default Reserve;
