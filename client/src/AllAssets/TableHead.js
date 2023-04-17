// Get needed dependencies only
import React, { useState, useEffect } from 'react';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';


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
          return <th
            key={accessor}
            onClick={sortable ? () => handleSortingChange(accessor) : null}
            className=""
          >
            <div className="inline-flex align-middle">
              <span className="bg-primary">
                {label}
              </span>
              <span className="bg-secondary align-middle justify-center">
                {sortable
                  ? sortField === accessor && order === "asc"
                    ? <FaSortUp/>
                    : sortField === accessor && order === "desc"
                      ? <FaSortDown/>
                      : <FaSort/>
                  : ""
                }
              </span>
            </div>
          </th>;
        })}
      </tr>
    </thead>
  );
};



// Exports TableHead for local usability
export default TableHead;

