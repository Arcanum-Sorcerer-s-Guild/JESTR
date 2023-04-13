import React from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../App';

const NavBar = () => {
  const { userData, setUserdata } = React.useContext(Context)
  
  const navLinks = [
    { name: '', to: '/', text: 'Home', icon: '' },
    { name: 'MP', to: '/', text: 'Mission Planning', icon: '' },
    { name: 'Asset', to: '/', text: 'Asset', icon: '' },
    { name: 'AllAssets', to: '/', text: 'All Assets', icon: '' },
    { name: 'Reserve', to: '/', text: 'Reserve', icon: '' },
    { name: 'Reservation', to: '/', text: 'Reservation', icon: '' },
    { name: 'AllReservations', to: '/', text: 'All Reservations', icon: '' },
  ];

  let notLoggedIn = (
    <>
    <Link
      to="Login"
      className="block mt-4 lg:inline-block lg:mt-0 hover:text-green p-2 text-sm"
    >
      <span>Login</span>
    </Link>
       <Link
       to="Register"
       className="block mt-4 lg:inline-block lg:mt-0  hover:text-green p-2 text-sm"
     >
       <span onClick={() => setUserdata({})}>Register</span>
     </Link>
     </>
  );

  let loggedIn = (
    <Link
    to="Login"
    className="block mt-4 lg:inline-block lg:mt-0  hover:text-green p-2 text-sm"
  >
    <span onClick={() => setUserdata({})}>Sign Out</span>
  </Link>
  )

  return (
    <>
      <div className="bg-gunmetal text-pink flex items-center justify-between flex-wrap p-4 shadow-md shadow-pink/50">
        <div className="flex items-center flex-shrink-0 text-text mr-6">
          <span className="font-semibold text-xl text-blue tracking-tight">JESTER</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg: items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.name}
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-blue p-2"
              >
                {link.text}
              </Link>
            ))}
          </div>
          {"Id" in userData ? <div>{loggedIn}</div> : <div>{notLoggedIn}</div>}
        </div>
      </div>
    </>
  );
};

export default NavBar;
