import { createContext, useContext, useEffect, useState } from 'react';
import { Context } from '../../App';

import TableBody from './TableBody';
import TableHead from './TableHead';

export const tableContext = createContext();

const Table = () => {
  const { listUrl } = useContext(Context);
  const [tableData, setTableData] = useState([]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField]
            .toString()
            .localeCompare(b[sortField].toString(), 'en', { numeric: true }) *
          (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results);
        setTableData(data.d.results);
      });
  }, []);

  const columns = [
    { label: 'Site Location', accessor: 'SiteLocation', sortable: true },
    { label: 'Threat (Equipment', accessor: 'Threat', sortable: true },
    { label: 'Squadron', accessor: 'Squadron', sortable: true },
    { label: 'Start Time', accessor: 'EventDate', sortable: true },
    { label: 'End Time', accessor: 'EndDate', sortable: true },
    { label: 'Status', accessor: 'Status', sortable: true },
  ];



  return (
    <tableContext.Provider value={{ tableData, setTableData }}>
      <table className="table">
        <caption>{Date()}</caption>
        <TableHead {...{columns, handleSorting}} />
        <TableBody columns={columns} />
      </table>
    </tableContext.Provider>
  );
};

export default Table;
