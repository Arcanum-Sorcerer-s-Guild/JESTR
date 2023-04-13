
import React, { useState, useEffect } from 'react';
import { AssetsContext } from './AllAssets';

const TableBody = ({ columns }) => {
  const { currAssets, setCurrAssets } = React.useContext(AssetsContext);


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

