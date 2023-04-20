// Get needed dependencies only
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
// Provides functionality for all assets
const AllAssets = () => {
  // Tracks user info, current total items, and displayed asset info
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { listUrl } = useContext(Context);
  const { userData } = React.useContext(Context);
  const [originalAssets, setOriginalAssets] = useState([]);
  const [currAssets, setCurrAssets] = useState([]);
  const [currPage, setCurrPage] = useState(1); // Page displays 9 assets per page
  const [sortField, setSortField] = useState('Range');
  const [sortOrder, setSortOrder] = useState(true); // True = Ascending, False = Descending
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
    await fetch(`${listUrl}/GetByTitle('Assets')/items`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((items) => {
        setOriginalAssets(items.d.results);
        setCurrAssets([...items.d.results]);
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
              <span className="mt-2 flex flex-wrap">
                <div className="ml-auto mr-20 p-1 w-32 bg-secondary text-text text-center rounded-md">
                  Total Assets: {currAssets.length}
                </div>
                <button
                  type="button"
                  className="ml-20 mr-auto p-1 w-32 bg-secondary text-text text-center rounded-md"
                >
                  Add Asset
                </button>
              </span>
              <span className="mt-2 flex flex-wrap">
                <label
                  htmlFor="SortAssets"
                  className="ml-auto mr-1 p-1 w-36 bg-secondary text-text text-center rounded-md"
                >
                  Sort Assets by:
                </label>
                <select
                  name="SortAssets"
                  id="sortAssets"
                  className="ml-1 mr-6 p-1 w-36 bg-secondary text-text text-center rounded-md"
                  onChange={() => {
                    setSortField(document.getElementById('sortAssets').value);
                    setCurrPage(1);
                  }}
                  defaultValue="Range"
                >
                  <option value="Serial">Serial</option>
                  <option value="Range">Range</option>
                  <option value="SiteLocation">Location</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Threat">Threat</option>
                  <option value="ThreatType">Threat Type</option>
                  <option value="Operational">Operational</option>
                  <option value="Schedulable">Schedulable</option>
                </select>
                <label
                  htmlFor="assets"
                  className="ml-6 mr-1 p-1 w-28 bg-secondary text-text text-center rounded-md"
                >
                  Sort Order:
                </label>
                <button
                  type="button"
                  className="ml-1 mr-6 p-1 w-28 bg-secondary text-text text-center rounded-md"
                  onClick={() => {
                    setSortOrder(!sortOrder);
                    setCurrPage(1);
                  }}
                >
                  {sortOrder ? 'Ascending' : 'Descending'}
                </button>
                <label
                  htmlFor="DisplayPerPage"
                  className="ml-6 mr-1 p-1 w-36 bg-secondary text-text text-center rounded-md"
                >
                  Display:
                </label>
                <select
                  name="DisplayPerPage"
                  id="DisplayPerPage"
                  className="ml-1 mr-auto p-1 w-36 bg-secondary text-text text-center rounded-md"
                  defaultValue={`${itemsPerPage}`}
                  onChange={() => {
                    setItemsPerPage(
                      document.getElementById('DisplayPerPage').value
                    );
                    setCurrPage(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </span>
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
                        className="m-3 hover:scale-110 hover:transition-transform hover:duration-150 border-separate bg-tertiary border-primary border-2
                      w-64 h-68 p-1 shadow-lg rounded-md text-sm"
                        onClick={() => navigate(`/Asset/${card.Id}`)}
                      >
                        <pre className="text-gunmetal">
                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Serial#:\t`}
                            </span>
                            <span>
                              {` ${card.Serial}`}
                            </span>
                          </span>
                          <br />

                          <span className="font-semibold content-center items-center align-middle">
                            <img
                              src={`/weaponImages/${
                                (originalAssets.indexOf(card) % 18) + 1
                              }.png`}
                              alt="AA Gun"
                              className="h-32 w-60 mx-auto rounded-md"
                            />
                          </span>

                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Range:\t\t`}
                            </span>
                            <span>
                              {` ${card.Range}`}
                            </span>
                          </span>
                          <br />

                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Location:\t`}
                            </span>
                            <span>
                              {` ${card.SiteLocation}`}
                            </span>
                          </span>
                          <br />

                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Equipment:\t`}
                            </span>
                            <span>
                              {` ${card.Equipment}`}
                            </span>
                          </span>
                          <br />

                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Threat:\t\t`}
                            </span>
                            <span>
                              {` ${card.Threat}`}
                            </span>
                          </span>
                          <br />

                          <span className="mx-auto">
                            <span className="font-semibold">
                              {`Type:\t\t`}
                            </span>
                            <span>
                              {` ${card.ThreatType}`}
                            </span>
                          </span>
                          <br />

                          <div className="flex flex-row">
                            <p className="flex items-center">
                              <span className="font-semibold ml-1">
                                {`Operational:  `}
                              </span>
                              <span className="ml-1 text-lg">
                                {card.Operational ? (
                                  <AiFillCheckCircle className="text-green bg-text rounded-full" />
                                ) : (
                                  <AiFillCloseCircle className="text-red/60 bg-text rounded-full" />
                                )}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-row">
                            <p className="flex items-center">
                              <span className="font-semibold ml-1">
                                {`Schedulable:  `}
                              </span>
                              <span className="ml-1 text-lg">
                                {card.Schedulable ? (
                                  <AiFillCheckCircle className="text-green bg-text rounded-full" />
                                ) : (
                                  <AiFillCloseCircle className="text-red/60 bg-text rounded-full" />
                                )}
                              </span>
                            </p>
                          </div>
                        </pre>
                      </span>
                    );
                  })}
              </div>
              <div className="flex flex-row">
                <p className="flex items-center mx-auto">
                  <span className="ml-1 text-xl">
                    {currPage > 1 ? (
                      <MdKeyboardArrowLeft
                        className="ml-1 mr-auto p-1 bg-text rounded-full"
                        onClick={() => prevPageFunc()}
                      />
                    ) : (
                      <MdKeyboardArrowLeft
                        className="ml-1 mr-auto p-1 bg-text rounded-full"
                      />
                    )}
                  </span>
                  <span className="ml-1 mr-auto p-1 w-20 text-text text-center rounded-md">
                    Prev Page
                  </span>
                  <span className="mx-1 p-1 text-text rounded-md ">
                    {currPage}
                  </span>
                  <span className="ml-1 mr-auto p-1 w-20 text-text text-center rounded-md">
                    Next Page
                  </span>
                  <span className="ml-1 text-xl">
                    {currAssets.length / (currPage * itemsPerPage) > 1 ? (
                      <MdKeyboardArrowRight
                        className="ml-1 mr-auto p-1 bg-text rounded-full"
                        onClick={() => nextPageFunc()}
                      />
                    ) : (
                      <MdKeyboardArrowRight
                        className="ml-1 mr-auto p-1 bg-text rounded-full"
                      />
                    )}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-text text-center m-auto">Loading...</h1>
          )}
        </div>
      ) : (
        <h1 className="text-text text-center text-4xl mt-150">
          You do not have permission to view this page
        </h1>
      )}
    </div>
  );
};

// Exports AllAssets for usability
export default AllAssets;
