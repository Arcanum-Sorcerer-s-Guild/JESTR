import './App.css';
import NavBar from './NavBar/NavBar.js';
import Login from './Login/Login.js';
// import Users from './Users/Users.js'
import Register from './Register/Register.js';
import Home from './Home/Home.js';
import MP from './Home/MP';
import Reserve from './Reserve/Reserve.js';
import Reservation from './Reservation/Reservation.js';
import AllReservations from './AllReservations/AllReservations.js';
import AllAssets from './AllAssets/AllAssets.js';
import Asset from './Asset/Asset.js';

import { Routes, Route, UseNavigate } from 'react-router-dom';
import React, { useState } from 'react';
export const Context = React.createContext();

function App() {
  const [userData, setUserdata] = useState({});

  const userUrl = 'http://localhost:3001/user';
  const listUrl = 'http://localhost:3001/_api/web/lists';

  return (
    <div className="bg-gunmetal">
      <Context.Provider value={{ userData, setUserdata, userUrl, listUrl }}>
        <NavBar />
        <div className=''>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {/* <Route path = "/Users" element={<Users/>}/> */}
            <Route path="/" element={<Home />} />
            <Route path="/MP" element={<MP />} />
            <Route path="/Reserve" element={<Reserve />} />
            <Route path="/AllReservations" element={<AllReservations />} />
            <Route path="/Reservation/:id" element={<Reservation />} />
            <Route path="/AllAssets" element={<AllAssets />} />
            <Route path="/Asset/:id" element={<Asset />} />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
