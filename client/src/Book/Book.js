import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import Table from "./Table";

const MyBook = () => {
    const [reservations, setReservations] = useState([]);
    const [localData, setLocalDate] = useState([])
    const [sliced, setSliced] = useState([]);
    useEffect(() => {
        fetch(
            "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
            { credentials: 'include', })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data.d.results);
                setReservations(data.d.results);
                setLocalDate(data.d.results.filter((item) => {
                    return DateTime.fromISO(item.EventDate).toLocal().toFormat('yyyy MMM dd') === '2023 Apr 17'
                }))
                setSliced(() => {
                    if (localData.length <= 4) return null
        const slicedArr = [];
        let index = 0;
        while(index < localData.length) {
            slicedArr.push(localData.slice(index, index + 4));
            index += 4
        }
        return slicedArr
                })
            });
    }, [sliced]);
    const sliceData = () => {
        if (localData.length <= 4) return localData
        const slicedArr = [];
        let index = 0;
        while(index < localData.length) {
            slicedArr.push(localData.slice(index, index + 4));
            index += 4
        }
        return slicedArr
    }
    const headers = [
        { name: 'Site Location' },
        { name: 'Threat (Equipment)' },
        { name: 'Squadron' },
        { name: 'Start Date' },
        { name: 'Status' },
    ];

    return (
        <><div>this is some text</div>
        {console.log('sliced', sliced)}
            <HTMLFlipBook width={550}
                height={500}
                size="stretch"
                minWidth={315}
                maxWidth={700}
                minHeight={400}
                maxHeight={1000}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}>
                {sliced.map(item => {
                    if(item.length > 1) {
                        item.map(itemm => {
                            return (
                                <div>
                                <table>
                                    <thead>
                                        <tr>
                                            {headers.map((header, i) => (
                                                <th
                                                    key={i}
                                                    className="p-10 mt-7 text-center text-xs font-medium uppercase tracking-wider"
                                                >
                                                    {header.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                                <tr className="mt-10">
                                                    <td className="text-center text-m p-3">
                                                        {itemm.SiteLocation}
                                                    </td>
                                                    <td className="text-center text-m">
                                                        {itemm.Threat}({itemm.Equipment})
                                                    </td>
                                                    <td className="text-center text-m">
                                                        {itemm.Squadron}
                                                    </td>
                                                    <td className="text-center text-m">
                                                        {DateTime.fromISO(itemm.EventDate).toLocal().toFormat('HH mm')}
                                                    </td>
                                                    <td className="text-center text-m">
                                                        {itemm.Status}
                                                    </td>
                                                </tr>
                                    </tbody>
                                </table>
                                </div>
                            ) 
                        })
                    } else return (<div>hi</div>)})}
                {/* <div>hi</div>
                <div>hello</div> */}
        
            </HTMLFlipBook>
        </>
    );
    //sdlfkssdsdfdgffdssdfsdffjs
}

export default MyBook