import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';

const MyBook = () => {
  const [reservations, setReservations] = useState([]);
  const [localData, setLocalData] = useState([[{ hello: 'hello' }]]);
  const [localData2, setLocalData2] = useState([]);
  const [currentDate, setCurrentDate] = useState(DateTime.now().toFormat('yyyy MMM dd'));
  const [currentPage, setCurrentPage] = useState(1)
  const sliceData = (arr) => {
    if (arr.length <= 10) return arr;
    const slicedArr = [];
    let index = 0;
    while (index < arr.length) {
      slicedArr.push(arr.slice(index, index + 8));
      index += 8;
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
              DateTime.fromISO(item.EventDate).toLocal().toFormat('yyyy MMM dd')
              === DateTime.now().toFormat('yyyy MMM dd')
            );
          })
        );
        const today = DateTime.local().startOf('day');
        const tomorrow = today.plus({ days: 1 }).startOf('day');
        const noUseMe = sliceData(
          data.d.results.filter((item) => {
            const eventDate = DateTime.fromISO(item.EventDate).toLocal().startOf('day');
            return eventDate >= today && eventDate <= tomorrow;
          }).sort((a, b) => {
            const dateA = DateTime.fromISO(a.EventDate).toLocal();
            const dateB = DateTime.fromISO(b.EventDate).toLocal();
            if (dateA < dateB) {
              return -1;
            }
            if (dateA > dateB) {
              return 1;
            }
            return 0;
          })
        );
        setReservations(sliceData(data.d.results));
        setLocalData(useMe);
        setLocalData2(noUseMe);
      });
  }, []);
  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'Status' },
  ];
  const handlePageChange = (e) => {
    setCurrentPage(book.current.pageFlip().getCurrentPageIndex() + 1);
    if (e.data + 1 === localData.length || e.data === localData.length) {
      setCurrentDate(DateTime.now().plus({ days: 1 }).toFormat('yyyy MMM dd'))
    } else if (e.data + 1 < localData.length) setCurrentDate(DateTime.now().toFormat('yyyy MMM dd'))
  }
  const book = useRef();
  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center px-6">
        <div className="w-full xl:w-full lg:w-12/12 flex flex-col shadow-2xl">
          <div className='h-8 mt-6 rounded-sm text-center'> <span className='font-medium text-text text-lg w-max'>
            Todays date: {currentDate}
          </span></div>
          <div className='flex justify-around h-8 mt-6 rounded-sm'>
            <button className="bg-green top-2 left-64 rounded-md p-1" onClick={() => book.current.pageFlip().flipPrev()}>Previous page</button>
            <span className='font-medium text-text text-lg w-max '>
              Current Page: {currentPage}
            </span>
            <button className="bg-green top-2 right-64 rounded-md p-1 " onClick={() => book.current.pageFlip().flipNext()}>Next page</button>
          </div>
          <HTMLFlipBook
            width={400}
            height={400}
            size="stretch"
            flipType="soft"
            minWidth={315}
            minHeight={400}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            flipOnTouch={false}
            flipOnHover={false}
            useMouseEvents={true}
            usePortrait={false}
            ref={book}
            responsive={false}
            onFlip={handlePageChange}
            className='mt-10 rounded-r-md'
          >
            {localData2.map((item, index) => {
              return (
                <div className='bg-text h-11 border-r border-gray-dark border-2 rounded-md'>
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
                            <td className="text-center text-m p-3 pb-5">
                              {list.SiteLocation}
                            </td>
                            <td className="text-center text-m">
                              {list.Threat}({list.Equipment})
                            </td>
                            <td className="text-center text-m">{list.Squadron}</td>
                            <td className="text-center text-m">
                              {DateTime.fromISO(list.EventDate)
                                .toLocal()
                                .toFormat('yyyy MMM dd')}
                            </td>
                            <td className="text-center text-m">{list.Status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })
            }
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );

};

export default MyBook;
