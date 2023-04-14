import { useContext, useEffect, useState, useMemo } from 'react';
import { Context } from '../App';
import { useTable } from 'react-table';

const MP = () => {
  const { listUrl } = useContext(Context);
  const [listData, setListData] = useState([]);

  const data = useMemo(() => listData, [listData]);
  const columns = useMemo(() => [
    { Header: 'Site Location', accessor: 'SiteLocation' },
    { Header: 'Threat (Equipment)', accessor: 'Threat', },
    { Header: 'Squadron', accessor: 'Squadron' },
    { Header: 'Start Time', accessor: 'EventDate' },
    { Header: 'End Time', accessor: 'EndDate' },
    { Header: 'Status', accessor: 'Status' },
  ],[])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results);
        setListData(data.d.results);
      });
  }, []);

  return (
    <div className="m-4 p-2 flex justify-center bg-gunmetal rounded">
      <table 
      className='min-w-full divide-y-2 divide-pink  text-center tracking-wider'
      {...getTableProps()}>
        <thead
        className='text-blue'>
          {headerGroups.map((headerGroup)=> (
            <tr{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column)=>(
                <th 
                className='px-4 py-2 text-sm uppercase'
                {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody 
        className='text-text font-semibold'
        {...getTableBodyProps()}>
          {rows.map((row)=> {
            prepareRow(row)
            return (
              <tr 
              className='odd:bg-blue/50 even:bg-blue/100'
              {...row.getRowProps()}>
                {row.cells.map((cell)=>(
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MP;
