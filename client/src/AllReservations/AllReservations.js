import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';
import { Context } from '../App';
import Modal from './Modal';
import TableHeader from './TableHeader';
import ExportExcel from './Excelexport.js';
import ExportPDF from './ExportPDF';
import { useNavigate } from 'react-router-dom';
import imgpl from './Yetti.png';
import './allres.css';

//icons
import { GiTargetShot } from 'react-icons/gi';
import { BiTargetLock, BiSort } from 'react-icons/bi';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [temp, setTemp] = useState([]);
  const [showModale, setShowModale] = useState(false);
  const [render, setRender] = useState(true);
  const [pageSlice, setPageSlice] = useState([]);
  const [modaleChildren, setModaleChildren] = useState(
    <div>this is a big'ol test</div>
  );
  const { userData } = React.useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      {
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReservations(
          data.d.results.sort((a, b) => {
            const dateA = DateTime.fromISO(a.EventDate).toLocal();
            const dateB = DateTime.fromISO(b.EventDate).toLocal();
            if (dateA > dateB) {
              return -1;
            }
            if (dateA < dateB) {
              return 1;
            }
            return 0;
          })
        );
        setTemp(data.d.results);
      });
  }, [render]);

  //This is for when an approver presses submit when changing the Reservation status
  const handleLogin = (e, id) => {
    e.preventDefault(); // prevent page reload
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([formJSON]),
    };
    fetch(
      `http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(${formJSON.Id})`,
      requestOptions
    )
      .then((response) => response.json())
      .then((userData) => {
        setShowModale(false);
        setRender(!render);
      });
  };

  const changeStatus = (status) => {
    if (typeof status === typeof 10) {
      const newData = temp.filter((item) => {
        return item.AuthorId === status;
      });
      setReservations(newData);
    } else {
      const newData = temp.filter((item) => {
        if (status === 'All') return typeof item.Status === typeof 'hello';
        return item.Status === status;
      });
      setReservations(newData);
    }
    navigate('/AllReservations/1');
  };

  //TODO site icons
  const squadronIcons = [
    { sqd: 'The Black Company', icon: '' },
    { sqd: 'Soul Breakers', icon: '' },
    { sqd: 'Forsaken', icon: '' },
    { sqd: 'Legion', icon: '' },
    { sqd: 'Bonehunters', icon: '' },
    { sqd: 'Bridgeburners', icon: '' },
    { sqd: '', icon: '' },
  ];

  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'End Date' },
    { name: 'Status' },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="mt-5 bg-gray-100 flex items-center justify-center bg-gray-100">
        <div className="w-full lg:w-5/6 shadow-xl">
          <div className="bg-gray-dark mb-4 relative rounded overflow-hidden">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <div className="flex items justify-evenly">
              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => changeStatus('Pending')}
              >
                <span>
                  <BiSort />
                </span>
                Pending
              </button>
              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => changeStatus('Approved')}
              >
                <span>
                  <BiSort />
                </span>
                Approved
              </button>
              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => changeStatus('Rejected')}
              >
                <span>
                  <BiSort />
                </span>
                Rejected
              </button>
              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => changeStatus('All')}
              >
                <span>
                  <BiSort />
                </span>
                All
              </button>
              <button
                className="flex items-center gap-1 justify-center bg-purple text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
                onClick={() => changeStatus(userData.Id)}
              >
                <span>
                  <BiSort />
                </span>
                My Reservations
              </button>

              <ExportExcel excelData={reservations} fileName={'Excel Export'} />
              {/* <ExportPDF divId={'table'} title={'hello world'} /> */}
            </div>
          </div>

          <div className="tableFixHead bg-blue-darker shadow-md rounded">
            <table className="min-w-max w-full table-auto relative">
              <thead className="">
                <tr className="text-gray-light uppercase text-sm leading-normal">
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      className="res-th py-3 px-6 text-left bg-gray-dark"
                    >
                      {header.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-light text-sm font-light m-0">
                {reservations.map((list, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-dark hover:bg-black/30"
                  >
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      onClick={() => navigate(`/Reservation/${list.Id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <GiTargetShot className="text-blue" />
                        <span>{list.SiteLocation}</span>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      onClick={() => navigate(`/Reservation/${list.Id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <BiTargetLock className="text-pink" />
                        <span>
                          {/* //TODO link to assets */}
                          {list.Threat} ({list.Equipment})
                        </span>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      onClick={() => navigate(`/Reservation/${list.Id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="mr">
                          <img
                            src={imgpl}
                            alt="sqdr"
                            className="w-6 h-6 rounded-full hover:scale-110"
                          />
                        </div>
                        <span>{list.Squadron}</span>
                      </div>
                    </td>
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      onClick={() => navigate(`/Reservation/${list.Id}`)}
                    >
                      {DateTime.fromISO(list.EventDate).toFormat(
                        'dd MMM yyyy @ hh:mm'
                      )}{' '}
                      
                    </td>
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      onClick={() => navigate(`/Reservation/${list.Id}`)}
                    >
                      {DateTime.fromISO(list.EndDate).toFormat(
                        'dd MMM yyyy  @ hh:mm'
                      )}{' '}
                      
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {userData.IsApprover === false ? (
                        <div
                          className={`text-center text-m ${
                            list.Status === 'Approved'
                              ? 'text-green'
                              : list.Status === 'Pending'
                              ? 'text-purple'
                              : list.Status === 'Rejected'
                              ? 'text-pink'
                              : ''
                          }`}
                        >
                          {list.Status}
                        </div>
                      ) : list.Status === 'Approved' ? (
                        <button
                          type="button"
                          data-te-toggle="modal"
                          data-te-target="#exampleModal"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="hover:scale-110"
                          onClick={() => {
                            setModaleChildren(
                              <>
                                <form
                                  onSubmit={handleLogin}
                                  className="px-2 justify-center"
                                >
                                  <label
                                    htmlFor="Notes"
                                    className="text-gray-light"
                                  >
                                    Remarks
                                  </label>
                                  <input
                                    name="Notes"
                                    type="text"
                                    className="ml-2 border-none w-1/2 bg-gray-dark text-gray rounded"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <label
                                    htmlFor="Status"
                                    className="ml-2 text-gray-light"
                                  >
                                    Choose a Status
                                  </label>
                                  <select
                                    name="Status"
                                    id="Status"
                                    className="ml-2 border-none bg-gray-dark text-gray rounded"
                                  >
                                    <option
                                      value="Rejected"
                                      defaultValue={'Rejected'}
                                    >
                                      Reject
                                    </option>
                                    <option value="Approved">Approve</option>
                                  </select>
                                  <input
                                    name="Id"
                                    value={list.Id}
                                    hidden
                                    type="text"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <button
                                    type="submit"
                                    className="ml-6 w-40 p-2 rounded bg-purple text-gray-light"
                                  >
                                    <span className=""></span>
                                    submit
                                  </button>
                                </form>
                              </>
                            );
                            setShowModale(true);
                          }}
                        >
                          <div className="bg-green/50 text-gray-light py-1 px-3 rounded-full text-xs">
                            {list.Status}
                          </div>
                        </button>
                      ) : list.Status === 'Rejected' ? (
                        <button
                          type="button"
                          data-te-toggle="modal"
                          data-te-target="#exampleModal"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="hover:scale-110"
                          onClick={() => {
                            setModaleChildren(
                              <>
                                <form onSubmit={handleLogin}>
                                  <label htmlFor="Notes">Remarks</label>
                                  <input
                                    name="Notes"
                                    type="text"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <label htmlFor="Status">
                                    Choose a Status
                                  </label>
                                  <select name="Status" id="Status">
                                    <option
                                      value="Rejected"
                                      defaultValue={'Rejected'}
                                    >
                                      Reject
                                    </option>
                                    <option value="Approved">Approve</option>
                                  </select>
                                  <input
                                    name="Id"
                                    value={list.Id}
                                    hidden
                                    type="text"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <button type="submit" className="">
                                    <span className=""></span>
                                    submit
                                  </button>
                                </form>
                              </>
                            );
                            setShowModale(true);
                          }}
                        >
                          <div className="bg-pink/50 text-gray-light py-1 px-3 rounded-full text-xs">
                            {list.Status}
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          data-te-toggle="modal"
                          data-te-target="#exampleModal"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="hover:scale-110"
                          onClick={() => {
                            setModaleChildren(
                              <>
                                <form onSubmit={handleLogin}>
                                  <label htmlFor="Notes">Remarks</label>
                                  <input
                                    name="Notes"
                                    type="text"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <label htmlFor="Status">
                                    Choose a Status
                                  </label>
                                  <select name="Status" id="Status">
                                    <option
                                      value="Rejected"
                                      defaultValue={'Rejected'}
                                    >
                                      Reject
                                    </option>
                                    <option value="Approved">Approve</option>
                                  </select>
                                  <input
                                    name="Id"
                                    value={list.Id}
                                    hidden
                                    type="text"
                                    placeholder="Enter Remarks Here..."
                                  />
                                  <button type="submit" className="">
                                    <span className=""></span>
                                    submit
                                  </button>
                                </form>
                              </>
                            );
                            setShowModale(true);
                          }}
                        >
                          <div className="bg-purple/50 text-gray-light py-1 px-3 rounded-full text-xs">
                            {list.Status}
                          </div>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-dark p-2  relative overflow-hidden rounded">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <h2 className="text-green text-xs italic pb-1 mb-1">
              *To edit a Reservation please contact an Approver
            </h2>
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
  );
};

export default AllReservations;
