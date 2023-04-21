import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';

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
    fetch(`${listUrl}/GetByTitle('Reservations')/items`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results[0].AuthorId);
        setLists(data.d.results);
      });
  }, []);

  // console.log('lists', lists);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-4 p-2 rounded-md shadow-md bg-purple text-text text-center">
        <h3 className="font-semibold">MP board</h3>
      </div>
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

export default MP;
