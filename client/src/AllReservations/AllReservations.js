import React, { useState, useEffect } from 'react';
import { Context } from '../App';
import Modal from './Modal';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showModale, setShowModale] = useState(false);
  const [render, setRender] = useState(true);
  const [modaleChildren, setModaleChildren] = useState(
    <div>this is a big'ol test</div>
  );
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
  }, [render]);
  const handleLogin = (e, id) => {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify([formJSON]),
    };
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(${formJSON.Id})`, requestOptions)
      .then((response) => response.json())
      .then((userData) => {
        setShowModale(false)
        setRender(!render)});
  };
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
                            {userData.IsApprover === false ? (
                              list.Status
                            ) : list.Status === 'Approved' ? (
                              <button
                              type="button"
                              data-te-toggle="modal"
                              data-te-target="#exampleModal"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              class="bg-green py-2 px-4 rounded-full"
                              onClick={() => {
                                setModaleChildren(
                                  <>
                                    <form onSubmit={handleLogin}>
                                      <label htmlFor="Notes" >Remarks</label>
                                      <input name="Notes" type="text" placeholder="Enter Remarks Here..." />
                                      <label htmlFor="Status">Choose a Status</label>
                                      <select name="Status" id="Status">
                                        <option value="Rejected" defaultValue={"Rejected"}>Reject</option>
                                        <option value="Approved">Approve</option>
                                      </select>
                                      <input name="Id" value={list.Id} hidden type="text" placeholder="Enter Remarks Here..." />
                                      <button type="submit" className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                          submit
                                        </button>
                                    </form>
                                  </>
                                );
                                setShowModale(true);
                              }}
                            >
                              {list.Status}
                            </button>
                            ) : list.Status === 'Rejected' ? (
                              <button
                              type="button"
                              data-te-toggle="modal"
                              data-te-target="#exampleModal"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              class="bg-red py-2 px-4 rounded-full"
                              onClick={() => {
                                setModaleChildren(
                                  <>
                                    <form onSubmit={handleLogin}>
                                      <label htmlFor="Notes" >Remarks</label>
                                      <input name="Notes" type="text" placeholder="Enter Remarks Here..." />
                                      <label htmlFor="Status">Choose a Status</label>
                                      <select name="Status" id="Status">
                                        <option value="Rejected" defaultValue={"Rejected"}>Reject</option>
                                        <option value="Approved">Approve</option>
                                      </select>
                                      <input name="Id" value={list.Id} hidden type="text" placeholder="Enter Remarks Here..." />
                                      <button type="submit" className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                          submit
                                        </button>
                                    </form>
                                  </>
                                );
                                setShowModale(true);
                              }}
                            >
                              {list.Status}
                            </button>
                            ) : (
                              <button
                                type="button"
                                data-te-toggle="modal"
                                data-te-target="#exampleModal"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                class="bg-gray py-2 px-4 rounded-full"
                                onClick={() => {
                                  setModaleChildren(
                                    <>
                                      <form onSubmit={handleLogin}>
                                        <label htmlFor="Notes" >Remarks</label>
                                        <input name="Notes" type="text" placeholder="Enter Remarks Here..." />
                                        <label htmlFor="Status">Choose a Status</label>
                                        <select name="Status" id="Status">
                                          <option value="Rejected" defaultValue={"Rejected"}>Reject</option>
                                          <option value="Approved">Approve</option>
                                        </select>
                                        <input name="Id" value={list.Id} hidden type="text" placeholder="Enter Remarks Here..." />
                                        <button type="submit" className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                            submit
                                          </button>
                                      </form>
                                    </>
                                  );
                                  setShowModale(true);
                                }}
                              >
                                {list.Status}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Modal
                  isvisible={showModale}
                  onClose={() => {
                    setShowModale(false);
                  }}
                >
                  {modaleChildren}
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
