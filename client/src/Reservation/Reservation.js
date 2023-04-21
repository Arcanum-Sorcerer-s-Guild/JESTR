import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import TimeLineChart from './TimeLineChart.js';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import ResModal from './ResModal.js';
import { Context } from '../App';
import imgpl from '../AllReservations/Yetti.png';

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
      .then((data) => console.log(data))
      .then(setToggle(!toggle));
  };

  return (
    <>
      <ResModal
        showModal={showModal}
        setShowModal={setShowModal}
        altRes={altRes}
      />
      {JSON.stringify(currRes) !== '{}'}
      {currRes !== undefined ? (
        <>
          <div className="w-full h-screen block text shadow-lg p-2">
            <div className="flex flex-col h-full">
              <div className="flex flex-row w-full justify-center gap-2 mt-3">

              <div>
              <button onClick={() => changePage('prev')}>
                  <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full ">
                    <FiArrowLeft className="mt-10" />
                  </div>
                </button>
              </div>


                {/* ID SECTION */}
                <div className="bg-blue-darker mb-4 relative rounded flex justify-center pb-2 flex-col w-1/4">
                  <h2 className="md:text-lg text-sm text-gray-light font-semibold uppercase">{`ID: ${currRes.Id}`}</h2>
                  <hr className="text-gray-light/70" />
                  <div className="text-gray-light/70">{`Author: ${currRes.AuthorId}`}</div>
                  <div className="text-gray-light/70">{`Editor: ${currRes.EditorId}`}</div>
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                {/* SQUADRON INFO SECTION */}
                <div className="bg-blue-darker mb-4 relative rounded  flex justify-center pb-2 flex-row w-1/4 justify-center gap-16">
                  
                  <div className="flex flex-row text-gray-light">  
                    <img src={imgpl} alt="sqdr" className="w-6 h-6 rounded-full hover:scale-110 mr-3" />
                    {` ${currRes.Squadron}`}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-light">{`POC: ${currRes.POC}`}</div>
                    <div className="text-gray-light">{`DSN: ${currRes.ContactDSN}`}</div>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                {/* APPROVE STATUS */}
                <div className="bg-blue-darker mb-4 relative rounded  flex justify-center pb-2 flex-col w-1/4">
                  {currRes.start !== undefined ? (<>
                    <div className="text-gray-light text-xl">{`${currRes.start.toFormat('dd MMM yyyy')}`}</div>
                    <hr className="text-gray-light"a/>
                    <div className="text-gray-light text-xs">
                      {`${currRes.start.toFormat('hh:mm a')} to ${currRes.end.toFormat('hh:mm a')}`}
                      </div> 
                    </>) : (
                    <></>
                  )}
                  <div className="text-gray-light">{`Status: ${currRes.Status}`}</div>
                  {/* {userData.IsSiteAdmin ? (
                    <div className="flex flex-row justify-center gap-10 ">
                      <button
                        className="border border-black rounded bg-bluer h-8 p-1"
                        onClick={() => updateReservations('Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="border border-black rounded bg-bluer h-8 p-1"
                        onClick={() => updateReservations('Rejected')}
                      >
                        Deny
                      </button>
                    </div>
                  ) : (
                    <></>
                  )} */}
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                </div>

                <button onClick={() => changePage('next')}>
                  <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full ">
                    <FiArrowRight className="mt-10" />
                  </div>
                </button>
              </div>

              <div className="flex w-full justify-center h-3/4 ">
                <div className="flex flex-row gap-3 h-full w-10/12">

                  {/* <div className="w-1/6 block rounded-lg bg-bluer/25 border border-black text-center overflow-hidden"></div> */}
                {/* TIMELINE CHART */}
                  <div className=" block bg-blue-darker mb-6 relative rounded overflow-hidden w-1/2 h-full p-1 pl-6">
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
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-1/2 h-full">
                    {/* CONFLICTS TABLE */}
                    <div className="block bg-blue-darker mb-4 relative rounded overflow-hiddenk text-center overflow-hidden w-full h-full">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />

                      <h1 className="flex justify-center text-xl font-medium border-b-2 text-gray-light">
                        { Object.keys(currRes).length > 0 ? `Conflicting Reservations on ${currRes.start.toFormat('dd MMM yyyy')}`: <></>}
                      </h1>
                      <div className="flex flex-col content-between h-max">
                        <div>
                          <table className="table-auto w-full">
                            <thread>
                              <tr className="text-gray-light uppercase text-sm leading-normal grid-container grid grid-cols-9">
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark text-center">ID</th>
                                <th className="col-span-2 res-th py-3 px-6 text-left bg-gray-dark text-center">Squadron</th>
                                <th className="col-span-2 res-th py-3 px-6 text-left bg-gray-dark text-center">POC</th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">DSN</th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">Start Time</th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">End Time</th>
                                <th className="col-span-1 res-th py-3 px-6 text-left bg-gray-dark">Status</th>
                              </tr>
                            </thread>
                            <tbody className="text-gray-light text-sm font-light m-0">
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
                                          onClick={() => handleAltResClick(res)}
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
