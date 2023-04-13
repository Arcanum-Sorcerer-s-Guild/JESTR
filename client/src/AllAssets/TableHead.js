
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

export default TableHead;

