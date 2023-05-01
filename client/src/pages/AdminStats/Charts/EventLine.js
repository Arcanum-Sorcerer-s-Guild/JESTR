import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Info } from 'luxon';
import { Line } from 'react-chartjs-2';
import FlexCol from '../../../Components/Wrappers/FlexCol.js';
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

      if (daySpan < 4) {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') <
              dateRange.start.startOf('day').plus({ day: 3 })
        );
        daySpan = 3;
        rangeTerm = 'Day';
      } else {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') < dateRange.end.startOf('day')
        );
      }

      if (reservations.length > 0) {
        if (daySpan <= 3) {
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('EEE');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }
          let numDays = Object.keys(obj).length;
          for (let i = 1; i < 4 - numDays; i++) {
            let key = reservations[reservations.length - 1].date
              .plus({ day: i })
              .toFormat('EEE');
            obj[key] = 0;
          }
          setLineLabels({
            labels: Object.keys(obj),
            data: Object.values(obj),
            range: rangeTerm === '' ? 'Week' : 'Day',
          });
        }

        if (daySpan <= 7 && daySpan > 3) {
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('EEE');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }

          let numDays = Object.keys(obj).length;
          for (let i = 1; i < 8 - numDays; i++) {
            let key = reservations[reservations.length - 1].date
              .plus({ day: i })
              .toFormat('EEE');
            obj[key] = 0;
          }

          setLineLabels({
            labels: Object.keys(obj),
            data: Object.values(obj),
            range: rangeTerm === '' ? 'Week' : 'Day',
          });
        }

        if (daySpan > 7 && daySpan <= 31) {
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

        if (daySpan > 31) {
          let obj = {};
          for (let i = 0; i < reservations.length; i++) {
            let key = reservations[i].date.toFormat('MMM');
            typeof obj[key] === 'undefined' ? (obj[key] = 1) : obj[key]++;
          }

          let numMonths = Object.keys(obj).length;

          if (numMonths < 6) {
            for (let i = 1; i < 6 - numMonths; i++) {
              let key = reservations[reservations.length - 1].date
                .plus({ month: i })
                .toFormat('MMM');
              obj[key] = 0;
            }
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
      <FlexCol>
        <h3 className="flex justify-center text-2xl mb-2 text-text">{`Reservations by ${lineLabels.range}`}</h3>
        <div>
          {eventLineData ? (
            <Line
              width={500}
              height={500}
              options={{
                maintainAspectRatio: false,

                plugins: {
                  legend: false,
                  datalabels: { offset: -20, align: 'start', color: 'pink' },
                },
                scales: {
                  x: {
                    suggestedMin: lineLabels.labels.length,
                    grid: { color: 'green' },
                    ticks: { color: 'pink' },
                  },
                  y: {
                    grid: { color: 'green' },
                    ticks: { color: 'pink' },
                  },
                },
              }}
              data={eventLineData}
            />
          ) : (
            <></>
          )}
        </div>
      </FlexCol>
    </>
  );
};

export default EventLine;
