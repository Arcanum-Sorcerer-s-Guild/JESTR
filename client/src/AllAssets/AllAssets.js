// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { Context } from '../App';



// Provides functionality for all assets
const AllAssets = () => {

  // Tracks user info, current total items, and displayed asset info
  const { userData, setUserdata } = React.useContext(Context);
  const [currAssets, setCurrAssets] = useState([]);
  const columnHeaders = [
    { name: 'Site Location' },
    { name: 'Range' },
    { name: 'Coordinates' },
    { name: 'Bullseye' },
    { name: 'Elevation' },
    { name: 'Serial' },
    { name: 'Threat (Equipment)' }
  ];

  // Helper function to update the list of all assets
  async function updateInventory() {
    // Retrieves all database assets
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((items) => setCurrAssets(items.d.results));
  }

  // Helper function to convert coordinates from the DD format to the DMS format
  function convertDDtoDMS(coord) {
    return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(Math.abs(coord)%1*60)}'${((Math.abs(coord)%1*60)%1*60).toFixed(2)}"`;
  }

  // Helper function to display both latitude and longitude in a
  function formatLatLong(lat, long) {
    return `${lat<0 ? "S": "N"}${convertDDtoDMS(lat)}, ${long<0 ? "W": "E"}${convertDDtoDMS(long)}`;
  }

  // On page load, updates the list of all assets
  useEffect(() => {
    updateInventory();
  }, []);

  // Formats the list of all assets
  return (
    <div>
      {console.log(userData)}
      <h1>AllAssets</h1>
      {userData.IsApprover ?
        <button type="button">Add Asset</button> :
        <div></div>
      }
      <div>
        {currAssets.map((asset) => {
          return (
            <div key={asset.Id}>
              <div>Site Location: {asset.SiteLocation}</div>
              <div>Range: {asset.Range}</div>
              <div>Coordinates: {formatLatLong(asset.Latitude, asset.Longitude)}</div>
              <div>Bullseye: {asset.Range}</div>
              <div>Elevation: {asset.Elevation}</div>
              <div>Serial: {asset.Serial}</div>
              <div>Threat (Equipment): {asset.Equipment} ({asset.Threat})</div>
              <br/>
            </div>
          );
        })}
      </div>
    </div>
  );
};



// Exports AllAssets for usability
export default AllAssets;

