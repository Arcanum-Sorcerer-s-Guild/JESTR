import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';

const NavBar = () => {
  const { userData, setUserdata } = React.useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen]= useState(true)

  const navLinks = [
    { name: 'QuickLook', to: '/', text: 'Quick Look', icon: '' },
    { name: 'AllAssets', to: '/', text: 'All Assets', icon: '' },
    { name: 'Reserve', to: '/', text: 'Reserve', icon: '' },
    { name: 'AllReservations', to: '/', text: 'All Reservations', icon: '' },
  ];

  let notLoggedIn = (
    <>
      <Link
        to="Login"
        className={`${!open && "hidden"} duration-300 flex md:inline-flex p-4 items-center bg-pink/30 md:bg-gunmetal hover:bg-gray-light`}
      >
        <span>Login</span>
      </Link>
      <Link
        to="Register"
        className={`${!open && "hidden"} duration-300 flex md:inline-flex p-4 items-center bg-pink/30 md:bg-gunmetal hover:bg-gray-light`}
      >
        <span onClick={() => setUserdata({})}>Register</span>
      </Link>
    </>
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
          setUserdata({});
          navigate('/Login');
        }
      });
  };

  let loggedIn = (
    <Link
      to="Login"
      className={`${!open && "hidden"} duration-300 flex md:inline-flex p-4 items-center bg-gunmetal hover:bg-gray-light text-green`}
      
    >
      <span onClick={signOut}>Signout</span>
    </Link>
  );

  return (
    <>
      <div className="flex px-4 border-b shadow-md shadow-pink/100 items-center relative bg-gunmetal">
        <div className="text-lg font-bold md:py-0 py-4">
          <span className="text-blue">JESTER</span>
        </div>
        <div className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full 
        left-0 right-0 bg-pink/30 md:bg-gunmetal text-pink text-sm">
          <div className={`${!open && "hidden"} duration-300`}>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.name}
                className="flex md:inline-flex p-4 items-center hover:bg-gray-light"
              >
                {link.text}
              </Link>
            ))}
            <Link
              className={`${userData.IsSiteAdmin === true ? '' : 'hidden'} flex md:inline-flex p-4 items-center hover:bg-gray-light`}
              to="/Admin"
            >
              Admin
            </Link>
          </div>
          {'Id' in userData ? <div>{loggedIn}</div> : <div>{notLoggedIn}</div>}
        </div>
        <div className='ml-auto md:hidden cursor-pointer'>
          <span 
            className='w-5 h-5 fill-current'
            onClick={() => setOpen(!open)}
          >X</span>
        </div>
      </div>
    </>
  );
};

export default NavBar;

{/* <div className="bg-gunmetal text-pink flex items-center justify-between flex-wrap p-4 shadow-md shadow-pink/50">
        <div className="flex items-center flex-shrink-0 text-text mr-6">
          <span className="font-semibold text-xl text-blue tracking-tight">JESTER</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg: items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.name}
                className="mt-4 lg:inline-block lg:mt-0 hover:text-blue p-2"
              >
                {link.text}
              </Link>
            ))}
            <Link
              className={`${userData.IsSiteAdmin === true ? '' : 'hidden'}`}
              to="/Admin"
            >
              Admin
            </Link>
          </div>
          {'Id' in userData ? <div>{loggedIn}</div> : <div>{notLoggedIn}</div>}
        </div>
      </div> */}