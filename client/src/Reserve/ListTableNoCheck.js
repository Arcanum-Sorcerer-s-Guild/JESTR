import { set } from 'ol/transform';
import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table';

function ListTableNoCheck({
  data,
  columns,
  selected,
  setSelected,
  SubRowComponent,
}) {
  const tableColumns = useMemo(() => [...columns], [columns]);

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
              <th className="p-8" {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
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
                  <td className="p-2" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
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
export default ListTableNoCheck;
