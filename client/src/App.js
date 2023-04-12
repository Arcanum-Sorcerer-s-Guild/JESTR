import './App.css';
import NavBar from './NavBar/NavBar.js'
import Login from './Login/Login.js'
// import Users from './Users/Users.js'
import Register from './Register/Register.js'
import Home from './Home/Home.js'
import Reserve from './Reserve/Reserve.js'
import Reservation from './Reservation/Reservation.js'
import AllReservations from './AllReservations/AllReservations.js' 
import AllAssets from './AllAssets/AllAssets.js' 
import Asset from './Asset/Asset.js'
import MapExample from './Map/MapExample'


import {Routes, Route, UseNavigate} from 'react-router-dom'

function App() {
  return (<>
  <NavBar />
  <Routes>  
        <Route path = "/Login" element={<Login/>}/>
        <Route path = "/Register" element={<Register/>}/>
        {/* <Route path = "/Users" element={<Users/>}/> */}
        <Route path = "/Home" element={<Home/>}/>
        <Route path = "/Reserve" element={<Reserve/>}/>
        <Route path = "/AllReservations" element={<AllReservations/>}/> 
        <Route path = "/Reservation/:id" element={<Reservation/>}/> 
        <Route path = "/AllAssets" element={<AllAssets/>}/>
        <Route path = "/Asset/:id" element={<Asset/>}/>
        <Route path = "/Map" element={<MapExample/>} />
  </Routes>
  </>);
}

export default App;
