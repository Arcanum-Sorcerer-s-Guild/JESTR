import { set } from 'ol/transform';
import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table';
import '../AllReservations/allres.css';

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
    <div className="tableFixHead w-12/12 max-h-full shadow-md rounded">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="text-gray-light uppercase text-xs leading-normal"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  className="res-th py-2 px-6 text-left bg-purple"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className="text-gray-light text-xs font-light m-0"
          {...getTableBodyProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr
                  key={i}
                  className="border-b border-gray-dark hover:bg-black/30"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td className="py-2 px-6 text-left text-purple whitespace-nowrap" 
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td 
                    colSpan={tableColumns.length + 1}>
                      <SubRowComponent data={row.original} />
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListTableNoCheck;
