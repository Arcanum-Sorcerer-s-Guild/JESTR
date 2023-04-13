import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';

//dependencies packages
import DateObject from 'react-date-object';

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
        console.log(data.d.results);
        const filtered = data.d.results.filter((event) => {
          return (
            event.EventDate >= '2023-03-07' && event.EventDate <= '2023-03-08'
          );
        });
        setLists(filtered);
      });
  }, []);

  return (
    <>
      <div className="text-text p-2 text-center bg-tertiary">
        <input type="text" placeholder="Search..." />
      </div>
      <div>
        <div className="flex gap-6">
          <div className="today">
            <div className="text-text text-center bg-pink/50">{Date()}</div>
            <table className="text-text bg-blue text-left">
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th key={i}>
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
              <tbody>
                {lists.map((list, i) => {
                  let EventDate = new DateObject(list.EventDate).format(
                    'YYYY-MM-DD HH:MM'
                  );
                  let EndDate = new DateObject(list.EndDate).format('HH:MM');

                  return (
                    <tr key={i}>
                      <td>{list.SiteLocation}</td>
                      <td>
                        {list.Threat} ({list.Equipment})
                      </td>
                      <td>{list.Squadron}</td>
                      <td>{EventDate}z</td>
                      <td>{EndDate}z</td>
                      <td>
                        <span
                          className={`${
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
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-text">tomorrow</div>
        </div>
      </div>
    </>
  );
};

export default MP;
