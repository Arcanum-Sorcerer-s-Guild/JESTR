// Get needed dependencies only
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
export const AssetsContext = React.createContext();



// Provides functionality for all assets
const AllAssets = () => {
  // Tracks user info, current total items, and displayed asset info
  const itemsPerPage = 8;
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

  // Helper function to update the list of all assets
  const updateInventory = async () => {
    // Retrieves all database assets
    await fetch(`${listUrl}/GetByTitle('Assets')/items`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((items) => {
        setCurrAssets(items.d.results);
      })
      .then(handleSorting(sortField, sortOrder))
      .then(console.log(currAssets))
  };

  // // Helper function to convert coordinates from the DD format to the DMS format
  // const convertDDtoDMS = (coord) => {
  //   return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(
  //     (Math.abs(coord) % 1) * 60
  //   )}'${((((Math.abs(coord) % 1) * 60) % 1) * 60).toFixed(2)}"`;
  // };

  // Helper function to handle sorting when an asset column header is clicked
  const handleSorting = (newSortField, newSortOrder) => {
    const sorted = [...currAssets].sort((a, b) => {
      // if (a[sortField] === null) return 1;
      // if (b[sortField] === null) return -1;
      // if (a[sortField] === null && b[sortField] === null) return 0;
      return (
        a[newSortField].toString().localeCompare(b[newSortField].toString(), 'en', {
          numeric: true,
        }) * (newSortOrder ? 1 : -1)
      );
    });
    setCurrAssets(sorted);
    // console.log(sortField);
    // console.log(sortOrder);
    // setSortField(newSortField);
    // setSortOrder(newSortOrder);
    console.log(sortField);
    console.log(sortOrder);
    // console.log(currAssets);
  };

  // Updates the displayed inventory on initial page load and when the assets list is changed
  useEffect(() => {
    updateInventory();
    // handleSorting(sortField, sortOrder);
  }, []);

  const nextPageFunc = () => {
    if (currAssets.length / (currPage*itemsPerPage) > 1) {
      setCurrPage(currPage+1)
    }
  }

  const prevPageFunc = () => {
    if (currPage > 1) {
      setCurrPage(currPage-1)
    }
  }

  // onchange={() => {handleSorting(sortField, sortOrder)}}

  // onClick={() => {handleSorting(sortField, !sortOrder)}}

  // Formats the list of all assets
  return (
    <div className="max-w-6xl mx-auto">
      {userData.IsSiteAdmin ? (
      <AssetsContext.Provider value={{ currAssets, setCurrAssets }}>
        <div className="mt-4 rounded-md shadow-md bg-purple text-text text-center max-w-2x1">
          <button type="button" className="font-semibold">
            Add Asset
          </button>
        </div>
        <div className="mt-4 p-2 rounded-md shadow-md bg-purple text-text text-center">
          <h3 className="font-semibold">All Assets</h3>
        </div>
        <span>
          {
            currPage>1
              ? <button type="button" className="bg-secondary text-text" onClick={()=>prevPageFunc()}>Previous Page</button>
              : <span className="bg-secondary text-text opacity-50">Previous Page</span>
          }
          <label for="assets" >Sort Assets by:</label>
          <select name="assets" id="assets" >
            <option value="range">Range</option>
            <option value="equipment">Equipment</option>
            <option value="threat">Threat</option>
            <option value="location">SiteLocation</option>
            <option value="serial">Serial</option>
          </select>
          <label for="assets">Display In:</label>
          <button type="button">{sortOrder ? "Ascending Order" : "Descending Order"}</button>
          {
            currAssets.length / (currPage*itemsPerPage) > 1
              ? <button type="button" className="bg-secondary text-text" onClick={()=>nextPageFunc()}>Next Page</button>
              : <button type="button" className="bg-secondary text-text opacity-10" onClick={()=>nextPageFunc()}>Next Page</button>
          }
          {/* <select name="assets" id="assets" onchange={handleSorting(sortField, sortOrder)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select> */}
        </span>
        <div className>
          <div className="mt-2">
            <div className="mt-2 flex flex-col">
              <div className="my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow-lg overflow-hidden border-b sm:rounded-lg">
                    <div className="text-center">Total Assets: {currAssets.length}</div>
                    <span className="flex flex-wrap">
                      {currAssets.filter(asset => {
                        let currIndex = currAssets.indexOf(asset)+1 // adjusted for 0-indexing
                        return currIndex >= 1+itemsPerPage*(currPage-1) && currIndex <= itemsPerPage*(currPage);
                      }).map(card => {
                        return (
                          <span key={card.Id} className="m-5 hover:scale-110 border border-separate bg-tertiary w-80 shadow-md" style={{borderRadius:"8px", padding:"5px"}} onClick={() => navigate(`/Asset/${card.Id}`)}>
                            <pre className="">
                              <b>Equipment:</b>
                              {`\t\t${card.Equipment}`}
                              <br/>
                              <b>Threat:</b>
                              {`\t\t\t${card.Threat}`}
                              <br/>
                              <b>Range:</b>
                              {`\t\t\t${card.Range}`}
                              <br/>
                              <b>Site Location:</b>
                              {`\t${card.SiteLocation}`}
                              <br/>
                              <b>Serial:</b>
                              {`\t\t\t${card.Serial}`}
                            </pre>
                          </span>
                        )
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AssetsContext.Provider>
      ) : (
        <>You need to be logged in as a site admin.</>
      )}
    </div>
  );
};

// Exports AllAssets for usability
export default AllAssets;

