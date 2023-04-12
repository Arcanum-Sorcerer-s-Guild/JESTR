import React from 'react'
// import ReservationThreatsForm from './ReservationThreatsForm';
// import ReservationUserForm from './ReservationUserForm';
import TimeSelector from './DuelTimeSelector';
import ReserveMap from './ReserveMap'

const Reserve = () => {

  return (<>
    <h1>Reserve</h1>
    <ReserveMap/>
    <TimeSelector name="Time 1" />
    
  </>)
}

export default Reserve;