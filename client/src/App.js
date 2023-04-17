import './App.css';
import NavBar from './NavBar/NavBar.js';
import Login from './Login/Login.js';
// import Users from './Users/Users.js'
import Register from './Register/Register.js';
import Home from './Home/Home.js';
import Reserve from './Reserve/Reserve.js';
import Reservation from './Reservation/Reservation.js';
import AllReservations from './AllReservations/AllReservations.js';
import AllAssets from './AllAssets/AllAssets.js';
import Asset from './Asset/Asset.js';
import AdminStats from './AdminStats/AdminStats.js';
import MyBook from './Book/Book';

import { Routes, Route, UseNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import QuickLook from './Home/QuickLook.js';
import MP from './Home/MP';
export const Context = React.createContext();

function App() {
  const [userData, setUserdata] = useState({});

  const userUrl = 'http://localhost:3001/user';
  const listUrl = 'http://localhost:3001/_api/web/lists';

  useEffect(() => {
    let reqOpts = {
      method: 'GET',
      'Access-Control-Allow-Origin': '*',
      credentials: 'include',
    };

    fetch(`http://localhost:3001/user/details`, reqOpts)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setUserdata(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <Context.Provider value={{ userData, setUserdata, userUrl, listUrl }}>
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path = "/Users" element={<Users/>}/> */}
          <Route path="/" element={<Home />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path="/AllReservations" element={<AllReservations />} />
          <Route path="/Reservation/:id" element={<Reservation />} />
          <Route path="/AllAssets" element={<AllAssets />} />
          <Route path="/Asset/:id" element={<Asset />} />
          <Route path="/Admin" element={<AdminStats />} />
          <Route path="/Book" element={<MyBook />} />
        </Routes>
        <div className='overflow-hidden mt-20 max-m-auto'>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {/* <Route path = "/Users" element={<Users/>}/> */}
            <Route path="/" element={<Home />} />
            <Route path="/QuickLook" element={<MP />} />
            <Route path="/Reserve" element={<Reserve />} />
            <Route path="/AllReservations" element={<AllReservations />} />
            <Route path="/Reservation/:id" element={<Reservation />} />
            <Route path="/AllAssets" element={<AllAssets />} />
            <Route path="/Asset/:id" element={<Asset />} />
            <Route path="/Admin" element={<AdminStats />} />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
