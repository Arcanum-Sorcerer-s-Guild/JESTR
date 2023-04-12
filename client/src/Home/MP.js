import { useContext, useEffect, useState } from "react";
import { Context } from '../App'

const MP = () => {
    const { listUrl } = useContext(Context);
    const [ lists, setLists ] = useState([])

  const headers = [
    { name: 'Site Location' },
    { name: 'Equipment' },
    { name: 'Threat' },
    { name: 'Start Date' },
    { name: 'End Date' },
    { name: 'Status' },
  ];

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.d.results[0].AuthorId);
            setLists(data.d.results)

        })
  },[])

  console.log("lists", lists);

  return (
    <>
      <div className="m-4 p-5 rounded-md shadow-md bg-primary">
        <div className="inline-flex justify-between">
          <h3 className="font-semibold">MP board</h3>
        </div>
      </div>
      <div className="m-4 p-5 bg-secondary">
        <table className="min-w-full">
          <thead className="bg-text">
            <tr>
              {headers.map((header, i) => (
                <th 
                    key={i} 
                    className=""
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-text divide-y divide-y-gray/75">
            {lists.map((list, i) => (
              <tr key={i}>
                <td
                  className="text-left text-xs"
                >
                  {list.SiteLocation}
                </td>
                <td
                  className="text-left text-xs"
                >
                  {list.Equipment}
                </td>
                <td
                  className="text-left text-xs"
                >
                  {list.Threat}
                </td>
                <td
                  className="text-left text-xs"
                >
                  {list.EventDate}
                </td>
                <td
                  className="text-left text-xs"
                >
                  {list.EndDate}
                </td>
                <td
                  className="text-left text-xs"
                >
                  {list.Status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MP;
