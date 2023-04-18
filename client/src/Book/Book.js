import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const MyBook = () => {
  const [reservations, setReservations] = useState([]);
  const [localData, setLocalDate] = useState([]);
  const [sliced, setSliced] = useState([[{}]]);
  const sliceData = (arr) => {
    if (arr.length <= 4) return arr;
    const slicedArr = [];
    let index = 0;
    while (index < arr.length) {
      slicedArr.push(arr.slice(index, index + 4));
      index += 4;
    }
    return slicedArr;
  };
  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      { credentials: 'include' }
    )
      .then((response) => response.json())
      .then((data) => {
        const useMe = sliceData(
          data.d.results.filter((item) => {
            return (
                DateTime.fromISO(item.EventDate).toLocal().toISODate()
                === DateTime.now().toISODate()
            );
          })
        );
        setReservations(data.d.results);
        setLocalDate(
          data.d.results.filter((item) => {
            return (
                DateTime.fromISO(item.EventDate).toLocal().toISODate()
                 === DateTime.now().toISODate()
            );
          })
        );
        setSliced(useMe);
      });
  }, []);
  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'Status' },
  ];
  return (
    <>
      <div>this is some text</div>
      <HTMLFlipBook
        width={550}
        height={500}
        size="stretch"
        minWidth={315}
        minHeight={400}
        maxHeight={700}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        // ref={(component) => (this.pageFlip = component)}
      >
    
        {sliced.map((item) => {
          return (
            <div className='bg-blue'>
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
                  {item.map((list, i) => {
                    return (
                      <tr key={i} className="mt-10">
                        <td className="text-center text-m p-3">
                          {list.SiteLocation}
                        </td>
                        <td className="text-center text-m">
                          {list.Threat}({list.Equipment})
                        </td>
                        <td className="text-center text-m">{list.Squadron}</td>
                        <td className="text-center text-m">
                          {DateTime.fromISO(list.EventDate)
                            .toLocal()
                            .toFormat('HH mm')}
                        </td>
                        <td className="text-center text-m">{list.Status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </HTMLFlipBook>
      <button onClick={() => {
        console.log('clicked')
        document.elementFromPoint(50, 50).click()}}>next page</button>

    </>
  );
  //sdlfkssdsdfdgffdssdfsdffjs
};

export default MyBook;
