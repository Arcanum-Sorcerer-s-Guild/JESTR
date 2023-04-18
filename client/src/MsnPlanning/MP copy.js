import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../App';

//icons
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const MP = () => {
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
    <div className="m-4 p-2 flex justify-center bg-gunmetal rounded">
      <table className="min-w-full divide-y-2 divide-pink text-center tracking-wider">
        <thead className="text-blue">
          {headers.map((header) => (
            <th
              key={header.accessor}
              className="px-4 py-2 text-sm uppercase"
              onClick={
                header.sortable
                  ? () => handleSortingChange(header.accessor)
                  : null
              }
            >
              <div className="inline-flex">
                <span className="mr-1">{header.label}</span>
                {header.sortable ? (
                  sortField === header.accessor && sortOrder === 'asc' ? (
                    <span>
                      <FaSortUp />
                    </span>
                  ) : sortField === header.accessor && sortOrder === 'desc' ? (
                    <span>
                      <FaSortDown />
                    </span>
                  ) : (
                    <span>
                      <FaSort />
                    </span>
                  )
                ) : (
                  ''
                )}
              </div>
            </th>
          ))}
        </thead>
        <tbody className="text-text font-semibold">
          {listData.map((list, i) => (
            <tr className="odd:bg-blue/50 even:bg-blue/100">
              <td className="text-sm">{list.SiteLocation}</td>
              <td className="text-sm">
                <Link to={'/Asset'}>
                  {' '}
                  {list.Threat} ({list.Equipment})
                </Link>
              </td>
              <td className="text-sm">{list.Squadron}</td>
              <td className="text-sm">{list.EventDate}</td>
              <td className="text-sm">{list.EndDate}</td>
              <td
                className={` ${
                  list.Status === 'Approved'
                    ? 'bg-green/50 text-text'
                    : list.Status === 'Pending'
                    ? 'bg-purple/50 text-text'
                    : list.Status === 'Rejected'
                    ? 'bg-pink/50 text-text'
                    : ''
                }`}
              >
                {list.Status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MP;
