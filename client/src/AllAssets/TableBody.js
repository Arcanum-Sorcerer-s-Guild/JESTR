// Get needed dependencies only
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetsContext } from './AllAssets';



// Provides table body functionality for the table of all assets
const TableBody = ({ columns, navigate }) => {

  // Pulls the current list of total assets
  const { currAssets } = React.useContext(AssetsContext);
  // const navigate = useNavigate();


  // Helper function to convert coordinates from the DD format to the DMS format
  const convertDDtoDMS = (coord) => {
    return `${Math.trunc(Math.abs(coord))}\u00B0${Math.trunc(
      (Math.abs(coord) % 1) * 60
    )}'${((((Math.abs(coord) % 1) * 60) % 1) * 60).toFixed(2)}"`;
  };

  // Provides functionality to the table body for all assets
  return (
    <tbody>
      {currAssets.map((data) => {
        return (
          <tr key={data.id} >
          {columns.map(({ accessor }) => {
            const tData = data[accessor] ? ((accessor === "Latitude" || accessor === "Longitude") ? convertDDtoDMS(data[accessor]) : data[accessor]) : "——";
            return <td key={accessor}>{tData}</td>;
          })}
        </tr>
      );
    })}
    </tbody>
  );
};



// Exports TableBody for local usability
export default TableBody;
