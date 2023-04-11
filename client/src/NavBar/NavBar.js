import React from 'react'
import {Link} from 'react-router-dom'

import Login from '../Login/Login.js'
import Register from '../Register/Register.js'
import Home from '../Home/Home.js'
import Reserve from '../Reserve/Reserve.js'
import Reservation from '../Reservation/Reservation.js'
import AllReservations from '../AllReservations/AllReservations.js' 
import AllAssets from '../AllAssets/AllAssets.js' 
import Asset from '../Asset/Asset.js'

const NavBar = () => {

  return (<>
    <h1>NavBar</h1>
      <Link to="/Login" element={<Login/>}>Login</Link><br/>
      <Link to="/Register" element={<Register/>}>Register</Link><br/>
      <Link to="/Home" element={<Home/>}>Home</Link><br/>
      <Link to="/Asset" element={<Asset/>}>Asset</Link><br/>
      <Link to="/AllAssets" element={<AllAssets/>}>AllAssets</Link><br/>
      <Link to="/Reserve" element={<Reserve/>}>Reserve</Link><br/>
      <Link to="/Reservation" element={<Reservation/>}>Reservation</Link><br/>
      <Link to="/AllReservations" element={<AllReservations/>}>AllReservations</Link><br/>
  </>)
}

export default NavBar;
