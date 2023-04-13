// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { Context } from '../App';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
export const AssetsContext = React.createContext();
// export const LocalContext = React.createContext();


// Provides functionality for all assets
const AllAssets = () => {

  // Tracks user info, current total items, and displayed asset info
  const { userData, setUserdata } = React.useContext(Context);
  const [currAssets, setCurrAssets] = useState([]);
  const [sortField, setSortField] = useState("");
  const columns = [
    { label: 'Site Location', accessor: "SiteLocation", sortable: true },
    { label: 'Range', accessor: "Range", sortable: true },
    { label: 'Latitude', accessor: "Latitude", sortable: true },
    { label: 'Longitude', accessor: "Longitude", sortable: true },
    { label: 'Elevation', accessor: "Elevation", sortable: true },
    { label: 'Serial', accessor: "Serial", sortable: true },
    { label: 'Threat', accessor: "Threat", sortable: true },
    { label: 'Equipment', accessor: "Equipment", sortable: true }
  ];

  // Helper function to update the list of all assets
  const updateInventory = async () => {
    // Retrieves all database assets
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((items) => setCurrAssets(items.d.results))
      .then(handleSorting("SiteLocation", "asc"));
  }

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...currAssets].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setCurrAssets(sorted);
    }
  };

  // On page load, updates the list of all assets
  useEffect(() => {
    updateInventory();
  }, []);

  // Formats the list of all assets
  return (
    <div className="max-w-6xl mx-auto">
      <AssetsContext.Provider value={{currAssets, setCurrAssets}}>
        {userData.IsOwner ?
          <div className="mt-4 rounded-md shadow-md bg-purple text-text text-center max-w-2x1">
            <button type="button" className="font-semibold">Add Asset</button>
          </div>:
          <></>
        }
        <div className="mt-4 p-2 rounded-md shadow-md bg-purple text-text text-center">
            <h3 className="font-semibold">All Assets</h3>
        </div>
        <div className>
          <div className="mt-2">
            <div className="mt-2 flex flex-col">
              <div className="my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow-lg overflow-hidden border-b sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-light/100">
                      {/* <thead className="bg-gray-light/50 text-gray/100">
                        <tr>
                          {columnHeaders.map((header, i) => (
                            <th
                              key={i}
                              className='px-6 py-2 text-center text-xs font-medium uppercase tracking-wider' onClick={() => handleSortingChange(header.name)}
                            >
                              {header.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-text divide-y divide-y-gray/75">
                        {currAssets.map((asset, i) => (
                          <tr key={i}>
                            <td className="text-left text-xs">{asset.SiteLocation}</td>
                            <td className="text-left text-xs">{asset.Range}</td>
                            <td className="text-left text-xs">{formatLatLong(asset.Latitude, asset.Longitude)}</td>
                            <td className="text-left text-xs">{asset.Range}</td>
                            <td className="text-left text-xs">{asset.Elevation}</td>
                            <td className="text-left text-xs">{asset.Serial}</td>
                            <td className="text-left text-xs">{asset.Equipment} ({asset.Threat})</td>
                          </tr>
                        ))}
                      </tbody> */}
                      <TableHead {...{ columns, handleSorting }}/>
                      <TableBody {...{ columns }}/>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AssetsContext.Provider>
    </div>


// tableData={currAssets}



  );
};



// Exports AllAssets for usability
export default AllAssets;

