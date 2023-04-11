import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const navLinks = [
    { name: 'Home', to: '/', text: 'Home', icon: '' },
    { name: 'MP', to: '/', text: 'Mission Planning', icon: '' },
    { name: 'Asset', to: '/', text: 'Asset', icon: '' },
    { name: 'AllAssets', to: '/', text: 'All Assets', icon: '' },
    { name: 'Reserve', to: '/', text: 'Reserve', icon: '' },
    { name: 'Reservation', to: '/', text: 'Reservation', icon: '' },
    { name: 'AllReservations', to: '/', text: 'All Reservations', icon: '' },
  ];

  let loginLink = (
    <Link
      to="Login"
      className="block mt-4 lg:inline-block lg:mt-0 hover:text-text p-2"
    >
      <span>Login</span>
    </Link>
  );

  //Conditional Login button
  // if(user.username) {
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
      <div className="bg-blue flex items-center justify-between flex-wrap p-4 shadow-md">
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
          </div>
          <div>{loginLink}</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
