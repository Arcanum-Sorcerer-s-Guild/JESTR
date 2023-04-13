import React, { Fragment, useState } from 'react';
import { useTable, useExpanded } from 'react-table';

function ListTable({ data, columns, selected, setSelected }) {
  console.log(data)
  const [expandedRows, setExpandedRows] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      data,
      columns,
      initialState: { expanded: expandedRows },
      // Define a function to handle row selection
      getRowProps: (row) => ({
        onClick: () => {
          setSelected([...selected, row.original]);
        },
      }),
    },
    useExpanded // Use the useExpanded hook to enable expanded rows
  );

  // Define a function to handle expanding/collapsing rows
  const handleRowExpansion = (row) => {
    const isExpanded = expanded.includes(row.Id);
    setExpandedRows(
      isExpanded
        ? expanded.filter((Id) => Id !== row.Id)
        : [...expandedRows, row.Id]
    );
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Fragment>
              <tr {...row.getRowProps()}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(row.original)}
                    onChange={() =>
                      setSelected((prevSelected) =>
                        prevSelected.filter(
                          (item) => item !== row.original
                        )
                      )
                    }
                  />
                </td>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
              {/* Render an expanded row for this row if it is expanded */}
              {row.isExpanded && (
                <tr>
                  <td colSpan={columns.length} onClick={() => handleRowExpansion(row)}>
                    {row.original.Status}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default ListTable;
