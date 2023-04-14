import React, { useState, useEffect } from 'react';

function DualTimeSelector({timeList, setTimeList}) {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  // const [timeList, setTimeList] = useState([]);
  const [name, setName] = useState(`VUL-0`);

useEffect(() => {
  setTimeList(timeList);
}, [timeList]);

  useEffect(() => {
    const vulNum =
      timeList.length > 0
        ? timeList[timeList.length - 1].name.split('-')[1]
        : 0;
    setName(`VUL-${parseInt(vulNum) + 1}`);
  }, [timeList]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    setEndTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleAddTimeClick = () => {
    if (startTime > endTime) {
      console.log('start time is greater than end time');
    }
    const newTime = {
      name: name,
      start: startTime,
      end: endTime,
    };
    setTimeList([...timeList, newTime]);
  };

  const handleRemoveTimeClick = (index) => {
    const newTimeList = [...timeList];
    newTimeList.splice(index, 1);
    setTimeList(newTimeList);
  };

  return (
    <div className="bg-primary text-center w-48">
      <h2>Add Times</h2>
      {/* <h3>{name}</h3> */}
      <div className="bg-secondary flexbox content-center p-1">
        <div className="flexbox">
          <label className="text-text">Start Time</label>
        </div>
        <input
          type="time"
          className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          value={startTime}
          onChange={handleStartTimeChange}
        />

        <br />
        <div className="flexbox">
          <label className="text-text">End Time</label>
        </div>
        <input
          type="time"
          className="form-input relative w-full cursor-default rounded-lg bg-white py-2 pl-3  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          value={endTime}
          onChange={handleEndTimeChange}
        />

        <br />
      </div>
      <button
        className="font-bold p-1 m-1 rounded bg-accent"
        onClick={handleAddTimeClick}
      >
        Add Time
      </button>
      <br />
      <ul>
        {timeList.map((time, index) => (
          <li key={index}>
            <button
              className="h-6 w-6 border p-none m-none content-center text-center bg-accent"
              onClick={handleRemoveTimeClick}
            >
              X
            </button>
            {time.name}: {time.start} - {time.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DualTimeSelector;
