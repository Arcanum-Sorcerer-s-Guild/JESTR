import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import TimeLineChart from './TimeLineChart.js';
import { useNavigate } from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import ResModal from './ResModal.js';
import { Context } from '../App';
import imgpl from '../AllReservations/Yetti.png';
import { BsTelephoneFill, BsCalendar3 } from 'react-icons/bs';
import {
  AiFillCloseCircle,
  AiFillCheckCircle,
  AiOutlineNumber,
} from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';

import { MdOutlinePendingActions } from 'react-icons/md';

const Reservation = () => {
  const params = useParams();
  const [resArray, setResArray] = useState([]);
  const [currRes, setCurrRes] = useState({});
  const [conflictArray, setConflictArray] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [altRes, setAltRes] = useState({});
  const { userData, setUserdata } = React.useContext(Context);

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      { credentials: 'include' }
    )
      .then((res) => res.json())
      .then((data) => {
        setResArray(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          })
        );
      });
  }, [toggle]);

  useEffect(() => {}, [toggle]);

  useEffect(() => {
    if (resArray.length > 0) {
      let res = currRes;
      setConflictArray(
        resArray
          .filter((conflict) => {
            // if(res.star.toStart() >= conflict.start && res.start < conflict.end || res.end > conflict.start && res.end < conflict.end) {return(conflict)}
            if (
              res.start.toFormat('dd MMM yyyy') ===
              conflict.start.toFormat('dd MMM yyyy')
            ) {
              return conflict;
            }
          })
          .filter((conflict) => conflict.Id !== currRes.Id)
      );
    }
  }, [currRes, toggle]);

  useEffect(() => {
    if (resArray.length > 0)
      setCurrRes(resArray.filter((res) => res.Id === parseInt(params.id))[0]);
  }, [resArray, toggle]);

  const changePage = (page) => {
    if (page === 'prev' && parseInt(params.id) !== 1) {
      navigate(`/Reservation/${parseInt(params.id) - 1}`);
      setToggle(!toggle);
    }
    if (page === 'next' && parseInt(params.id) + 1 !== resArray.length + 1) {
      navigate(`/Reservation/${parseInt(params.id) + 1}`);
      setToggle(!toggle);
    }
  };

  const handleAltResClick = (altRes) => {
    setAltRes(altRes);
    setShowModal(true);
    console.log(showModal);
  };

  const updateReservations = (newStatus) => {
    let reqOpts = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([{ Status: newStatus }]),
    };
    //console.log(newStatus)
    fetch(
      `http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(${params.id})`,
      reqOpts
    )
      .then((res) => res.json())
      .then((data) => {
        fetch(
          "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
          { credentials: 'include' }
        )
          .then((res) => res.json())
          .then((data) => {
            setResArray(
              data.d.results.map((res) => {
                return {
                  ...res,
                  start: DateTime.fromISO(res.EventDate).toLocal(),
                  end: DateTime.fromISO(res.EndDate).toLocal(),
                };
              })
            );
          });
      })
      
  };

  return (
    <>
      <ResModal
        showModal={showModal}
        setShowModal={setShowModal}
        altRes={altRes}
      />

      {currRes !== undefined ? (
        <>
          <div className="w-full h-screen block text shadow-lg p-2">
            <div className="flex flex-col h-full">
              <div className="flex flex-row w-full justify-center gap-6 mt-3">
                <div className="mt-5">
                  <button onClick={() => changePage('prev')}>
                    <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full ">
                      <GrFormPrevious className="bg-gray-light text-lg rounded-full" />
                    </div>
                  </button>
                </div>

                {/* ID SECTION */}
                <div className="bg-blue-darker mb-4 relative rounded flex justify-around pb-2 flex-row w-1/4">
                  <h2 className="flex flex-row items-center gap-2 text-3xl text-gray-light font-semibold ml-4">
                    <AiOutlineNumber />
                    {` ${currRes.Id}`}
                  </h2>

                  <div className="flex flex-row text-xs ">
                    <p className="flex flex-row items-center text-gray-light/70">
                      <span className="text-lg ml-1 flex flex-row gap-2 items-center">
                        {currRes.Status === 'Approved' ? (
                          <>
                            <AiFillCheckCircle className="text-green" />{' '}
                            Approved
                          </>
                        ) : (
                          <></>
                        )}

                        {currRes.Status === 'Rejected' ? (
                          <>
                            <AiFillCloseCircle className="text-red/60" />{' '}
                            Rejected
                          </>
                        ) : (
                          <></>
                        )}

                        {currRes.Status === 'Pending' ? (
                          <>
                            <MdOutlinePendingActions className="text-yellow/60" />{' '}
                            Pending
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                    </p>
                  </div>

                  {/* <hr className="text-gray-light/70" /> */}
                  {/* <div className="text-gray-light/70">{`Author: ${currRes.AuthorId}`}</div>
                  <div className="text-gray-light/70">{`Editor: ${currRes.EditorId}`}</div> */}
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                {/* SQUADRON INFO SECTION */}
                <div className="bg-blue-darker mb-4 relative rounded  flex justify-center pb-2 flex-row w-1/4 justify-center gap-16">
                  <div className="flex flex-row text-gray-light items-center">
                    <img
                      src={imgpl}
                      alt="sqdr"
                      className="w-6 h-6 rounded-full hover:scale-110 mr-3"
                    />
                    {` ${currRes.Squadron}`}
                  </div>
                  <div className="flex flex-row gap-5 items-center">
                    <BsTelephoneFill className="text-text" size={25} />
                    <div className="flex flex-col">
                      <div className="text-gray-light">{`${currRes.POC}`}</div>
                      <div className="text-gray-light">{`${currRes.ContactDSN}`}</div>
                    </div>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                {/* TIME AND LOCATION */}
                <div className="bg-blue-darker mb-4 relative rounded  flex justify-center pb-2 flex-col w-1/4 ">
                  {currRes.start !== undefined ? (
                    <>
                      <div className="flex justify-between">
                        <div className="text-gray-light text-xl ml-3 flex flex-row items-center gap-1">
                          <BiCurrentLocation /> {` ${currRes.Range}`}
                        </div>
                        <div className="text-gray-light text-xl mr-3 flex flex-row items-center gap-3">
                          <BsCalendar3 />
                          {`${currRes.start.toFormat('dd MMM yyyy')}`}
                        </div>
                      </div>
                      <hr className="text-gray-light" a />
                      <div className="flex justify-between">
                        <div className="text-gray-light text-xs ml-10">{`${currRes.SiteLocation}`}</div>
                        <div className="text-gray-light text-xs mr-2">
                          {`${currRes.start.toFormat(
                            'hh:mm a'
                          )} to ${currRes.end.toFormat('hh:mm a')}`}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                <button onClick={() => changePage('next')}>
                  <div>
                    <GrFormNext className="bg-gray-light text-lg rounded-full" />
                  </div>
                </button>
              </div>

              <div className="flex w-full justify-center h-3/4 ">
                <div className="flex flex-row gap-3 h-full w-10/12">
                  {/* <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden"></div> */}
                  {/* TIMELINE CHART */}
                  <div className=" block bg-blue-darker mb-6 relative rounded overflow-hidden w-1/2 pb-5 h-full p-1 pl-6">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />

                    {conflictArray.length > 0 &&
                    JSON.stringify(currRes) !== '{}' ? (
                      <>
                        <TimeLineChart
                          conflictArray={conflictArray}
                          currRes={currRes}
                          altRes={altRes}
                          setAltRes={setAltRes}
                          setShowModal={setShowModal}
                          toggle={toggle}
                          setToggle={setToggle}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-3/2 h-full">
                    {/* CONFLICTS TABLE */}
                    <div className="block bg-blue-darker relative rounded overflow-hiddenk text-center overflow-hidden w-full h-full">
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />

                      <h1 className="flex justify-center text-xl font-medium border-b-2 text-gray-light">
                        {/* between ${currRes.start.toFormat('hh:mm')} to ${currRes.end.toFormat('hh:mm')}` */}
                        {Object.keys(currRes).length > 0 ? (
                          `Conflicting Reservations `
                        ) : (
                          <></>
                        )}
                      </h1>
                      <div className="flex flex-col h-max">
                        <div>
                          <table className="table-auto w-full text-xs">
                            <thread>
                              <tr className="text-gray-light uppercase font-light  text-xs leading-normal grid-container grid grid-cols-9">
                                <th className="col-span-1 res-th py-3 px-6 bg-gray-dark text-center">
                                  ID
                                </th>
                                <th className="col-span-2 res-th py-3 px-6 bg-gray-dark text-center">
                                  Squadron
                                </th>
                                <th className="col-span-2 res-th py-3 px-6 bg-gray-dark text-center">
                                  POC
                                </th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">
                                  DSN
                                </th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">
                                  Start Time
                                </th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">
                                  End Time
                                </th>
                                <th className="col-span-1 res-th py-3 px-6 text-center bg-gray-dark">
                                  Status
                                </th>
                              </tr>
                            </thread>
                            <tbody className="text-gray-light text-xs font-light m-0">
                              {conflictArray
                                .filter((conflict) => {
                                  if (
                                    (currRes.start >= conflict.start &&
                                      currRes.start < conflict.end) ||
                                    (currRes.end > conflict.start &&
                                      currRes.end < conflict.end)
                                  )
                                    return conflict;
                                })
                                .map((res, index) => {
                                  return (
                                    <>
                                      {res.Id !== currRes.Id ? (
                                        <tr
                                          className=" hover:bg-black/30 grid-container grid grid-cols-9 border-b border-gray-dark "
                                          onClick={() => {
                                            navigate(`/Reservation/${res.Id}`);
                                            setToggle(!toggle);
                                          }}
                                          key={index}
                                        >
                                          <td className="col-span-1">
                                            {res.Id}
                                          </td>
                                          <td className="col-span-2">
                                            {res.Squadron}
                                          </td>
                                          <td className="col-span-2">
                                            {res.POC}
                                          </td>
                                          <td className="col-span-1">
                                            {res.ContactDSN}
                                          </td>
                                          <td className="col-span-1">
                                            {res.start.toFormat('hh:mm a')}
                                          </td>
                                          <td className="col-span-1">
                                            {res.end.toFormat('hh:mm a')}
                                          </td>
                                          <td className="col-span-1">
                                            {res.Status}
                                          </td>
                                        </tr>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  );
                                })}
                            </tbody>
                          </table>
                          </div>
                          <div >
                            {userData.IsSiteAdmin ? (
                              <div className="flex flex-row justify-center gap-10 mt-2 text-gray-light border-none  ">
                                <button
                                  className=" rounded bg-purple h-8 p-1"
                                  onClick={() => updateReservations('Approved')}
                                >
                                  Approve
                                </button>
                                <button
                                  className=" rounded bg-purple border-none  h-8 p-1"
                                  onClick={() => updateReservations('Rejected')}
                                >
                                  Deny
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                      </div>
                    </div>
                    {/* {Object.keys(currRes).length > 0 ? (
                      <div className="block bg-blue-darker mb-4 relative rounded overflow-hidden text-center overflow-hidden w-full h-1/2">
                        <h1 className="flex justify-center text-xl font-medium border-b-2 border-black">
                          {`${currRes.ThreatType.toUpperCase()} ${
                            currRes.Equipment
                          } as ${currRes.Threat} `}
                        </h1>
                        {`${currRes.Notes}`}
                      </div>
                    ) : (
                      <></>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Reservation;
