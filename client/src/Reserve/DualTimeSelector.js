import React, { useState, useEffect } from 'react';
import CloseButton from './ButtonClose';

//icons
import { CgRemove } from 'react-icons/cg';

function DualTimeSelector({ timeList, setTimeList }) {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [name, setName] = useState(`VUL-0`);

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
    <div className="w-[600px]">
      <div className="flex justify-center">
        <div className="w-[125px] flex flex-col mx-3">
          <label className="text-gray-light text-left px-2">Start Time:</label>
          <input
            type="time"
            className="form-input text-xs h-1/2 relative cursor-default rounded-md bg-gray-dark text-left text-gray-light shadow-md border-none mt-2"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>

        <div className="w-[125px] flex flex-col mr-2">
          <label className="text-gray-light text-left px-2">End Time:</label>
          <input
            type="time"
            className="form-input text-xs h-1/2 relative cursor-default rounded-md bg-gray-dark text-left text-gray-light shadow-md border-none mt-2"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>

        <div className="flex items-center mt-6">
          <button
            className="px-4 py-1 rounded bg-secondary text-gray-light"
            onClick={handleAddTimeClick}
          >
            Add Time
          </button>
        </div>
      </div>
      <div className="flex mt-3 ml-5 justify-center">
        <ul>
          {timeList.map((time, index) => (
            <li key={index} className="w-fit pr-5 mb-2 bg-gray-dark rounded">
              <div className="flex items-center rounded">
                <div className="bg-secondary rounded border-r border-gray-light">
                  <button
                    className="text-gray-light p-2 "
                    onClick={() => handleRemoveTimeClick(index)}
                  >
                    {' '}
                    <CgRemove />
                  </button>
                </div>
                <div className="flex px-4">
                  <span className="text-secondary mr-2">{time.name}:</span>
                  <span>
                    {time.start} - {time.end}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DualTimeSelector;
