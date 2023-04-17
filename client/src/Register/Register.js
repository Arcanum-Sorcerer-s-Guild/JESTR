import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';

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
          navigate('/');
        } else if (password1 !== password2) alert("Passwords don't match");
        else if (data.message === 'LoginName already taken...')
          alert('Login name already taken');
      });
  };
  return (
    <div>
      {/* <h1>Register</h1>
    <input type='text' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' /> <br />
    <input type='text' onChange={(e) => setMiddleName(e.target.value)} placeholder='Middle Name' /> <br />
    <input type='text' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' /> <br />
    <input type='password' onChange={(e) => setPassword1(e.target.value)} placeholder='password' /> <br />
    <input type='password' onChange={(e) => setPassword2(e.target.value)} placeholder='password' /> <br />
    <button type='submit' onClick={register}>submit</button> */}
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle Name"
            />
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Password"
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={register}
            >
              Create Account
            </button>
            <div class="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to entering
              <a class="no-underline border-b border-grey-dark text-grey-dark">
                The Best
              </a>{' '}
              and
              <a class="no-underline border-b border-grey-dark text-grey-dark">
                Coolest Web App
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
