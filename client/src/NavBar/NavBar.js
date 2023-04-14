import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';

const NavBar = () => {
  const { userData, setUserdata } = React.useContext(Context);
  const navigate = useNavigate();
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
        className="block mt-4 lg:inline-block lg:mt-0 hover:text-text p-2"
      >
        <span>Login</span>
      </Link>
      <Link
        to="Register"
        className="block mt-4 lg:inline-block lg:mt-0 hover:text-text p-2"
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
      className="block mt-4 lg:inline-block lg:mt-0 hover:text-text p-2"
    >
      <span onClick={signOut}>Signout</span>
    </Link>
  );

  //Conditional Login button
  // if(!("Id in userData")) {
  //   loginLink = (
  //     <Link
  //       to="Login"
  //       onClick={() => {
  //         fetch(`${url}/logout`, {
  //           method: "POST",
  //           credentials: "include",
  //         })
  //         .then(() => {
  //           //set user({});
  //         })
  //       }}
  //     >
  //     <span>Logout</span>
  //     </Link>
  //   )
  // }

  return (
    <>
      <div className=" bg-gunmetal text-text flex items-center justify-between flex-wrap p-4 shadow-md">
        <div className="flex items-center flex-shrink-0 text-text mr-6">
          <span className="font-semibold text-xl tracking-tight">JEST</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg: items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.name}
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-text p-2"
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
      </div>
    </>
  );
};

export default NavBar;
