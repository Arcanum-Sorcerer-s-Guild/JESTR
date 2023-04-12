import React from 'react'
import UserForm from './UserForm'
import TimeSelector from './DuelTimeSelector';

const Reserve = () => {
  const [userForm, setUserForm] = React.useState({
    name: '',
    dsn: '',
    week: '',
    squadron: ''
  })

  //TODO
  const sendForm = () => {
    console.log(userForm)
  }

  

  return (<>
    {/* {JSON.stringify(userForm)} */}
    <div className='flex content-center text-center p-auto m-auto'>
      <UserForm setUserForm={setUserForm} />

      <TimeSelector />
    </div>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={sendForm}>  Submit </button>

  </>)
}

export default Reserve;