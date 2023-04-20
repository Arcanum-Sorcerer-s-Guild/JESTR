import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AssetMap from './AssetMap.js';
import EditAsset from './EditAsset';
import DmsCoordinates, { parseDms } from 'dms-conversion';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Context } from '../App.js';

//icons
import {
  AiFillEdit,
  AiFillDelete,
  AiFillSchedule,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BiTargetLock } from 'react-icons/bi';
import { SiSemaphoreci } from 'react-icons/si';
import { BsMagic } from 'react-icons/bs';
import {
  HiOutlineStatusOnline,
  HiDocumentReport,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';
import { GiVirtualMarker } from 'react-icons/gi';

const Asset = () => {
  const [assets, setAssets] = useState([]);
  const [currAsset, setCurrAsset] = useState();

  let params = useParams();
  const [timeLine, setTimeLine] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { listUrl } = useContext(Context);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items(${params.id})`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        let val = data.d;
        setCurrAsset(undefined);
        val.dms = new DmsCoordinates(
          Number(data.d.Latitude),
          Number(data.d.Longitude)
        );
        setCurrAsset(val);
      });
  }, [params]);

  const changePage = (page) => {
    if (page === 'prev' && parseInt(params.id) !== 1) {
      navigate(`/Asset/${parseInt(params.id) - 1}`);
      setToggle(!toggle);
    }

    if (page === 'next' && parseInt(params.id) + 1 !== assets.length + 1) {
      navigate(`/Asset/${parseInt(params.id) + 1}`);
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    if (currAsset !== undefined) {
      setTimeLine([
        {
          name: 'Coordinate Recorded',
          time: DateTime.fromISO(currAsset.CoordRecordedDate),
        },
        {
          name: 'Status Recorded',
          time: DateTime.fromISO(currAsset.StatusDate),
        },
        { name: 'Asset Created', time: DateTime.fromISO(currAsset.created) },
        { name: 'Asset Modified', time: DateTime.fromISO(currAsset.modified) },
        { name: 'ETIC', time: DateTime.fromISO(currAsset.ETIC) },
      ]);
      setTimeLine([
        {
          name: 'Coordinate Recorded',
          time: DateTime.fromISO(currAsset.CoordRecordedDate),
        },
        {
          name: 'Status Recorded',
          time: DateTime.fromISO(currAsset.StatusDate),
        },
        { name: 'Asset Created', time: DateTime.fromISO(currAsset.created) },
        { name: 'Asset Modified', time: DateTime.fromISO(currAsset.modified) },
        { name: 'ETIC', time: DateTime.fromISO(currAsset.ETIC) },
      ]);
    }
  }, [currAsset]);

  const handleDelete = (e) => {
    fetch(`${listUrl}/GetByTitle('Assets')/items(${params.id})`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      navigate(0);
    });
  };

  return (
    <>
      {currAsset !== undefined ? (
        <div className="w-[80%] container mx-auto h-screen my-6">
          <div className="flex flex-col">
            <div className="timeline mb-2">
              {/* timeline-start */}
              <div className="w-full block bg-blue-darker relative overflow-hidden shadow-xl rounded-lg p-4">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                <ol
                  key={Math.random()}
                  className="flex justify-between border-t-2 border-dashed border-opacity-30 border-purple mx-4"
                >
                  {timeLine.length > 0 ? (
                    [...timeLine]
                      .sort((a, b) => {
                        return a.time - b.time;
                      })
                      .map((event) => {
                        return (
                          <li className="text-sm text-purple/90 ml-4">
                            <div className="">
                              <div className="bg-purple w-fit rounded-full -mt-2">
                                <GiVirtualMarker className="text-gray-light" />
                              </div>
                              <span className="py-2">{event.name}</span>
                              <div className="flex text-xs gap-1 text-gray-light">
                                <span>
                                  {' '}
                                  {event.time.toFormat(
                                    'dd - MMM - yyyy'
                                  )} @{' '}
                                </span>
                                <span>{`${event.time.toFormat('hh:mm')}`}</span>
                              </div>
                            </div>
                          </li>
                        );
                      })
                  ) : (
                    <></>
                  )}
                </ol>
              </div>
              {/* timeline-end */}
            </div>

            <div className="card-map flex gap-2 mb-4">
              {/* map-start */}
              <div className="w-fit h-fit block bg-cover relative overflow-hidden border border-gray shadow-xl rounded-lg">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />
                <AssetMap
                  serial={currAsset.Serial}
                  center={[currAsset.Longitude, currAsset.Latitude]}
                />
              </div>
              {/* map-end */}

              {/* card-start */}
              <div className="w-3/4 min-h-fit bg-blue-darker relative block overflow-hidden shadow-xl rounded-lg p-6">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />

                <div className="card-header">
                  <h5 className="md:text-lg text-sm text-gray-light font-semibold uppercase">
                    {`${currAsset.ThreatType} ${currAsset.Equipment} (${currAsset.Threat})`}
                  </h5>
                  <hr className="text-gray-light/70" />
                  <p className="mt-1 text-xs text-gray-light/70">{`${currAsset.Range} | ${currAsset.SiteLocation}`}</p>
                </div>

                {/* card-content-start */}
                <div className="flex mt-5 px-6">
                  <div className="w-3/4">
                    <div className="w-full flex flex-col space-y-4 text-gray-light/50">
                      <div className="range & data">
                        <p className="text-blue uppercase text-sm">
                          Range & Equipment Data:{' '}
                        </p>
                        <div className="flex flex-row text-xs mt-1">
                          <p className="flex items-center text-gray-light/70">
                            <BiTargetLock className="mr-3" />
                            <span className="font-semibold mr-2 uppercase py-2">
                              Coordinates:
                            </span>
                            <span>{`${currAsset.dms
                              .toString()
                              .slice(0, 12)}${currAsset.dms
                              .toString()
                              .slice(24, 41)}${currAsset.dms
                              .toString()
                              .slice(-3, 57)}`}</span>
                          </p>
                        </div>

                        <div className="flex flex-row text-xs mt-1">
                          <p className="flex items-center text-gray-light/70">
                            <SiSemaphoreci className="mr-3" />
                            <span className="font-semibold mr-2 uppercase py-2">
                              Elevation:
                            </span>
                            <span>{`${currAsset.Elevation} ft.`}</span>
                          </p>
                        </div>

                        <div className="flex flex-row text-xs mt-2">
                          <p className="flex items-center text-gray-light/70">
                            <BsMagic className="mr-3" />
                            <span className="font-semibold mr-2 uppercase">
                              Measured:
                            </span>
                            <span>{`with ${currAsset.CoordSource}`}</span>
                          </p>
                        </div>
                      </div>
                      <div className="status py-5">
                        <p className="text-blue uppercase text-sm">
                          Asset Status:{' '}
                        </p>

                        <div className="flex flex-row text-xs mb-2">
                          <p className="flex items-center text-gray-light/70">
                            <HiDocumentReport className="mr-3" />
                            <span className="font-semibold mr-2 uppercase py-2">
                              Status:
                            </span>
                                {/* 'RED', 'AMBER', 'GREEN', 'N/A' */}
                            <span
                              className={`text-center text-xs px-4 rounded-md ${
                                currAsset.Status === 'RED'
                                  ? 'bg-red/50'
                                  : currAsset.Status === 'AMBER'
                                  ? 'bg-yellow/50'
                                  : currAsset.Status === 'GREEN'
                                  ? 'bg-green/50'
                                  : 'bg-gray'
                              }`}
                            >
                              {`${currAsset.Status}`}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-row text-xs mt-2">
                          <p className="flex items-center text-gray-light/70">
                            <HiOutlineStatusOnline className="mr-3" />
                            <span className="font-semibold mr-2 uppercase">
                              Operational:
                            </span>
                            <span className="text-lg ml-1">
                              {currAsset.Operational ? (
                                <AiFillCheckCircle className="text-green" />
                              ) : (
                                <AiFillCloseCircle className="text-red/60" />
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row text-xs mt-2">
                          <p className="flex items-center text-gray-light/70">
                            <AiFillSchedule className="mr-3" />
                            <span className="font-semibold mr-2 uppercase py-2">
                              Schedulable:
                            </span>
                            <span className="text-lg">
                              {currAsset.Schedulable ? (
                                <AiFillCheckCircle className="text-green" />
                              ) : (
                                <AiFillCloseCircle className="text-red/60" />
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* card-content-end */}
                  </div>
                  {/* card-image-start */}
                  <div className="w-1/2">
                    <div className="bg-cover p-4">
                      <img
                        alt={`${params.id}`}
                        src={`http://localhost:3000/images/${(params.id).toString()}.jpg`}
                        className="rounded shadow-lg border border-gray-light"
                      />
                      <span className="p-2 float-right text-xs text-gray-light/50">{`asset id: ${currAsset.Id}`}</span>
                    </div>
                  </div>
                  {/* card-image-end */}
                </div>
                <div className="card-footer flex w-full border-t text-xs text-gray-light/50 mt-10">
                  <span className="p-2">{`serial: ${currAsset.Serial}`}</span>
                  <span className="p-2">|</span>
                  <span className="p-2">{`author id: ${currAsset.AuthorId}`}</span>
                </div>
                {/* card-nav-start */}
                <div className="nav-btns flex justify-between text-pink text-xs mt-4">
                  <button className="flex" onClick={() => changePage('prev')}>
                    <GrFormPrevious className="bg-gray-light text-lg rounded-full" />
                    <span className="ml-2">Previous Asset </span>
                  </button>
                  <span className="text-2xl">
                    <HiOutlineDotsHorizontal />
                  </span>
                  <button className="flex" onClick={() => changePage('next')}>
                    <span className="mr-2">Next Asset </span>
                    <GrFormNext className="bg-gray-light text-lg rounded-full" />
                  </button>
                </div>
                {/* card-nav-end */}
              </div>
              {/* card-end  */}
            </div>

            <div className="w-full flex flex-col space-y-4 text-gray-light/80 text-xs">
              {/* */}
              <div className="w-full block bg-blue-darker relative overflow-hidden shadow-xl rounded-lg p-2">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-light" />
                <div className="flex justify-between">
                  <h5 className="md:text-sm text-sm text-gray-light font-semibold uppercase">
                    System Information
                  </h5>
                  <div className="flex gap-4 mr-4">
                    <button
                      className="cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete()}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
                <hr />
                <p className="text-xs uppercase">{`${currAsset.SystemInformation}`}</p>
                <p className="mb-4 py-2 px-2">{`Remarks: ${currAsset.Remarks}`}</p>
                <EditAsset
                  showModal={showModal}
                  setShowModal={setShowModal}
                  asset={currAsset}
                  onClose={handleClose}
                />
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex mt-10 justify-center items-center text-text">
            <button
              className="ml-5 mr-10"
              onClick={() => {
                changePage('prev');
              }}
            >
              <div className="block rounded-lg content-center h-full">
                <GrFormPrevious className="bg-gray-light text-lg rounded-full" />
              </div>
            </button>
            <h1 className="text-4xl">Unable to locate requested entry!</h1>
            <button className="ml-10" onClick={() => changePage('next')}>
              <div className="block rounded-lg content-center h-full ">
                <GrFormNext className="bg-gray-light text-lg rounded-full" />
              </div>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Asset;
