import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import logo from './jetti.png';

const Login = () => {
  const { userData, setUserdata } = React.useContext(Context);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.Id) navigate('/');
  }, []);

  const login = () => {
    const dataToSend = {};
    if (!Array.isArray(email)) dataToSend.email = email;
    if (!Array.isArray(password)) dataToSend.password = password;
    fetch(`http://localhost:3001/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if ('Id' in data) {
          setUserdata(data);
          // alert('Login Successful')
          navigate('/');
        } else alert('Login failed. Please try again');
      });
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        {/* image section */}
        <div className="w-full xk:w-3/4 lg:w-11/12 flex shadow-lg">
          <div className="w-full h-auto bg-gray hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <img src={logo} alt="yeti" className="w-full h-full rounded" />
          </div>
          {/* login section */}
          <div className="w-full lg:w-1/2 bg-gray-light p-5 rounded-lg lg:rounded-l-none">
            <div className="p-4 text-left">
              <h3 className="text-2xl">Welcome to JESTR</h3>
              <p className="text-md">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
                quas.
              </p>
            </div>
            <div className="px-8 pb-8 mb-4 rounded">
              <div className='mt-10'>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  required
                  className="w-full px-3 py-2 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
              <div className='mt-5'>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div className="mb-6 mt-6 text-center">
                <button
                  type="submit"
                  onClick={login}
                  className="w-full px-4 py-2 font-bold text-text bg-blue rounded-full hover:bg-blue focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
              <hr className="mb-6 border-t" />
              {/*//TODO Needs to navigate to register */}
              <div className="text-center">
                <span className="inline-block text-sm text-blue align-baseline hover:text-blue/50">
                  Create an Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
<div className="w-full max-w-md space-y-8">
  <div>
    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>
  <div className="mt-8 space-y-6">
    <input type="hidden" name="remember" value="true" />
    <div className="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email-address"
          name="email"
          required
          className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </div>
      <div>
        <label for="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
    </div>
    <div>
      <button
        type="submit"
        onClick={login}
        className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
        Sign in
      </button>
    </div>
  </div>
</div>
</div> */
}
