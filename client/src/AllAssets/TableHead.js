
import React, { useState, useEffect } from 'react';
import { AssetsContext } from './AllAssets';

const TableHead = ({ columns, handleSorting }) => {
  const { currAssets, setCurrAssets } = React.useContext(AssetsContext);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  // On page load, updates the list of all assets
  useEffect(() => {
    handleSortingChange("SiteLocation");
  }, []);

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
          ? sortField === accessor && order === "asc"
            ? "up"
            : sortField === accessor && order === "desc"
            ? "down"
            : "default"
          : "";
          return <th key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null} className={cl}>{label}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;