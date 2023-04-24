import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

const SquadronRadar = ({ dateRange, reserveList }) => {
  const [squadronRangeData, setSquadronRangeData] = useState([]);

  useEffect(() => {
    if (reserveList.length > 0) {
      let daySpan = parseInt(
        dateRange.end.diff(dateRange.start).toFormat('dd')
      );
      let reservations = [];

      if (daySpan < 4) {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') <
              dateRange.start.startOf('day').plus({ day: 3 })
        );
      } else {
        reservations = reserveList.filter(
          (res) =>
            res.date.startOf('day') >= dateRange.start.startOf('day') &&
            res.date.startOf('day') < dateRange.end.startOf('day')
        );
      }

      let rangeList = [...new Set(reservations.map((a) => a.range))];
      let squadronList = [...new Set(reservations.map((a) => a.squadron))];

      let dataSets = squadronList.map((sq) => {
        return {
          label: sq,
          data: rangeList.map((rng) =>
            reservations.reduce(
              (acc, res) =>
                res.range === rng && res.squadron === sq ? acc + 1 : acc,
              0
            )
          ),
        };
      });

      setSquadronRangeData({
        labels: rangeList,
        datasets: dataSets,
      });
    }
  }, [dateRange, reserveList]);

  return (
    <>
      <div className="flex flex-col">
        <h3 className="flex justify-center text-2xl mb-2 text-text">
          Site Usage by Squadron
        </h3>
        <div>
          {Object.keys(squadronRangeData).length > 0 ? (
            <Radar
              width={500}
              height={500}
              data={squadronRangeData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  r: {
                    angleLines: { color: 'green' },
                    grid: { color: 'green' },
                    ticks: { color: 'pink', backdropColor: 'transparent' },
                    pointLabels: { color: 'pink' },
                  },
                  x: { ticks: { color: 'pink' } },
                  y: { ticks: { color: 'pink' } },
                  // grid: {color:"green"}
                  // gridLines: {color: 'transparent'},
                  // angleLines: { color: 'transparent'}
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      color: 'pink',
                    },
                  },
                },
                //  scales: {
                //   x: {
                //     grid: {
                //       color: "green"
                //     }
                //   },
                //   y: {
                //     grid: {
                //       color: "green"
                //     },
                //   }}
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default SquadronRadar;
