import React, {useState, useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';

const UserDoughnut = ({userList}) => {
  const userData = {
    labels : ['Standard','Approver','Admin','Both'],
    datasets: [{
    data: [
      userList.filter(user=>user.IsApprover !== true && user.IsSiteAdmin !== true).length,
      userList.filter(user=>user.IsApprover === true && user.IsSiteAdmin !== true).length,
      userList.filter(user=>user.IsApprover !== true && user.IsSiteAdmin === true).length,
      userList.filter(user=>user.IsApprover === true && user.IsSiteAdmin === true).length,
    ]}
    ]
  }

  return(<>
  {console.log(userList)}
    {userList.length > 0 ? <>
    <div className="flex flex-col">
        <h3 className="text-2xl mb-2">{`Users by Type`}</h3>
      <div>
        <Doughnut data={userData}/>
      </div>
    </div>
    </>:<></>}
  </>)
}

export default UserDoughnut;
