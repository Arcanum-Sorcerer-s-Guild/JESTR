import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import NavBar from '../NavBar/NavBar';

const Login = () => {
  const { userData, setUserdata } = React.useContext(Context);
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formJSON),
    };
    console.log(requestOptions.body)
    fetch(`http://localhost:3001/user/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if ('Id' in data) {
          setUserdata(data);
          // alert('Login Successful')
          navigate('/');
        } else alert('Login failed. Please try again');
      })
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div class="bg-grey-lighter min-h-screen flex flex-col">
            
          <form onSubmit={handleLogin}>
            <label htmlFor="email" ></label>
            <input name="email" type="text" placeholder="email" class="block border border-grey-light w-full p-3 rounded mb-4" />
            <label htmlFor="password"></label>
            <input name="password" type="password" placeholder="password"   class="block border border-grey-light w-full p-3 rounded mb-4" />
            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              submit
            </button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
