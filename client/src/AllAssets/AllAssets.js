// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { Context } from '../App';



// Provides functionality for all assets
const AllAssets = () => {

  // Tracks user info and current total items
  const { userData, setUserdata } = React.useContext(Context);
  const [currItems, setCurrItems] = useState([]);

  // Helper function to update the list of all assets
  async function updateInventory() {
    // Retrieves all database assets
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((items) => setCurrItems(items.d.results));
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
    // Gets all items from the database
    updateInventory();
  }, []);

  // Formats the list of all assets
  return (
    <div>
      <h1>AllAssets</h1>
      <div>
        {currItems.map((item) => {
          return (
            <div>
              <div>Site Name: {item.SiteLocation}</div>
              <div>Range: {item.Range}</div>
              <div>Lat,Lon: {formatLatLong(item.Latitude, item.Longitude)}</div>
              <div>Bullseye: {item.Range}</div>
              <div>Elevation: {item.Elevation}</div>
              <div>Serial: {item.Serial}</div>
              <div>Equipment/Threat: {item.Equipment} / {item.Threat}</div>
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

