import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Info } from 'luxon';
import { Line } from 'react-chartjs-2';


const EventLine = ({ dateRange, reserveList }) => {
  const [eventLineData, setEventLineData] = useState();
  const [lineLabels, setLineLabels] = useState({
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    data: [],
    range: 'Week',
  });

  useEffect(() => {
    if (reserveList.length > 0) {
      reserveList.sort((a, b) => {
        return a.date - b.date;
      });
      let daySpan = parseInt(
        dateRange.end.diff(dateRange.start).toFormat('dd')
      );
      let reservations = [];
      let rangeTerm = '';

      if (daySpan < 7) {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') <
              dateRange.start.startOf('day').plus({ day: 3 })
        );
        daySpan = 7;
        rangeTerm = 'Day';
      } else {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') < dateRange.end.startOf('day')
        );
      }

      console.log(daySpan, reservations);
      if (reservations.length > 0) {
        if (daySpan === 7) {
          // let tempArray = new Array(7).fill(0)
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('EEE');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }
          setLineLabels({
            labels: Object.keys(obj),
            data: Object.values(obj),
            range: rangeTerm === '' ? 'Week' : 'Day',
          });
        }

        if (daySpan > 7 && daySpan < 30) {
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('d');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }
          setLineLabels({
            labels: Object.keys(obj),
            data: Object.values(obj),
            range: 'Span',
          });
        }

        if (daySpan > 30) {
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('MMM');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }
          setLineLabels({
            labels: Object.keys(obj),
            data: Object.values(obj),
            range: 'Year',
          });
        }
      }
    }
  }, [dateRange, reserveList]);

  useEffect(() => {
    setEventLineData({
      labels: lineLabels.labels,
      datasets: [
        {
          label: lineLabels.range,
          data: lineLabels.data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
  }, [lineLabels]);

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-2xl mb-2">{`Reservations by ${lineLabels.range}`}</h3>
        <div>
          {eventLineData ? (
            <Line
              width={250}
              height={250}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: false,
                  datalabels: { offset: -20, align: 'start' },
                },
                scales: { x: { suggestedMin: lineLabels.labels.length } },
              }}
              data={eventLineData}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default EventLine;
