// Get needed dependencies only
import React, { useState, useEffect } from 'react';



// Provides table header functionality for the table of all assets
const TableHead = ({ columns, handleSorting }) => {

  // Tracks the sort order and field to sort by
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  // Helper function to change the sorting information
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  // Provides functionality to the table headers for all assets
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          return <th key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null} className="">
              {label}
              {sortable
                ? sortField === accessor && order === "asc"
                  ? <img src="../../images/up_arrow.png" alt="up" className="flex"/>
                  : sortField === accessor && order === "desc"
                  ? <img src="../../images/down_arrow.png" alt="down" className="flex"/>
                  : <img src="../../images/default.png" alt="default" className="flex"/>
                : ""}
            </th>;
        })}
      </tr>
    </thead>
  );
};



// Exports TableHead for local usability
export default TableHead;

