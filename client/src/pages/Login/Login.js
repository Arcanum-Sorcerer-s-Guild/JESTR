import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../../Context/AppContext.js';
import './login.css';
import logo from './yeti2.png';
import { userLoginFetchPost } from '../../utils/api/endPoints.js';

const Login = () => {
  const { userData, setUserdata } = React.useContext(AppContext);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.Id) navigate('/');
  }, []);

  const handleLogin = (e, id) => {
    e.preventDefault(); // prevent page reload
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    userLoginFetchPost(formJSON, (data) => {
      if ('Id' in data) {
        setUserdata(data);
        // alert('Login Successful')
        // Add session item for user
        // TODO add session key for comparison
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else alert('Login failed. Please try again');
    });
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-12/12 flex shadow-2xl">
          {/* image section */}
          <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <img src={logo} alt="yeti" className="w-full h-full rounded-l-md" />
          </div>
          {/* login section */}
          <div className="w-full lg:w-1/2 bg-gray-dark p-5 rounded lg:rounded-l-none">
            <div className="p-4 text-left text-text">
              <h3 className="log_H3 text-xl md:text-3xl font-semibold">
                Joint Pacific Alaska Range Complex
              </h3>
              <hr className="style-one my-2 border-2 text-pink" />
              <p className="text-lg italic text-gray-light">
                Emitter Status and Training Request
              </p>
            </div>
            <form onSubmit={handleLogin} className="px-8 pb-8 mb-4 rounded-md">
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-blue"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  required
                  className="w-full px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="email"
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-700 text-blue"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 text-sm leading-tight border border-gray-light rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="password"
                />
              </div>
              <div className="mb-10 mt-6 text-center">
                <button
                  type="submit"
                  className="w-1/2 px-4 py-2 font-bold text-text bg-blue rounded-full hover:bg-blue/50 focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>
              </div>
              <hr className="style-one mb-6 border-t border-gunmetal" />
              <div className="text-center">
                <Link
                  to={'/Register'}
                  className="inline-block text-sm text-gray-light align-baseline hover:text-blue/50"
                >
                  Create an Account
                </Link>
              </div>
            </form>
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
        <InputLablel for="email-address" className="sr-only">
          Email address
        </InputLablel>
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
        <InputLablel for="password" className="sr-only">
          Password
        </InputLablel>
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
