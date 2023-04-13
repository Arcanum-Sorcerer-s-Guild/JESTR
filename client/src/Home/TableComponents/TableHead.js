import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {

  const [ sortField, setSortField ] = useState("")
  const [ sortOrder, setSortOrder ] = useState("asc")

  const handleSortingChange = (accessor) => {
    let sorting = accessor === sortField && sortOrder === "asc" ? "desc" : "asc";
    
    setSortField(accessor);
    setSortOrder(sorting);

    handleSorting(accessor, sorting);

  }

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          return (
            <th 
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null} 
            >
              {label}
            </th>
          )
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
