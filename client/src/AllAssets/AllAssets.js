// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { Context } from '../App';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
// export const LocalContext = React.createContext();


// Provides functionality for all assets
const AllAssets = () => {

  // Tracks user info, current total items, and displayed asset info
  const { userData, setUserdata } = React.useContext(Context);
  const [currAssets, setCurrAssets] = useState([]);
  const [sortField, setSortField] = useState("");
  const columns = [
    { name: 'Site Location', accessor: "SiteLocation" },
    { name: 'Range', accessor: "Range" },
    { name: 'Latitude', accessor: "Latitude" },
    { name: 'Longitude', accessor: "Longitude" },
    { name: 'Elevation', accessor: "Elevation" },
    { name: 'Serial', accessor: "Serial" },
    { name: 'Threat', accessor: "Threat" },
    { name: 'Equipment', accessor: "Equipment" }
  ];

  // Helper function to update the list of all assets
  const updateInventory = async () => {
    // Retrieves all database assets
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((items) => setCurrAssets(items.d.results));
  }

  // Helper function to convert coordinates from the DD format to the DMS format
  const convertDDtoDMS = (coord) => {
    return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(Math.abs(coord)%1*60)}'${((Math.abs(coord)%1*60)%1*60).toFixed(2)}"`;
  }

  // Helper function to display both latitude and longitude in a
  const formatLatLong = (lat, long) => {
    return `${lat<0 ? "S": "N"}${convertDDtoDMS(lat)}, ${long<0 ? "W": "E"}${convertDDtoDMS(long)}`;
  }

  // Helper function to display all assets in a sorted order
  const handleSortingChange = (column) => {
    console.log(column)
    setSortField(column)
    console.log(sortField)
    console.log(currAssets[0])

    // if (sortField === columnHeaders[0].name)
    //   [...userData].sort((a,b) => a.SiteLocation < b.SiteLocation ? -1 : 1)
    // if (sortField === columnHeaders[1].name)
    //   [...userData].sort((a,b) => a.Range < b.Range ? -1 : 1)
    // if (sortField === columnHeaders[4].name)
    //   [...userData].sort((a,b) => a.Elevation < b.Elevation ? -1 : 1)
    // if (sortField === columnHeaders[5].name)
    //   [...userData].sort((a,b) => a.Serial < b.Serial ? -1 : 1)
    // if (sortField === columnHeaders[6].name)
    //   [...userData].sort((a,b) => a.Threat < b.Threat ? -1 : 1)
    // let data1 = [...userData].sort((a,b) => {
    //   if(a.column < b.column)
    // })

  }

  // On page load, updates the list of all assets
  useEffect(() => {
    updateInventory();
  }, []);

  // updateInventory()

  // Formats the list of all assets
  return (
    <div className="max-w-6xl mx-auto">
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
                    <TableHead columns={columns}/>
                    <TableBody columns={columns}/>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


// tableData={currAssets}



  );
};



// Exports AllAssets for usability
export default AllAssets;

