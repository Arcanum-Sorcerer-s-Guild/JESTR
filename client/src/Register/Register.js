import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import logo from './yeti1.png';
import './register.css';

const Register = () => {
  const { userData, setUserdata } = React.useContext(Context);
  const [firstName, setFirstName] = useState([]);
  const [middleName, setMiddleName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [password1, setPassword1] = useState([]);
  const [password2, setPassword2] = useState([]);
  const navigate = useNavigate();
  const register = () => {
    const dataToSend = {};
    if (!Array.isArray(firstName)) dataToSend.firstName = firstName;
    if (!Array.isArray(middleName)) dataToSend.middleName = middleName;
    if (!Array.isArray(lastName)) dataToSend.lastName = lastName;
    if (
      !Array.isArray(password1) &&
      !Array.isArray(password2) &&
      password1 === password2
    )
      dataToSend.password = password1;
    fetch(`http://localhost:3001/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if ('Id' in data) {
          setUserdata(data);
          // alert('Login Successful')
          //Set Local Storage
          localStorage.setItem('user', JSON.stringify(data))
          navigate('/');
        } else if (password1 !== password2) alert("Passwords don't match");
        else if (data.message === 'LoginName already taken...')
          alert('Login name already taken');
      });
  };
  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-full flex shadow-2xl">
          {/* login section */}
          <div className="w-full lg:w-3/4 bg-gray-dark p-5 rounded lg:rounded-l-none">
            <div className="p-4 text-left text-text">
              <h3 className="reg_H3 text-xl md:text-3xl font-semibold">
                JESTR Registration Form
              </h3>
              <hr className="style-two my-2 border-2 text-blue" />
              <p className="text-lg italic text-blue">Account Creation</p>
            </div>
            <div className="px-8 pb-8 mb-4 rounded-md">
              <div className="flex gap-4 justify-center text-left">
                <div className="mt-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold text-pink"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full mb-2 px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="middle_name"
                    className="block mb-2 text-sm font-bold text-pink"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middle_name"
                    name="middleName"
                    required
                    className="w-full mb-2 px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Middle Name"
                  />
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-bold text-pink"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="lastName"
                    required
                    className="w-full mb-2 px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-bold text-gray-700 text-pink"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Password..."
                  />
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-bold text-gray-700 text-pink"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="conf_password"
                    name="confirmPassword"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirm Password..."
                  />
                </div>
              </div>
              <div className="mb-10 mt-6 text-center">
                <button
                  type="submit"
                  onClick={register}
                  className="w-1/2 px-4 py-2 font-bold text-text bg-pink rounded-full hover:bg-pink/50 focus:outline-none focus:shadow-outline"
                >
                  Create Account
                </button>
              </div>
              <hr className="style-two mb-6 border-t border-gunmetal" />
              <div className="text-center text-xs text-text italic">
                <p> By signing up, you agree to entering{' '}
                <span className="text-blue underline">The Best</span> &{' '}
                <span className="text-blue underline">Coolest</span> App
                </p>
              </div>
            </div>
          </div>
          {/* image section */}
          <div className="w-full h-auto hidden lg:block lg:w-3/4 bg-cover rounded-r-lg">
            <img src={logo} alt="yeti" className="w-full h-full rounded-r-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// <div>
//   {/* <h1>Register</h1>
// <input type='text' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' /> <br />
// <input type='text' onChange={(e) => setMiddleName(e.target.value)} placeholder='Middle Name' /> <br />
// <input type='text' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' /> <br />
// <input type='password' onChange={(e) => setPassword1(e.target.value)} placeholder='password' /> <br />
// <input type='password' onChange={(e) => setPassword2(e.target.value)} placeholder='password' /> <br />
// <button type='submit' onClick={register}>submit</button> */}
//   <div class="bg-grey-lighter min-h-screen flex flex-col">
//     <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
//       <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
//         <h1 class="mb-8 text-3xl text-center">Sign up</h1>
//         <input
//           type="text"
//           class="block border border-grey-light w-full p-3 rounded mb-4"
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           class="block border border-grey-light w-full p-3 rounded mb-4"
//           onChange={(e) => setMiddleName(e.target.value)}
//           placeholder="Middle Name"
//         />
//         <input
//           type="text"
//           class="block border border-grey-light w-full p-3 rounded mb-4"
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//         />
//         <input
//           type="password"
//           class="block border border-grey-light w-full p-3 rounded mb-4"
//           onChange={(e) => setPassword1(e.target.value)}
//           placeholder="Password"
//         />
//         <input
//           type="password"
//           class="block border border-grey-light w-full p-3 rounded mb-4"
//           onChange={(e) => setPassword2(e.target.value)}
//           placeholder="Confirm Password"
//         />
//         <button
//           type="submit"
//           class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
//           onClick={register}
//         >
//           Create Account
//         </button>
//         <div class="text-center text-sm text-grey-dark mt-4">
//           By signing up, you agree to entering
//           <a class="no-underline border-b border-grey-dark text-grey-dark">
//             The Best
//           </a>{' '}
//           and
//           <a class="no-underline border-b border-grey-dark text-grey-dark">
//             Coolest Web App
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
