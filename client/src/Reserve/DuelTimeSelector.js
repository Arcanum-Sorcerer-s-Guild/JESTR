import React, { useState } from 'react';

function TimeSelector(props) {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [timeList, setTimeList] = useState([]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  }

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  }

  const handleAddTimeClick = () => {
    const newTime = {
      name: props.name,
      start: startTime,
      end: endTime
    }
    setTimeList([...timeList, newTime]);
  }

  return (
    <div>
      <h3>{props.name}</h3>
      <label>Start Time: 
        <input type="time" value={startTime} onChange={handleStartTimeChange} />
      </label>
      <br />
      <label>End Time: 
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </label>
      <br />
      <button onClick={handleAddTimeClick}>Add Time</button>
      <br />
      <ul>
        {timeList.map((time, index) => (
          <li key={index}>{time.name}: {time.start} - {time.end}</li>
        ))}
      </ul>
    </div>
  );
}

export default TimeSelector;
