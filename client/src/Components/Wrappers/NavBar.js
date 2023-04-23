import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext.js'

//icons
import { FiMenu, FiRadio } from 'react-icons/fi';
import { RiAdminFill } from 'react-icons/ri';
import { FaMapMarkedAlt, FaEye, FaUserCircle } from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import { GiFrostfire } from 'react-icons/gi';
// import GiFrostfire from './ArcanumIconP.png';

import NavBarLinksItem from '../Items/Links/NavBarLinksItem.js';
import { userSignOut } from '../../utils/api/endPoints.js';

const NavBar = () => {
  const { userData, setUserdata } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); //true = open /false =closed

  const authenticatedLinks = [
    { to: '/', text: 'Quick Look', icon: <FaEye /> },
    { to: '/Reserve', text: 'Scheduler', icon: <FaMapMarkedAlt /> },
    { to: '/AllAssets', text: 'Assets', icon: <FiRadio /> },
    { to: '/AllReservations', text: 'Reservations', icon: <BsCardChecklist /> },
  ];

  const nonauthenticatedLinks = [
    { to: '/', text: 'Login', icon: <FaUserCircle className="mr-2" /> },
    { to: '/Register', text: 'Register', icon: <FaMapMarkedAlt /> },
  ];

  const authenticatedAdminLinks = [
    { to: '/Admin', text: 'Admin', icon: <RiAdminFill /> }
  ]

  const navLinks = () => {
    if (userData.Id) {
      let navBar = userData.IsSiteAdmin ? [...authenticatedLinks, ...authenticatedAdminLinks] : authenticatedLinks;
      return navBar;
    } else {
      return nonauthenticatedLinks;
    }
  }

  const signOut = async () => {
    await userSignOut(e => {
      setUserdata(e);
    })
  }

  let loggedIn = (
    <Link
      to="/"
      className={`${!open ? 'hidden' : ''
        } duration-300 flex md:inline-flex p-4 items-center bg-gunmetal hover:text-text text-blue`}
    >
      <FaUserCircle className="mr-2" />
      <span onClick={signOut}>Sign Out</span>
    </Link>
  );

  let adminLink = (
    <Link
      className={`flex ${userData.IsSiteAdmin === true ? '' : 'hidden'
        } p-4 items-center hover:text-text`}
      to="/Admin"
    >
      <RiAdminFill className="mr-2" /> <span className>Admin</span>
    </Link>
  );

  return (
    <>
      <div className="flex px-4 shadow-xl items-center relative bg-gunmetal">
        <div className="text-lg font-bold md:py-0 py-4 inline-flex gap-2">
          <div className="text-blue"></div>
          <div className="flex text-pink text-2xl">
            <span className="mr-1">
              {' '}
              <GiFrostfire />
              {/* <img src={GiFrostfire} /> */}
            </span>
            <Link to={'/'} className="text-blue">
              JESTR
            </Link>
          </div>
        </div>
        <div
          className={`md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full md:visible 
        left-0 right-0 bg-gunmetal/75 md:bg-gunmetal text-pink text-sm ${!open ? 'hidden' : ''
            } duration-300`}
        >
          {navLinks().map((link, i) => (
            <NavBarLinksItem
              key={i}
              to={link.to}
            >
              < span className="mr-2">{link.icon}</span>
              {link.text}
            </NavBarLinksItem>
          ))}
          {'Id' in userData ? <div>{loggedIn}</div> : <></>}
        </div>
        <div className="ml-auto md:hidden cursor-pointer">
          <FiMenu
            className="w-5 h-5 fill-current text-text"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <div className="px-2 bg-blue">
        <span
          className={`${!userData.Title ? 'hidden' : ''} text-xs px-2 italic`}
        >
          Currently Logged in as:{' '}
          <span className="font-semibold">{userData.Title}</span>
        </span>
      </div>
    </>
  );
};

export default NavBar;
