import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';


const Register = () => {
  const {userData, setUserdata} = React.useContext(Context)
  const [firstName, setFirstName] = useState([]);
  const [middleName, setMiddleName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [password1, setPassword1] = useState([]);
  const [password2, setPassword2] = useState([]);
  const navigate = useNavigate();
  const register = () => {
    const dataToSend = {}
    if(!Array.isArray(firstName)) dataToSend.firstName = firstName
    if(!Array.isArray(middleName)) dataToSend.middleName = middleName
    if(!Array.isArray(lastName)) dataToSend.lastName = lastName
    if(!Array.isArray(password1) && !Array.isArray(password2) && password1 === password2) dataToSend.password = password1
    fetch(`http://localhost:3001/user/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
  })
  .then(response => response.json())
  .then(data => {
    if("Id" in data) {
      setUserdata(data)
      // alert('Login Successful')
      navigate('/Home')
    } else alert("Login failed. Please try again")
  })
  }
  return (
  <>
    <h1>Register</h1>
    <input type='text' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' /> <br />
    <input type='text' onChange={(e) => setMiddleName(e.target.value)} placeholder='Middle Name' /> <br />
    <input type='text' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' /> <br />
    <input type='password' onChange={(e) => setPassword1(e.target.value)} placeholder='password' /> <br />
    <input type='password' onChange={(e) => setPassword2(e.target.value)} placeholder='password' /> <br />
    <button type='submit' onClick={register}>submit</button>
  </>
  )
}

export default Register;
