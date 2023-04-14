import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Context } from '../App';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { userData } = React.useContext(Context);
  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      {
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data.d.results);
        setReservations(data.d.results);
      });
  }, []);
  console.log('data', reservations);
  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'End Date' },
    { name: 'Status' },
  ];


  return (
    <div className="grid place-items-center">
      {console.log(userData)}
      <div className="mt-4 p-2 rounded-md shadow-md bg-purple text-text text-center">
        <h1>All Reservations</h1>
      </div>
      <div className>
        <div className="mt-2">
          <div className="mt-2 flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden content-center">
                  <table class=" text-center content-center">
                    <thead className="bg-gray-light/100 text-gray/200">
                      <tr>
                        {headers.map((header, i) => (
                          <th
                            key={i}
                            className="px-24 py-2 text-center text-xs font-medium uppercase tracking-wider"
                          >
                            {header.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-text divide-y divide-y-gray/75">
                      {reservations.map((list, i) => (
                        <tr key={i}>
                          <td className="text-center text-m">
                            {list.SiteLocation}
                          </td>
                          <td className="text-center text-m">
                            {list.Threat}({list.Equipment})
                          </td>
                          <td className="text-center text-m">
                            {list.Squadron}
                          </td>
                          <td className="text-center text-m m-11">
                            {list.EventDate}
                          </td>
                          <td className="text-center text-m">{list.EndDate}</td>
                          <td className="text-center text-m">
                            {userData.IsApprover === false  ? list.Status : list.Status === "Approved" ? <button className="bg-green py-2 px-4 rounded-full" onClick={() => console.log('deny')}>{list.Status}</button> : list.Status === "Rejected" ? <button className="bg-red py-2 px-4 rounded-full" onClick={() => console.log('deny')}>{list.Status}</button> :  <button className="bg-gray py-2 px-4 rounded-full" onClick={() => console.log('deny')}>{list.Status}</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
