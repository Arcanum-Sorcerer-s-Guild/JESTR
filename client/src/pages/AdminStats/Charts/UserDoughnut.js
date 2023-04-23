import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const UserDoughnut = ({ userList }) => {
  const userData = {
    labels: ['Standard', 'Approver', 'Admin', 'Both'],
    datasets: [
      {
        data: [
          userList.filter(
            (user) => user.IsApprover !== true && user.IsSiteAdmin !== true
          ).length,
          userList.filter(
            (user) => user.IsApprover === true && user.IsSiteAdmin !== true
          ).length,
          userList.filter(
            (user) => user.IsApprover !== true && user.IsSiteAdmin === true
          ).length,
          userList.filter(
            (user) => user.IsApprover === true && user.IsSiteAdmin === true
          ).length,
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: 'pink' },
      },
    },
  };

  return (
    <>
      {userList.length > 0 ? (
        <>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl mb-2 text-center text-text">{`Users by Type`}</h3>
            <div>
              <Doughnut
                data={userData}
                width={500}
                height={500}
                options={options}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDoughnut;
