import { set } from 'ol/transform';
import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table';

function Table({ data, columns, selected, setSelected, SubRowComponent }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelected(selectedItems.map(data => data.original));
  }, [selectedItems]);

  const toggleRowSelection = (row) => {
    if (checked.includes(row.id)) {
      setChecked(checked.filter((value) => value !== row.id));
      setSelectedItems(selectedItems.filter((value) => value.id !== row.id));
    } else {
      setChecked([...checked, row.id]);
      setSelectedItems([
        ...selectedItems,
        { id: row.id, original: row.original },
      ]);
    }
  };

  const toggleRowExpansion = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((value) => value !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const toggleSelectAll = () => {

    if (selectAll) {
      setChecked([]);
      setSelectedItems([])
      setSelectAll(false);
    } else {
      setChecked([...rows.map((row) => row.id)]);
      setSelectedItems([...rows.map((row) => {
        return { id: row.id, original: row.original }
      })])
      setSelectAll(true);
    }

    console.log("checked", checked);
  };

  const selectionColumn = useMemo(
    () => ({
      Header: () => (
        <div>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
            id="select-all-checkbox"
          />
          <label htmlFor="select-all-checkbox" />
        </div>
      ),
      id: 'selection',
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            checked={checked.includes(row.id)}
            onChange={() => toggleRowSelection(row)}
            id={`row-${row.id}-checkbox`}
          />
          <label htmlFor={`row-${row.id}-checkbox`} />
        </div>
      ),
    }),
    [data, checked, selectAll]
  );

  const expansionColumn = useMemo(
    () => ({
      Header: '',
      id: 'expansion',
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <div>
          {row.canExpand ? (
            <button onClick={() => toggleRowExpansion(row.id)}>
              {expandedRows.includes(row.id) ? 'Hide' : 'Show'}
            </button>
          ) : null}
        </div>
      ),
    }),
    [expandedRows]
  );

  const tableColumns = useMemo(
    () => [selectionColumn, ...columns, expansionColumn],
    [columns, expansionColumn, selectionColumn]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: tableColumns,
        data,
      },
      useExpanded
    );

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
            <Fragment key={row.getRowProps().key}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td colSpan={tableColumns.length + 1}>
                    <SubRowComponent data={row.original} />
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
