// Get needed dependencies only
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
export const AssetsContext = React.createContext();



// Provides functionality for all assets
const AllAssets = () => {
  // Tracks user info, current total items, and displayed asset info
  const { listUrl } = useContext(Context);
  const { userData } = React.useContext(Context);
  const [currAssets, setCurrAssets] = useState([]);
  // const [sortField, setSortField] = useState('');
  // const columns = [
  //   { label: 'Site Location', accessor: 'SiteLocation', sortable: true },
  //   { label: 'Range', accessor: 'Range', sortable: true },
  //   { label: 'Latitude', accessor: 'Latitude', sortable: true },
  //   { label: 'Longitude', accessor: 'Longitude', sortable: true },
  //   { label: 'Elevation', accessor: 'Elevation', sortable: true },
  //   { label: 'Serial', accessor: 'Serial', sortable: true },
  //   { label: 'Threat', accessor: 'Threat', sortable: true },
  //   { label: 'Equipment', accessor: 'Equipment', sortable: true },
  // ];
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
  };

  // // Helper function to convert coordinates from the DD format to the DMS format
  // const convertDDtoDMS = (coord) => {
  //   return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(
  //     (Math.abs(coord) % 1) * 60
  //   )}'${((((Math.abs(coord) % 1) * 60) % 1) * 60).toFixed(2)}"`;
  // };

  // // Helper function to handle sorting when an asset column header is clicked
  // const handleSorting = (sortField, sortOrder) => {
  //   if (sortField) {
  //     const sorted = [...currAssets].sort((a, b) => {
  //       if (a[sortField] === null) return 1;
  //       if (b[sortField] === null) return -1;
  //       if (a[sortField] === null && b[sortField] === null) return 0;
  //       return (
  //         a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
  //           numeric: true,
  //         }) * (sortOrder === 'asc' ? 1 : -1)
  //       );
  //     });
  //     setCurrAssets(sorted);
  //   }
  // };

  // Updates the displayed inventory on initial page load and when the assets list is changed
  useEffect(() => {
    updateInventory()
  }, []);


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
        <div className>
          <div className="mt-2">
            <div className="mt-2 flex flex-col">
              <div className="my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow-lg overflow-hidden border-b sm:rounded-lg">
                    <div>Total Assets: {currAssets.length}</div>
                    <div className="flex-wrap flex-col">
                      {currAssets.map(card => {
                        return (
                          <span key={card.Id} className="m-5 hover:scale-110" onClick={() => navigate(`/Asset/${card.Id}`)}>
                            {card.Equipment}
                            {card.Range}
                            {card.SiteLocation}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AssetsContext.Provider>
      ) : (
        <></>
      )}
    </div>
  );
};

// Exports AllAssets for usability
export default AllAssets;

