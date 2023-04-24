// Get needed dependencies only
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../Context/AppContext.js';
import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import AddAsset from './AddAsset';
import { listFetch } from '../../utils/api/endPoints.js';
// Provides functionality for all assets
const AllAssets = () => {
  // Tracks user info, current total items, and displayed asset info
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { userData } = useContext(AppContext);
  const [originalAssets, setOriginalAssets] = useState([]);
  const [currAssets, setCurrAssets] = useState([]);
  const [currPage, setCurrPage] = useState(1); // Page displays 9 assets per page
  const [sortField, setSortField] = useState('Range');
  const [sortOrder, setSortOrder] = useState(true); // True = Ascending, False = Descending
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // // Helper function to convert coordinates from the DD format to the DMS format
  // const convertDDtoDMS = (coord) => {
  //   return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(
  //     (Math.abs(coord) % 1) * 60
  //   )}'${((((Math.abs(coord) % 1) * 60) % 1) * 60).toFixed(2)}"`;
  // };

  // Helper function to update the list of all assets
  const updateInventory = async () => {
    // Retrieves all database assets
    await listFetch('Assets', (data) => {
      setOriginalAssets(data.d.results);
      setCurrAssets([...data.d.results]);
    });
  };

  // Updates the displayed inventory on initial page load and when the assets list is changed
  useEffect(() => {
    updateInventory();
  }, []);

  // Helper function to display the next page of assets
  const nextPageFunc = () => {
    if (currAssets.length / (currPage * itemsPerPage) > 1) {
      setCurrPage(currPage + 1);
    }
  };

  // Helper function to display the previous page of assets
  const prevPageFunc = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  // Formats the list of all assets
  return (
    <div className="max-w-screen-2xl mx-auto">
      {userData.IsSiteAdmin ? (
        <div>
          {currAssets !== [] ? (
            <div className="mt-2 mx-auto">
              <div className="bg-gray-dark mb-4 mx-auto h-16 max-w-5xl relative rounded overflow-hidden">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
                <div className="flex items justify-evenly">
                  <span className="mt-3 max-w-screen-xl mx-auto flex flex-wrap flex-row justify-center">
                    <span className="flex flex-wrap flex-row justify-center">
                      <span className="ml-auto mr-9 flex flex-wrap flex-col">
                        <button
                          type="button"
                          className="p-1 w-48 h-7 text-sm bg-secondary text-center rounded-md text-gray-light border-none"
                          onClick={() => setShowModal(true)}
                        >
                          Add Asset
                        </button>
                      </span>
                      <span className=""></span>
                      <span className="mx-9 flex flex-wrap flex-col">
                        <select
                          name="SortAssets"
                          id="sortAssets"
                          className="p-1 w-48 h-7 text-sm bg-secondary text-gray-light text-center rounded-md border-none"
                          onChange={() => {
                            setSortField(
                              document.getElementById('sortAssets').value
                            );
                            setCurrPage(1);
                          }}
                          defaultValue="Range"
                        >
                          <option value="Serial">Sort by: Serial</option>
                          <option value="Range">Sort by: Range</option>
                          <option value="SiteLocation">
                            Sort by: Location
                          </option>
                          <option value="Equipment">Sort by: Equipment</option>
                          <option value="Threat">Sort by: Threat</option>
                          <option value="ThreatType">
                            Sort by: Threat Type
                          </option>
                          <option value="Operational">
                            Sort by: Operational
                          </option>
                          <option value="Schedulable">
                            Sort by: Schedulable
                          </option>
                        </select>
                      </span>
                    </span>
                    <span className="flex flex-wrap flex-row justify-center">
                      <span className="mx-9 flex flex-wrap flex-col">
                        <button
                          type="button"
                          className="p-1 w-48 h-7 text-sm bg-secondary text-gray-light text-center rounded-md border-none"
                          onClick={() => {
                            setSortOrder(!sortOrder);
                            setCurrPage(1);
                          }}
                        >
                          Sort Order: {sortOrder ? 'Ascending' : 'Descending'}
                        </button>
                      </span>

                      <span className="ml-9 mr-auto flex flex-wrap flex-col">
                        <select
                          name="DisplayPerPage"
                          id="DisplayPerPage"
                          className="p-1 w-48 h-7 text-sm bg-secondary text-gray-light text-center rounded-md border-none"
                          defaultValue={`${itemsPerPage}`}
                          onChange={() => {
                            setItemsPerPage(
                              document.getElementById('DisplayPerPage').value
                            );
                            setCurrPage(1);
                          }}
                        >
                          <option value="5">Assets per Page: 5</option>
                          <option value="10">Assets per Page: 10</option>
                          <option value="20">Assets per Page: 20</option>
                          <option value="30">Assets per Page: 30</option>
                          <option value="40">Assets per Page: 40</option>
                          <option value="50">Assets per Page: 50</option>
                        </select>
                      </span>
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-4 max-w-screen-xl mx-auto p-1 flex flex-wrap flex-row justify-center">
                {currAssets
                  .sort((a, b) => {
                    return (
                      a[sortField]
                        .toString()
                        .localeCompare(b[sortField].toString(), 'en', {
                          numeric: true,
                        }) * (sortOrder ? 1 : -1)
                    );
                  })
                  .filter((asset) => {
                    let currIndex = currAssets.indexOf(asset) + 1; // adjusted for 0-indexing
                    return (
                      currIndex >= 1 + itemsPerPage * (currPage - 1) &&
                      currIndex <= itemsPerPage * currPage
                    );
                  })
                  .map((card) => {
                    return (
                      <span
                        key={card.Id}
                        className="m-2 hover:scale-105 hover:transition-transform hover:duration-150 border-separate bg-blue-darker border-primary border-2
                      w-64 h-68 p-1 shadow-lg rounded-md text-xs "
                        onClick={() => navigate(`/Asset/${card.Id}`)}
                      >
                        <div className="text-gray-light">
                          <div className="flex mx-auto text-base justify-between items-center px-1">
                            <span className="font-light">{`Serial#:`}</span>
                            <span className="font-light text-xs">{`${card.Serial}`}</span>
                          </div>
                          <div className="mt-1 mb-2">
                            <img
                              src={`http://localhost:3000/images/${card.Id.toString()}.jpg`}
                              alt="AA Gun"
                              className="h-32 w-60 mx-auto rounded-md"
                            />
                          </div>

                          <div className="flex justify-around bg-gray-dark rounded mx-1">
                            <div className="flex flex-col p-2 text-xs">
                              <span className="font-semibold mr-1">
                                {`Range:\t   `}
                              </span>
                              <span className="font-semibold mr-1">
                                {`Location:\t   `}
                              </span>
                              <span className="font-semibold mr-1">
                                {`Equipment:\t   `}
                              </span>
                              <span className="font-semibold mr-1">
                                {`Threat:\t   `}
                              </span>
                              <span className="font-semibold mr-1">
                                {`Threat Type:\t   `}
                              </span>
                            </div>
                            <div className="flex flex-col text-left p-2 text-xs">
                              <span>{`${card.Range}`}</span>
                              <span>{`${card.SiteLocation}`}</span>
                              <span>{`${card.Equipment}`}</span>
                              <span>{`${card.Threat}`}</span>
                              <span>{`${card.ThreatType}`}</span>
                            </div>
                          </div>

                          {/* <div className="flex flex-col justify-start p-1 mx-1 bg-gray-dark rounded">
                            <span className="px-1  ">
                              <span className="font-semibold mr-1">
                                {`Range:\t   `}
                              </span>
                              <span>{`${card.Range}`}</span>
                            </span>

                            <span className="ml-1">
                              <span className="font-semibold mr-1">
                                {`Location:  `}
                              </span>
                              <span>{`${card.SiteLocation}`}</span>
                            </span>

                            <span className="ml-1">
                              <span className="font-semibold mr-1">
                                {`Equipment: `}
                              </span>
                              <span>{`${card.Equipment}`}</span>
                            </span>

                            <span className="ml-1">
                              <span className="font-semibold mr-1">
                                {`Threat:\t   `}
                              </span>
                              <span>{`${card.Threat}`}</span>
                            </span>

                            <span className="ml-1">
                              <span className="font-semibold">{`Type:\t   `}</span>
                              <span className=''>{`${card.ThreatType}`}</span>
                            </span>
                          </div> */}

                          <div className="mx-2 my-1 flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="ml-2 mr-1 text-xs">{`Operational:`}</span>
                              <span className="text-xs">
                                {card.Operational ? (
                                  <AiFillCheckCircle className="text-green bg-blue-darker rounded-full" />
                                ) : (
                                  <AiFillCloseCircle className="text-red bg-blue-darker rounded-full opacity-80" />
                                )}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="ml-2 mr-1 text-xs">{`Schedulable:`}</span>
                              <span className="text-xs">
                                {card.Schedulable ? (
                                  <AiFillCheckCircle className="text-green bg-blue-darker rounded-full" />
                                ) : (
                                  <AiFillCloseCircle className="text-red bg-blue-darker rounded-full opacity-80" />
                                )}
                              </span>
                            </div>

                            {/* <p className="flex items-center">
                              <span className="ml-2 text-xs">{`Operational:`}</span>
                              <span className="text-xs">
                                {card.Operational ? (
                                  <AiFillCheckCircle className="text-green bg-blue-darker rounded-full" />
                                ) : (
                                  <AiFillCloseCircle className="text-red bg-blue-darker rounded-full opacity-80" />
                                )}
                              </span>
                              <span className="ml-8 text-xs">{`Schedulable:`}</span>
                              <span className="text-xs">
                                {card.Schedulable ? (
                                  <AiFillCheckCircle className="text-green bg-blue-darker rounded-full mr-auto" />
                                ) : (
                                  <AiFillCloseCircle className="text-red bg-blue-darker rounded-full mr-auto opacity-80" />
                                )}
                              </span>
                            </p> */}
                          </div>
                        </div>
                      </span>
                    );
                  })}
              </div>
              <div className="mt-5 flex flex-row">
                <p className="flex items-center mx-auto">
                  <button type="button" className="ml-1 text-xl">
                    {currPage > 1 ? (
                      <MdKeyboardArrowLeft
                        className="ml-auto p-1 w-8 h-8 bg-gray-light rounded-full"
                        onClick={() => prevPageFunc()}
                      />
                    ) : (
                      <MdKeyboardArrowLeft className="ml-auto p-1 w-8 h-8 bg-gray-light rounded-full" />
                    )}
                  </button>
                  <span className="mr-1 p-1 w-28 text-gray-light text-center text-xl rounded-md">
                    Prev Page
                  </span>
                  <span className="mx-4 w-8 h-8 text-gunmetal bg-gray-light text-center text-xl rounded-full font-semibold">
                    {currPage}
                  </span>
                  <span className="ml-1 p-1 w-28 text-gray-light text-center text-xl rounded-md">
                    Next Page
                  </span>
                  <button type="button" className="ml-1 text-xl">
                    {currAssets.length / (currPage * itemsPerPage) > 1 ? (
                      <MdKeyboardArrowRight
                        className="mr-auto p-1 w-8 h-8 bg-gray-light rounded-full"
                        onClick={() => nextPageFunc()}
                      />
                    ) : (
                      <MdKeyboardArrowRight className="mr-auto p-1 w-8 h-8 bg-gray-light rounded-full" />
                    )}
                  </button>
                </p>
              </div>
              <AddAsset showModal={showModal} setShowModal={setShowModal} />
            </div>
          ) : (
            <h1 className="text-gray-light text-center m-auto">Loading...</h1>
          )}
        </div>
      ) : (
        <h1 className="text-gray-light text-center text-4xl mt-150">
          You do not have permission to view this page
        </h1>
      )}
    </div>
  );
};

// Exports AllAssets for usability
export default AllAssets;
