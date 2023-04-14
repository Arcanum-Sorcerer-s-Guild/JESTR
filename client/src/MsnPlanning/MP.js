import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../App';
import { useTable } from 'react-table';

const MP = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState();

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results);
        setLists(data.d.results);
      });
  }, []);

  const listData = useMemo(() => lists, []);
  const columns = [
      { Header: 'Site Location', accessor: 'SiteLocation' },
      { Header: 'Threat (Equipment)', accessor: 'Threat' },
      { Header: 'Squadron', accessor: 'Squadron' },
      { Header: 'Start Time', accessor: 'EventDate' },
      { Header: 'End Time', accessor: 'EndDate' },
      { Header: 'Status', accessor: 'Status' },
    ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, listData });

  return (
    <div className="container">
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render(cell)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MP;
