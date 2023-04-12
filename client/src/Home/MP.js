import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';

//icons
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const MP = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);

  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'End Date' },
    { name: 'Status' },
  ];

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results[0].AuthorId);
        setLists(data.d.results);
      });
  }, []);

  console.log('lists', lists);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-4 p-2 rounded-md shadow-md bg-purple text-text text-center">
        <h3 className="font-semibold">MP board</h3>
      </div>
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
                        <span>
                          {header.isSorted ? (
                            header.isSortedDesc ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-text divide-y divide-gray-light/100 text-semibold">
                  {lists.map((list, i) => (
                    <tr
                      key={i}
                      className="even:bg-secondary/50 odd:bg-tertiary/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {list.SiteLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {list.Threat} ({list.Equipment})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {list.Squadron}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {list.EventDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {list.EndDate}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
                          list.Status === 'Approved' ? 'bg-green text-text' :
                          list.Status === 'Pending' ? 'bg-blue text-text' :
                          list.Status === 'Rejected' ? 'bg-orange text-text' :
                          ''
                        }`}
                      >
                        {list.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MP;
