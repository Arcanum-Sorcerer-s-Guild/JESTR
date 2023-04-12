import React, { useState, useEffect } from 'react';
import { Context } from '../App';

const AllAssets = () => {
  const { userData, setUserdata } = React.useContext(Context);

  const [currItems, setCurrItems] = useState([]);

  async function updateInventory() {
    // Retrieves all database items
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((items) => setCurrItems(items.d.results));
  }

  function convertDDtoDMS(coord) {
    return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(Math.abs(coord)%1*60)}'${((Math.abs(coord)%1*60)%1*60).toFixed(2)}"`;
  }

  function formatLatLong(lat, long) {
    return `${lat<0 ? "S": "N"}${convertDDtoDMS(lat)}, ${long<0 ? "W": "E"}${convertDDtoDMS(long)}`;
  }

  useEffect(() => {
    // Gets all items from the database
    updateInventory();
  }, []);


  return (
    <>
      {console.log(currItems)}
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
    </>
  );
};

export default AllAssets;

