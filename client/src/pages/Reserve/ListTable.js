import { set } from 'ol/transform';
import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table';

function Table({ data, columns, selected, setSelected, SubRowComponent }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelected(selectedItems.map((data) => data.original));
  }, [selectedItems]);

  const toggleRowSelection = (row) => {
    if (checked.includes(row.original.serial)) {
      setChecked(checked.filter((value) => value !== row.original.serial));
      setSelectedItems(
        selectedItems.filter((value) => value.id !== row.original.serial)
      );
    } else {
      setChecked([...checked, row.original.serial]);
      setSelectedItems([
        ...selectedItems,
        { id: row.original.serial, original: row.original },
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
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setChecked([...rows.map((row) => row.original.serial)]);
      setSelectedItems([
        ...rows.map((row) => {
          return { id: row.original.serial, original: row.original };
        }),
      ]);
      setSelectAll(true);
    }

    console.log('checked', checked);
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
          <InputLablel htmlFor="select-all-checkbox" />
        </div>
      ),
      id: 'selection',
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            checked={checked.includes(row.original.serial)}
            onChange={() => toggleRowSelection(row)}
            id={`row-${row.original.serial}-checkbox`}
          />
          <InputLablel htmlFor={`row-${row.original.serial}-checkbox`} />
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
            <button onClick={() => toggleRowExpansion(row.original.serial)}>
              {expandedRows.includes(row.original.serial) ? 'Hide' : 'Show'}
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
