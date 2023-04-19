// import TableHeader from "../AllReservations/TableHeader";
// import React, { useState, useEffect } from 'react'
// import { DateTime } from "luxon";

// const Table = ({rows}) => {
//     console.log('im in table page', rows)
//     // const [reservations, setReservations] = useState([]);
//     // const [localData, setLocalDate] = useState([])
//     // useEffect(() => {
//     //     fetch(
//     //         "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
//     //         { credentials: 'include', })
//     //         .then((response) => response.json())
//     //         .then((data) => {
//     //             console.log('data', data.d.results);
//     //             setReservations(data.d.results);
//     //             setLocalDate(data.d.results.filter((item) => {
//     //                 return DateTime.fromISO(item.EventDate).toLocal().toFormat('yyyy MMM dd') === '2023 Apr 17'
//     //             }))
//     //             console.log('rendered')
//     //             console.log('helloooo', DateTime.fromISO(data.d.results[0].EventDate).toLocal().toFormat('yyyy MMM dd'))
//     //         });
//     // }, []);
//     const headers = [
//         { name: 'Site Location' },
//         { name: 'Threat (Equipment)' },
//         { name: 'Squadron' },
//         { name: 'Start Date' },
//         { name: 'Status' },
//     ];
//     // const table = (start, stop) => {
//     //     (<table>
//     //         <thead>
//     //             <tr>
//     //                 {headers.map((header, i) => (
//     //                     <th
//     //                         key={i}
//     //                         className="p-10 mt-7 text-center text-xs font-medium uppercase tracking-wider"
//     //                     >
//     //                         {header.name}
//     //                     </th>
//     //                 ))}
//     //             </tr>
//     //         </thead>
//     //         <tbody>
//     //             {localData.slice(start, stop).map((list, i) => {
//     //                 return (
//     //                     <tr key={i} className="mt-10">
//     //                         <td className="text-center text-m p-3">
//     //                             {list.SiteLocation}
//     //                         </td>
//     //                         <td className="text-center text-m">
//     //                             {list.Threat}({list.Equipment})
//     //                         </td>
//     //                         <td className="text-center text-m">
//     //                             {list.Squadron}
//     //                         </td>
//     //                         <td className="text-center text-m">
//     //                             {DateTime.fromISO(list.EventDate).toLocal().toFormat('HH mm')}
//     //                         </td>
//     //                         <td className="text-center text-m">
//     //                             {list.Status}
//     //                         </td>
//     //                     </tr>
//     //                 )
//     //             })}
//     //         </tbody>
//     //     </table>)
//     // }
//     // const splitData = () => {
//     //     if (localData.lengh > 4) {
//     //         return localData.slice(0, 4)
//     //     }
//     // }
//     return (
//         <div>
//         <table>
//             <thead>
//                 <tr>
//                     {headers.map((header, i) => (
//                         <th
//                             key={i}
//                             className="p-10 mt-7 text-center text-xs font-medium uppercase tracking-wider"
//                         >
//                             {header.name}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {rows.item.map((list, i) => {
//                     return (
//                         <tr key={i} className="mt-10">
//                             <td className="text-center text-m p-3">
//                                 {list.SiteLocation}
//                             </td>
//                             <td className="text-center text-m">
//                                 {list.Threat}({list.Equipment})
//                             </td>
//                             <td className="text-center text-m">
//                                 {list.Squadron}
//                             </td>
//                             <td className="text-center text-m">
//                                 {DateTime.fromISO(list.EventDate).toLocal().toFormat('HH mm')}
//                             </td>
//                             <td className="text-center text-m">
//                                 {list.Status}
//                             </td>
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </table>
//         </div>
//     );
// }

// export default Table;