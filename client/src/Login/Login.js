import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../App';


const Login = () => {
  const {userData, setUserdata} = React.useContext(Context)
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  // useEffect(() => {
  //   fetch(`http://localhost:3001/user/login`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify(dataToSend),
  // })
  // .then(response => response.json())
  // .then(data => {

  // })
  // },[])
  const login = () => {
    const dataToSend = {}
    if(!Array.isArray(email)) dataToSend.email = email
    if(!Array.isArray(password)) dataToSend.password = password
    fetch(`http://localhost:3001/user/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
  })
  .then(response => response.json())
  .then(data => {
    if("Id" in data) setUserdata(data)
    else alert("Login failed. Please try again")
  })
  }
  return (
  <>
    <h1>Login</h1>
    <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder='email' /> <br />
    <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' /> <br />
    <button type='submit' onClick={login}>submit</button>
  </>
  )
}

export default Login;
