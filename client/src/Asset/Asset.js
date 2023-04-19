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
  AiOutlineNumber,
  AiFillSchedule,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from 'react-icons/ai';
import { FaCrosshairs } from 'react-icons/fa';
import { GrStatusGood, GrStatusCritical } from 'react-icons/gr';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { SiSemaphoreci } from 'react-icons/si';
import { BsMagic, BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineStatusOnline, HiDocumentReport } from 'react-icons/hi';
import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx';

const Asset = () => {
  const [assets, setAssets] = useState([]);
  const [currAsset, setCurrAsset] = useState();
  let params = useParams();
  const [timeLine, setTimeLine] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { listUrl } = useContext(Context);

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
        <div className="container mx-auto h-screen my-6">
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4">
              {/* card-start */}
              <div className="w-3/4 min-h-fit bg-text relative block overflow-hidden border border-gray-light shadow-xl rounded-lg p-4">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />

                {/* card-nav-start */}
                <div className="nav-btns flex justify-between text-gray">
                  <button onClick={() => changePage('prev')}>
                    <RxTrackPrevious />
                  </button>
                  <button onClick={() => changePage('next')}>
                    <RxTrackNext />
                  </button>
                </div>
                {/* card-nav-end */}

                <div className="flex justify-center">
                  {/* card-content-start */}
                  <div className="w-4/6 flex flex-col space-y-4 px-6 text-gray">
                    <div className="card-header">
                      <h5 className="md:text-lg text-sm text-gray-dark/80 font-bold uppercase">
                        {`${currAsset.ThreatType} ${currAsset.Equipment} (${currAsset.Threat})`}
                      </h5>
                      <hr />
                      <div className="site-location flex justify-between">
                        <p className="mt-1 text-xs font-medium text-gray">{`${currAsset.Range} | ${currAsset.SiteLocation}`}</p>
                      </div>
                    </div>
                    <div className="range & data">
                      <p className="text-gray-dark uppercase text-sm">
                        Range & Equipment Data:{' '}
                      </p>
                      <div className="flex flex-row text-xs mt-2">
                        <p className="flex items-center text-gray">
                          <BiTargetLock className="mr-3" />
                          <span className="font-semibold mr-2 uppercase">
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

                      <div className="flex flex-row text-xs mt-2">
                        <p className="flex items-center text-gray">
                          <SiSemaphoreci className="mr-3" />
                          <span className="font-semibold mr-2 uppercase">
                            Elevation:
                          </span>
                          <span>{`${currAsset.Elevation} ft.`}</span>
                        </p>
                      </div>

                      <div className="flex flex-row text-xs mt-2">
                        <p className="flex items-center text-gray">
                          <BsMagic className="mr-3" />
                          <span className="font-semibold mr-2 uppercase">
                            Measured:
                          </span>
                          <span>{`with ${currAsset.CoordSource}`}</span>
                        </p>
                      </div>
                    </div>
                    <div className="status">
                      <p className="text-gray-dark uppercase text-sm">
                        Asset Status:{' '}
                      </p>

                      <div className="flex flex-row text-xs mt-2">
                        <p className="flex items-center text-gray">
                          <HiDocumentReport className="mr-3" />
                          <span className="font-semibold mr-2 uppercase">
                            Status:
                          </span>
                          <span
                            className={`text-text px-1 rounded-full bg-gray`}
                          >{`${currAsset.Status}`}</span>
                        </p>
                      </div>

                      {/* 'RED', 'AMBER', 'GREEN', 'NA' */}

                      <div className="flex flex-row text-xs mt-2">
                        <p className="flex items-center text-gray">
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
                        <p className="flex items-center text-gray">
                          <AiFillSchedule className="mr-3" />
                          <span className="font-semibold mr-2 uppercase">
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
                    <div className="card-footer flex w-full border-t text-xs">
                      <span className="p-2">{`serial: ${currAsset.Serial}`}</span>
                      <span className="p-2">|</span>
                      <span className="p-2">{`author id: ${currAsset.AuthorId}`}</span>
                      <span className="p-2">|</span>
                      <span className="p-2">{`asset id: ${currAsset.Id}`}</span>
                    </div>
                  </div>
                  {/* card-content-end */}
                  {/* asset-image-start */}
                  {/* <div className='w-full h-auto hidden lg:block lg:w-1/2 bg-cover p-4'>
                    <img
                    alt={`${params.id}`}
                    src={`http://localhost:3000/images/${(
                      params.id % 10
                    ).toString()}.jpg`}
                    className="w-full h-auto rounded-lg"
                  />
                  </div> */}
                  {/* asset-image-end*/}
                </div>
              </div>
              {/* card-end  */}

              {/* map-start */}
              <div className="w-fit h-fit block bg-cover relative overflow-hidden border border-gray shadow-xl rounded-lg">
                <AssetMap
                  serial={currAsset.Serial}
                  center={[currAsset.Longitude, currAsset.Latitude]}
                />
              </div>
              {/* map-end */}

              {/* asset image */}

              {/* asset image end */}
            </div>

            <div className="flex gap-2">
              {/*  */}
              <div className=" w-1/2 block bg-text relative overflow-hidden border border-gray-light shadow-xl rounded-lg p-4">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
              </div>
              {/*  */}
              {/* */}
              <div className=" w-1/2 block bg-text relative overflow-hidden border border-gray-light shadow-xl rounded-lg p-4">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <div className="flex mt-10 justify-center items-center">
            <button
              className="ml-5 mr-10"
              onClick={() => {
                changePage('prev');
              }}
            >
              <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full">
                <FiArrowLeft className="mt-10" />
              </div>
            </button>
            <h1 className="text-4xl">Unable to locate requested entry!</h1>
            <button className="ml-10" onClick={() => changePage('next')}>
              <div className="block rounded-lg bg-bluer/25 border border-black content-center h-full ">
                <FiArrowRight className="mt-10" />
              </div>
            </button>
          </div> */}
        </>
      )}
    </>
  );
};

export default Asset;

{
  /* <div className="px-12 sm:px-4 sm:h-full sm:justify-center">
<img
  alt={`${params.id}`}
  src={`http://localhost:3000/images/${(
    params.id % 10
  ).toString()}.jpg`}
  className="object-cover rounded-lg shadow-sm"
/>
</div> */
}

{
  /* <div className="flex flex-row gap-5 mb-4 ml-8 mr-2">
<div className="w-1/2 h-4/6 ">
  <AssetMap
        serial={currAsset.Serial}
        center={[currAsset.Longitude, currAsset.Latitude]}
      />
</div> */
}

{
  /* <div className="flex flex-col gap-5 w-1/2 mr-10"> */
}
{
  /* <div className="h-1/3 block rounded-lg bg-bluer/25 border border-black text-center flex flex-row justify-between">
        <>
          <ol className="mt-4 border-t border-neutral-300 w-full flex flex-row justify-around">
            {timeLine.length > 0 ? (
              [...timeLine]
                .sort((a, b) => {
                  return a.time - b.time;
                })
                .map((event, index) => {
                  return (
                    <li>
                      <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                        <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
                        <h4 className="mb-1.5 text-lg font-semibold">
                          {event.name}
                          {index !== timeLine.length - 1 ? (
                            '-->'
                          ) : (
                            <></>
                          )}
                        </h4>
                        <p className="mt-2 text-sm font-medium text-neutral-500">
                          {event.time.toFormat('dd MMM yyyy')}
                        </p>
                        <p className="text-sm">
                          {`at ${event.time.toFormat('hh:mm')}`}
                        </p>
                      </div>
                      <div className="ml-4 mt-2 pb-5 md:ml-0">
                        <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                          {event.name === 'Asset Modified' ? (
                            <>{`Editor ID: ${currAsset.EditorId}`}</>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })
            ) : (
              <></>
            )}
          </ol>
        </>
      </div> */
}

{
  /* <div className="flex flex-row h-full gap-5">
    {/* <div className="w-1/2 h-full block rounded-lg bg-bluer/25 border border-black">
          <div className="flex flex-col">
            <h1 className="text-xl font-medium text-center">
              System Information
            </h1>
            <div className="text-center">{`${currAsset.SystemInformation}`}</div>
            <div className="p-5">{`${currAsset.Remarks}`}</div>

            <EditAsset
              showModal={showModal}
              setShowModal={setShowModal}
              asset={currAsset}
            />

            <div className="flex flex-row justify-center gap-5">
              <button
                className="border border-black rounded-lg block bg-blue p-2"
                onClick={() => setShowModal(true)}
              >
                Edit
              </button>
              <button
                className="border border-black rounded-lg block bg-blue p-2"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div> */
}

//     <div className="w-1/2 h-full block rounded-lg">

//     </div>
//   </div>
// </div>
// </div>
