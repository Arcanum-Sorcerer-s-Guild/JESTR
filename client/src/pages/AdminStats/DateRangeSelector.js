import React, { useState } from 'react';
import { DateTime } from 'luxon';

const DateRangeSelector = ({ dateRange, setDateRange }) => {
  const dateInputChange = (e) => {
    let name = e.target.name;
    let value = DateTime.fromISO(e.target.value).toLocal();

    if (name === 'end') setDateRange({ start: dateRange.start, end: value });
    if (name === 'start') setDateRange({ start: value, end: dateRange.end });
  };

  const dateSpanChange = (e) => {
    if (e.target.name === 'day')
      setDateRange({ start: dateRange.start, end: dateRange.start });
    if (e.target.name === 'week')
      setDateRange({
        start: dateRange.start,
        end: dateRange.start.plus({ day: 7 }),
      });
    if (e.target.name === 'month')
      setDateRange({
        start: dateRange.start,
        end: dateRange.start.plus({ month: 1 }),
      });
    if (e.target.name === 'year')
      setDateRange({
        start: dateRange.start,
        end: dateRange.start.plus({ year: 1 }),
      });
  };

  return (
    <div className="bg-gray-dark mb-4 relative rounded overflow-hidden">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
      <div className="flex  w-full">
        <div className="buttons flex w-full justify-center items-center mt-2">
          <button
            name="day"
            type="button"
            className="bg-pink/50 text-xs px-8 py-2 rounded w-1/2 my-4 mx-8 text-gray-light uppercase active:bg-secondary"
            onClick={(e) => dateSpanChange(e)}
          >
            Day
          </button>
          <button
            name="week"
            type="button"
            className="bg-pink/50 text-xs px-8 py-2 rounded w-1/2 my-4 mx-8 text-gray-light uppercase active:bg-secondary"
            onClick={(e) => dateSpanChange(e)}
          >
            Week
          </button>
          <button
            name="month"
            type="button"
            className="bg-pink/50 text-xs px-8 py-2 rounded w-1/2 my-4 mx-8 text-gray-light uppercase active:bg-secondary"
            onClick={(e) => dateSpanChange(e)}
          >
            Month
          </button>
          <button
            name="year"
            type="button"
            className="bg-pink/50 text-xs px-8 py-2 rounded w-1/2 my-4 mx-8 text-gray-light uppercase active:bg-secondary"
            onClick={(e) => dateSpanChange(e)}
          >
            Year
          </button>
        </div>
        <div className="pickers w-1/2 flex justify-center items-center text-center mb-4">
          <div className="w-fit">
            <span className="text-gray-light text-xs">Start Date:</span>
            <input
              name="start"
              type="date"
              className="w-fit text-xs bg-pink/50 border-none rounded text-gray-light"
              defaultValue={dateRange.start.toFormat('yyyy-MM-dd')}
              onChange={(e) => dateInputChange(e)}
              max={dateRange.end.toFormat('yyyy-MM-dd')}
            />
          </div>

          <div className="w-fit">
            <span className="text-gray-light text-xs">End Date:</span>
            <input
              name="end"
              type="date"
              className="w-fit text-xs bg-pink/50 border-none rounded text-gray-light ml-2"
              min={dateRange.start.toFormat('yyyy-MM-dd')}
              onChange={(e) => dateInputChange(e)}
              value={dateRange.end.toFormat('yyyy-MM-dd')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
