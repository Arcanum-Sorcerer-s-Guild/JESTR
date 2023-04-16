import React, { useState } from 'react';
import { DateTime } from 'luxon';

const DateRangeSelector = ({ dateRange, setDateRange }) => {

  const dateInputChange = (e) => {
    let name = e.target.name;
    let value = DateTime.fromISO(e.target.value).toLocal();

    if(name==='end') setDateRange({ start: dateRange.start, end: value})
    if (name === 'start') setDateRange({ start: value, end: dateRange.end})
  };

  const dateSpanChange = (e) => {
    if (e.target.name === 'day') setDateRange({ start: dateRange.start,end: dateRange.start });
    if (e.target.name === 'week') setDateRange({start: dateRange.start,end: dateRange.start.plus({ day: 7 })});
    if (e.target.name === 'month') setDateRange({start: dateRange.start,end:dateRange.start.plus({ month: 1 })});
    if (e.target.name === 'year') setDateRange({start: dateRange.start,end: dateRange.start.plus({ year: 1 })});
  };

  return (
    <>
      <div className="mb-5 mt-5 flex flex-col">
        <div>
          <h3 className="text-center text-2xl">
            Reservation Date Range Selection
          </h3>
          <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group"
          >
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="day"
              onClick={(e) => dateSpanChange(e)}
            >
              Day
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="week"
              onClick={(e) => dateSpanChange(e)}
            >
              Week
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="month"
              onClick={(e) => dateSpanChange(e)}
            >
              Month
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="year"
              onClick={(e) => dateSpanChange(e)}
            >
              Year
            </button>

          </div>
          <div>
            <input
              name="start"
              type="date"
              defaultValue={dateRange.start.toFormat('yyyy-MM-dd')}
              onChange={(e) => dateInputChange(e)}
            />
            <input
              name="end"
              type="date"
              defaultValue={dateRange.start.toFormat('yyyy-MM-dd')}
              min={dateRange.start.toFormat('yyyy-MM-dd')}
              onChange={(e) => dateInputChange(e)}
              value={dateRange.end.toFormat('yyyy-MM-dd')}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangeSelector;
