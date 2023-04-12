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

  return (
    <>
      <h1>Reserve</h1>
      <ReserveMap assetList={lists}/>
      <TimeSelector name="Time 1" />
    </>
  );
};

export default Reserve;
