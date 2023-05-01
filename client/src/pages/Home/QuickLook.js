import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../App';
import { listFetch } from '../../utils/api/endPoints.js';
//icons
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const QuickLook = () => {
  const [lists, setLists] = useState([]);
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
    listFetch('Reservations', (data) => {
      console.log(data.d.results);
      setListData(data.d.results);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className>
        <div className="mt-2">
          <div className="mt-2 flex flex-col">
            <div className="my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-lg overflow-hidden border-b sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-light/100">
                    <thead className="bg-gray-light/50 text-gray/100">
                      <tr>
                        {headers.map((header, i) => (
                          <th
                            key={i}
                            className="px-6 py-2 text-center text-xs font-medium uppercase tracking-wider"
                          >
                            {header.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-text divide-y divide-y-gray/75">
                      {lists.map((list, i) => (
                        <tr key={i}>
                          <td className="text-left text-xs">
                            {list.SiteLocation}
                          </td>
                          <td className="flex gap-2 text-left text-xs">
                            {list.Threat}({list.Equipment})
                          </td>
                          <td className="text-left text-xs">{list.Squadron}</td>
                          <td className="text-left text-xs">
                            {list.EventDate}
                          </td>
                          <td className="text-left text-xs">{list.EndDate}</td>
                          <td className="text-left text-xs">{list.Status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLook;
