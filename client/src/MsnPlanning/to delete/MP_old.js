import { createContext,useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import Table from './Table';

//dependencies packages
import DateObject from 'react-date-object';

//icons
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const listContext = createContext();

const MP = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);

  //Table Construction
  const columns = [
    { label: 'Site Location', accessor: 'SiteLocation', sortable: true },
    { label: 'Threat (Equipment', accessor: 'Threat', sortable: true },
    { label: 'Squadron', accessor: 'Squadron', sortable: true },
    { label: 'Start Time', accessor: 'EventDate', sortable: true },
    { label: 'End Time', accessor: 'EndDate', sortable: true },
    { label: 'Status', accessor: 'Status', sortable: true },
  ];

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.d.results);
        setLists(data.d.results);
      });
  }, []);

  return (
    <>
      <div className="table_container">
        <h1>Sortable Table</h1>
        <Table />
      </div>
    </>
  );
};

export default MP;


      {/* <div className="text-text p-2 text-center bg-tertiary">
        <input type="text" placeholder="Search..." />
      </div>
      <div>
        <div className="flex gap-6">
          <div className="today p-8 bg-purple">
            <div className="text-text text-center bg-pink/50">{Date()}</div>
            <table className="text-text bg-blue text-left">
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th key={i}>
                      <div className="inline-flex">
                        <span className="mr-1">{header.name}</span>
                        <span
                          className="mt-2"
                          onClick={() => handleOrderChange()}
                        >
                          {header.isSorted ? (
                            header.isSorted === 'asc' ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lists.map((list, i) => {
                  let EventDate = new DateObject(list.EventDate).format(
                    'HH:MM'
                  );
                  let EndDate = new DateObject(list.EndDate).format('HH:MM');

                  return (
                    <tr key={i}>
                      <td>{list.SiteLocation}</td>
                      <td>
                        <Link to={'/Asset'}>
                          {' '}
                          {list.Threat} ({list.Equipment})
                        </Link>
                      </td>
                      <td>{list.Squadron}</td>
                      <td>{EventDate}z</td>
                      <td>{EndDate}z</td>
                      <td>
                        <span
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
      </div> */}