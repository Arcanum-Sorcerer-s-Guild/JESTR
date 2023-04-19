import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';

//icons
import { FiMenu, FiRadio } from 'react-icons/fi';
import { RiAdminFill } from 'react-icons/ri';
import {
  FaMapMarkedAlt,
  FaEye,
  FaUserCircle,
} from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';

const NavBar = () => {
  const { userData, setUserdata } = React.useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); //true = open /false =closed

  const navLinks = [
    { name: 'QuickLook', to: '/', text: 'Quick Look', icon: <FaEye /> },
    { name: 'AllAssets', to: '/', text: 'All Assets', icon: <FiRadio /> },
    { name: 'Reserve', to: '/', text: 'Reserve', icon: <FaMapMarkedAlt /> },
    {
      name: 'AllReservations',
      to: '/',
      text: 'All Reservations',
      icon: <BsCardChecklist />,
    },
  ];

  let notLoggedIn = (
    <div className="flex items-center text-blue">
      <Link
        to="Login"
        className={`flex md:inline-flex p-4 items-center bg-gunmetal hover:text-text`}
      >
        <FaUserCircle className="mr-2" />
        <span>Login</span>
      </Link>
      <span>|</span>
      <Link
        to="Register"
        className={`flex md:inline-flex p-4 items-center bg-gunmetal hover:text-text`}
      >
        <span onClick={() => setUserdata({})}>Register</span>
      </Link>
    </div>
  );

  const signOut = () => {
    fetch('http://localhost:3001/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'logout successful') {
          // Clear Session Storage
          localStorage.clear();
          setUserdata({});
          navigate('/');
        }
      });
  };

  let loggedIn = (
    <Link
      to="Login"
      className={`${!open && 'hidden'
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
      <div className="flex px-4 border-b shadow-md shadow-pink/100 items-center relative bg-gunmetal">
        <div className="text-lg font-bold md:py-0 py-4 inline-flex gap-2">
          <div className='text-blue'>
          </div>
          <div className=''>
            <h1 className="text-blue">JESTR</h1>
          </div>
        </div>
        <div
          className={`md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full md:visible 
        left-0 right-0 bg-gunmetal/75 md:bg-gunmetal text-pink text-sm ${!open && 'hidden'
            } duration-300`}
        >
          <div className={`${!userData.Title ? 'hidden' : ''}`}>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.name}
                className={`flex md:inline-flex p-4 items-center hover:text-text`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.text}
              </Link>
            ))}
            <div className="flex md:inline-flex">{adminLink}</div>
          </div>
          {'Id' in userData ? <div>{loggedIn}</div> : <div>{notLoggedIn}</div>}
        </div>
        <div className="ml-auto md:hidden cursor-pointer">
          <FiMenu
            className="w-5 h-5 fill-current text-text"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <div className="px-2 bg-blue">
        <span className={`${!userData.Title ? 'hidden' : ''} text-xs italic`}>
          Currently Logged in as:{' '}
          <span className="font-semibold">{userData.Title}</span>
        </span>
      </div>
    </>
  );
};

export default NavBar;
