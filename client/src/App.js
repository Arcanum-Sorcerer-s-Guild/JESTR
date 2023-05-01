import React, { useState, useEffect } from 'react';
import UserAuthRoutes from './Routes/UserAuthRoutes';
import AdminAuthRoutes from './Routes/AdminAuthRoutes';
import NoAuthRoutes from './Routes/NoAuthRoutes';
import { Routes, Route, UseNavigate, Navigate, json } from 'react-router-dom';
import AppContextProvider from './Components/Wrappers/AppContextProvider.js';
import AppContext from './Context/AppContext';
import './App.css';
import AppBGWrapper from './Components/Wrappers/AppBGWrapper.js';
import NavBar from './Components/Wrappers/NavBar';
import { userDetailsFetch } from './utils/api/endPoints.js';

function App() {
  const [userData, setUserdata] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserdata(foundUser);
    }
  }, []);

  useEffect(() => {
    userDetailsFetch((e) => setUserdata(e));
  }, []);

  return (
      <AppContextProvider value={{ userData, setUserdata }}>
        <NavBar />
        {localStorage.getItem('user') ? <UserAuthRoutes /> : <NoAuthRoutes />}
        {/* <NoAuthRoutes /> */}
        {/* <UserAuthRoutes /> */}
        {/* <AdminAuthRoutes /> */}
      </AppContextProvider>
  );
}
export default App;
