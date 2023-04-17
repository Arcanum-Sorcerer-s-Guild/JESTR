// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';
import { AssetsContext } from './AllAssets';


// Provides table header functionality for the table of all assets
const TableHead = ({ columns, handleSorting }) => {
  const { currAssets, setCurrAssets } = React.useContext(AssetsContext);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  // Helper function to change the sorting information
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  // Provides functionality to the table headers for all assets
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
              ? 'down'
              : 'default'
            : '';
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={cl}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};



// Exports TableHead for local usability
export default TableHead;
