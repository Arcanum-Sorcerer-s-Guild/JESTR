import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import TwoDayTimeLineChart from '../Home/TwoDayTimeLineChart';
import './book.css';
import Marquee from 'react-fast-marquee';

//icons
import {
  CgArrowsExpandDownLeft,
  CgArrowsExpandDownRight,
} from 'react-icons/cg';

const MyBook = () => {
  const [reservations, setReservations] = useState([]);
  const [resArray, setResArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [localData, setLocalData] = useState([[{ hello: 'hello' }]]);
  const [localData2, setLocalData2] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    DateTime.now().toFormat('yyyy MMM dd')
  );
  const [currentPage, setCurrentPage] = useState(1 + '-' + 2);
  const [toggle, setToggle] = useState(true);
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
        setResArray(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
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
    setCurrentPage(e.data + 1 + '-' + (e.data + 2));
    if (e.data + 1 === localData.length || e.data === localData.length) {
      setCurrentDate(DateTime.now().plus({ days: 1 }).toFormat('yyyy MMM dd'));
    } else if (e.data + 1 < localData.length)
      setCurrentDate(DateTime.now().toFormat('yyyy MMM dd'));
  };

  const book = useRef();
  return (
    <div className="container text-center justify-center mx-auto h-screen">
      <div className="text-center">
        <label
          class="inline-block pl-[0.15rem] hover:cursor-pointer text-text"
          for="flexSwitchCheckDefault"
        >
          Switch views
        </label>
        <input
          class="mr-2 mt-[0.3rem] h-3.5 w-8 p-auto  rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          value={toggle}
          onChange={() => setToggle(!toggle)}
        />
      </div>

      <div className="flex flex-col justify-center px-6">
        <div className="mt-3 justify-center text-center">
          {toggle ? (
            <>
              <div className="flex justify-between items-end text-green gap-2 m-2">
                <button
                  className="inline-flex items-end"
                  onClick={() => book.current.pageFlip().flipPrev()}
                >
                  <CgArrowsExpandDownLeft className="text-lg" />
                  <span className="text-xs">Previous</span>
                </button>
                <Marquee
                  play={true}
                  pauseOnHover={true}
                  direction="left"
                  speed={20}
                  loop={0}
                  gradient={true}
                  gradientColor={[255, 73, 219]}
                  className="rounded"
                >
                  <div className="text-xs text-text">
                    <h2>
                      Please see an Admin to delete or update a reservation.
                    </h2>
                  </div>
                  <div className="text-xs text-text ml-4">
                    <h2>
                      Please see an Admin to delete or update a reservation.
                    </h2>
                  </div>
                </Marquee>
                <button
                  className="inline-flex items-end"
                  onClick={() => book.current.pageFlip().flipNext()}
                >
                  <span className="text-xs">Next</span>
                  <CgArrowsExpandDownRight className="text-lg" />
                </button>
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
                                      .toFormat('dd MMM @ hh:mm')}{' '}
                                    L
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
            </>
          ) : (
            <TwoDayTimeLineChart/>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBook;
