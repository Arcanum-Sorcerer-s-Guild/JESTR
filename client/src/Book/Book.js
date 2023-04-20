import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import './book.css';
import Marquee from 'react-fast-marquee';

//icons
import {
  CgArrowsExpandDownLeft,
  CgArrowsExpandDownRight,
} from 'react-icons/cg';

const MyBook = () => {
  const [reservations, setReservations] = useState([]);
  const [localData, setLocalData] = useState([[{ hello: 'hello' }]]);
  const [localData2, setLocalData2] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    DateTime.now().toFormat('yyyy MMM dd')
  );
  const [currentPage, setCurrentPage] = useState(1);
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
              DateTime.fromISO(item.EventDate)
                .toLocal()
                .toFormat('yyyy MMM dd') ===
              DateTime.now().toFormat('yyyy MMM dd')
            );
          })
        );
        const today = DateTime.local().startOf('day');
        const tomorrow = today.plus({ days: 1 }).startOf('day');
        const noUseMe = sliceData(
          data.d.results
            .filter((item) => {
              const eventDate = DateTime.fromISO(item.EventDate)
                .toLocal()
                .startOf('day');
              return eventDate >= today && eventDate <= tomorrow;
            })
            .sort((a, b) => {
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
      setCurrentDate(DateTime.now().plus({ days: 1 }).toFormat('yyyy MMM dd'));
    } else if (e.data + 1 < localData.length)
      setCurrentDate(DateTime.now().toFormat('yyyy MMM dd'));
  };
  const book = useRef();
  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-col justify-center px-6">
        <div className="mt-3 justify-center text-center">
          <div className="flex justify-between text-green gap-2 m-2">
            <button
              className="inline-flex"
              onClick={() => book.current.pageFlip().flipPrev()}
            >
              <CgArrowsExpandDownLeft className="text-lg" />
              <span className="text-xs">Previous</span>
            </button>
            <Marquee
              play={true}
              pauseOnHover={true}
              direction="right"
              speed={20}
              loop={0}
              gradient={true}
              gradientColor={[255, 73, 219]}
              className="rounded"
            >
              <div className="text-xs text-text">
                <h2>
                  {' '}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, facere.
                </h2>
              </div>
              <div className="text-xs text-text ml-4">
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, ipsum.
                </h2>
              </div>
            </Marquee>
            <button
              className="inline-flex"
              onClick={() => book.current.pageFlip().flipNext()}
            >
              <span className="text-xs">Next</span>
              <CgArrowsExpandDownRight className="text-lg" />
            </button>
          </div>
        </div>
        <div className="w-full flex-col shadow-2xl">
          {/* 2560 × 1272 */}
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
            className="rounded-r-md"
          >
            {localData2.map((item, index) => {
              return (
                <div className="page h-11 rounded-md">
                  <table>
                    <thead>
                      <tr className="border-b border-dotted">
                        {headers.map((header, i) => (
                          <th
                            key={i}
                            className="glow text-xs text-center px-8 pt-10 pb-2 text-pink divide "
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
                            <td className="text-center text-m">
                              {list.Squadron}
                            </td>
                            <td className="text-center text-m">
                              {DateTime.fromISO(list.EventDate)
                                .toLocal()
                                .toFormat('yyyy MMM dd')}
                            </td>
                            <td
                              className={`glow-td text-center text-m ${
                                list.Status === 'Approved'
                                  ? 'text-green/50'
                                  : list.Status === 'Pending'
                                  ? 'text-purple/50'
                                  : list.Status === 'Rejected'
                                  ? 'text-pink/50'
                                  : ''
                              }`}
                            >
                              {list.Status}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </HTMLFlipBook>
        </div>
        <div className="flex justify-between text-sm m-2 text-green gap-2">
          <h2> Current date: {currentDate}</h2>
          <h2>Current Page: {currentPage}</h2>
        </div>
      </div>
    </div>
  );
};

export default MyBook;

{
  /* <div className="h-8 mt-6 rounded-sm text-center">
{' '}
<span className="font-medium text-text text-lg w-max">
  Todays date: {currentDate}
</span>
</div>
<div className="flex justify-around h-8 mt-6 rounded-sm">
<button
  className="bg-green top-2 left-64 rounded-md p-1"
  onClick={() => book.current.pageFlip().flipPrev()}
>
  Previous page
</button>
<span className="font-medium text-text text-lg w-max ">
  Current Page: {currentPage}
</span>
<button
  className="bg-green top-2 right-64 rounded-md p-1 "
  onClick={() => book.current.pageFlip().flipNext()}
>
  Next page
</button>
</div> */
}
