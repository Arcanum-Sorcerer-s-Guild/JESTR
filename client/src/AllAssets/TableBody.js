
import React, { useState, useEffect } from 'react';

const TableBody = ({ columns }) => {
  const [currAssets, setCurrAssets] = useState([]);

  // On page load, updates the list of all assets
  useEffect(() => {
    updateInventory()
  }, []);

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

  return (
    <tbody>
      {currAssets.map((data) => {
        console.log(data)
        return (
          <tr key={data.id}>
          {columns.map(({ accessor }) => {
            console.log(accessor)
            const tData = data[accessor] ? ((accessor === "Latitude" || accessor === "Longitude") ? convertDDtoDMS(data[accessor]) : data[accessor]) : "——";
            return <td key={accessor}>{tData}</td>;
          })}
        </tr>
      );
    })}
    </tbody>
  );
};



export default TableBody;

