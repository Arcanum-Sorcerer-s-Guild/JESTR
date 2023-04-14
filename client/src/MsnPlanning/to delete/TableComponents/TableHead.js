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
    <thead className="text-blue">
      <tr className="px-4 py-2 text-sm uppercase">
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
