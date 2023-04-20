// Get needed dependencies only
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
export const AssetsContext = React.createContext();



// Provides functionality for all assets
const AllAssets = () => {

  // Tracks user info, current total items, and displayed asset info
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { listUrl } = useContext(Context);
  const { userData } = React.useContext(Context);
  const [currAssets, setCurrAssets] = useState([]);
  const [currPage, setCurrPage] = useState(1); // Page displays 9 assets per page
  const [sortField, setSortField] = useState('Range');
  const [sortOrder, setSortOrder] = useState(true); // True = Ascending, False = Descending
  const columns = [
    { label: 'Site Location', accessor: 'SiteLocation', sortable: true },
    { label: 'Range', accessor: 'Range', sortable: true },
    { label: 'Latitude', accessor: 'Latitude', sortable: true },
    { label: 'Longitude', accessor: 'Longitude', sortable: true },
    { label: 'Elevation', accessor: 'Elevation', sortable: true },
    { label: 'Serial', accessor: 'Serial', sortable: true },
    { label: 'Threat', accessor: 'Threat', sortable: true },
    { label: 'Equipment', accessor: 'Equipment', sortable: true },
  ];
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
        setCurrAssets(items.d.results);
      });
  };

  // Updates the displayed inventory on initial page load and when the assets list is changed
  useEffect(() => {
    updateInventory();
  }, []);

  // Helper function to display the next page of assets
  const nextPageFunc = () => {
    if (currAssets.length / (currPage*itemsPerPage) > 1) {
      setCurrPage(currPage+1)
    }
  }

  // Helper function to display the previous page of assets
  const prevPageFunc = () => {
    if (currPage > 1) {
      setCurrPage(currPage-1)
    }
  }

  // Formats the list of all assets
  return (
    <div className="max-w-6xl mx-auto">
      {userData.IsSiteAdmin ? (
        <div>
          {currAssets !== [] ? (
            <div className="mx-auto">
              <span className="mt-2 flex flex-wrap">
                <div className="ml-auto mr-16 p-1 w-32 bg-secondary text-text text-center rounded-md">Total Assets: {currAssets.length}</div>
                <button type="button" className="ml-16 mr-auto p-1 w-32 bg-secondary text-text text-center rounded-md">Add Asset</button>
              </span>
              <span className="mt-2 flex flex-wrap">
                <label htmlFor="SortAssets" className="ml-auto mr-1 p-1 w-28 bg-secondary text-text text-center rounded-md" >Sort Assets by:</label>
                <select name="SortAssets" id="sortAssets" className="ml-1 mr-3 p-1 w-28 bg-secondary text-text text-center rounded-md" onChange={() => {
                  setSortField(document.getElementById("sortAssets").value)
                  setCurrPage(1)
                }}>
                  <option value="Range">Range</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Threat">Threat</option>
                  <option value="SiteLocation">Site Location</option>
                  <option value="Serial">Serial</option>
                </select>
                <label htmlFor="assets" className="ml-3 mr-1 p-1 w-28 bg-secondary text-text text-center rounded-md">Sort Order:</label>
                <button type="button" className="ml-1 mr-3 p-1 w-28 bg-secondary text-text text-center rounded-md" onClick={() => {
                  setSortOrder(!sortOrder)
                  setCurrPage(1)
                }}>
                  {sortOrder ? "Ascending" : "Descending"}
                </button>
                <label htmlFor="DisplayPerPage" className="ml-3 mr-1 p-1 w-28 bg-secondary text-text text-center rounded-md">Display:</label>
                <select name="DisplayPerPage" id="DisplayPerPage" className="ml-1 mr-auto p-1 w-28 bg-secondary text-text text-center rounded-md" defaultValue={`${itemsPerPage}`} onChange={() => {
                  console.log(itemsPerPage)
                  setItemsPerPage(document.getElementById("DisplayPerPage").value)
                  console.log(itemsPerPage)
                  setCurrPage(1)
                }}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </span>
              <div className="mt-4 mx-auto p-1 flex flex-wrap justify-center">
                {currAssets.sort((a,b) => {
                  return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
                      numeric: true,
                    }) * (sortOrder ? 1 : -1)
                  );
                }
                ).filter(asset => {
                  let currIndex = currAssets.indexOf(asset)+1 // adjusted for 0-indexing
                  return currIndex >= 1+itemsPerPage*(currPage-1) && currIndex <= itemsPerPage*(currPage);
                }).map(card => {
                  return (
                    <span key={card.Id} className="m-2 hover:scale-105 hover:transition-transform hover:duration-150 border-separate bg-tertiary border-primary border-2
                    w-64 h-48 p-1 shadow-lg rounded-md text-center" onClick={() => navigate(`/Asset/${card.Id}`)}>
                      <pre className="text-gunmetal">
                        <span className="font-semibold">Serial#:</span>
                        {` ${card.Serial}`}
                        <br/>
                        <span className="font-semibold content-center items-center align-middle">
                          <img src="https://www.vtg.admin.ch/content/vtg-internet/en/einsatzmittel/boden-luft/35mm-flab-kan-63-90-flt-gt-75-951/_jcr_content/operatingresourcesImage/image.transform.1498651685437/image_588_368/image.6051_133.png" alt="AA Gun" className="h-16 w-40 mx-auto"/>
                        </span>
                        <span className="font-semibold">Equipment:</span>
                        {` ${card.Equipment}`}
                        <br/>
                        <span className="font-semibold">Threat:</span>
                        {` ${card.Threat}`}
                        <br/>
                        <span className="font-semibold">Range:</span>
                        {` ${card.Range}`}
                        <br/>
                        <span className="font-semibold">Location:</span>
                        {` ${card.SiteLocation}`}
                      </pre>
                    </span>
                  )
                })}
              </div>
              <span className="mt-0 flex mx-auto">
                {
                  currPage>1
                    ? <button type="button" className="ml-auto mr-1 p-1 w-20 bg-secondary text-text text-center rounded-md" onClick={()=>prevPageFunc()}>Prev Page</button>
                    : <span className="ml-auto mr-1 p-1 w-20 bg-secondary text-text text-center rounded-md opacity-50">Prev Page</span>
                }
                <span className="mx-1 p-1 text-text rounded-md ">{currPage}</span>
                {
                  currAssets.length / (currPage*itemsPerPage) > 1
                    ? <button type="button" className="ml-1 mr-auto p-1 w-20 bg-secondary text-text text-center rounded-md" onClick={()=>nextPageFunc()}>Next Page</button>
                    : <span className="ml-1 mr-auto p-1 w-20 bg-secondary text-text text-center rounded-md opacity-50">Next Page</span>
                }
              </span>
            </div>
          ) : (
            <h1 className="text-text text-center m-auto">Loading...</h1>
          )}

        </div>
      ) : (
        <h1 className="text-text text-center text-4xl mt-150">You do not have permission to view this page</h1>
      )}
    </div>
  );
};



// Exports AllAssets for usability
export default AllAssets;
