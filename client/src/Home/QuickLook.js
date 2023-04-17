import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../App';


//icons
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const QuickLook = () => {
  const { listUrl } = useContext(Context);
  const [listData, setListData] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const headers = [
    { label: 'Site Location', accessor: 'SiteLocation', sortable: true },
    { label: 'Threat (Equipment)', accessor: 'Threat', sortable: true },
    { label: 'Squadron', accessor: 'Squadron', sortable: true },
    { label: 'Start Time', accessor: 'EventDate', sortable: true },
    { label: 'End Time', accessor: 'EndDate', sortable: true },
    { label: 'Status', accessor: 'Status', sortable: true },
  ];

  const handleSortingChange = (accessor) => {
    let sorting =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';

    setSortField(accessor);
    setSortOrder(sorting);

    handleSorting(accessor, sorting);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...listData].sort((a, b) => {
        return (
          a[sortField]
            .toString()
            .localeCompare(b[sortField].toString(), 'en', { numeric: true }) *
          (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setListData(sorted);
    }
  };

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
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

    </div>
  );
};

export default QuickLook;
