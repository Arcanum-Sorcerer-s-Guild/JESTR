import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import FlexCol from '../../../Components/Wrappers/FlexCol.js';

const OperationalBar = ({ assetList }) => {
  const [operationalBarData, setOperationalBarData] = useState();

  useEffect(() => {
    if (assetList.length > 0) {
      let totalUnschedulable = assetList.filter(
        (asset) => asset.Schedulable === false
      ).length;
      let totalOperational = assetList.filter(
        (asset) => asset.Schedulable === true && asset.Operational === true
      ).length;
      let totalUnOperational = assetList.filter(
        (asset) => asset.Schedulable === true && asset.Operational === false
      ).length;
      let assetBarData = [
        totalUnschedulable,
        totalOperational,
        totalUnOperational,
      ];
      if (assetList.length > 0) {
        setOperationalBarData({
          labels: ['Unschedulable', 'Operational', 'Unavailable'],
          datasets: [
            {
              data: assetBarData,
              backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#4BC0C0',
                '#FF9F40',
                '#9966FF',
                '#FFCD56',
              ],
            },
          ],
        });
      }
    }
  }, [assetList]);
  return (
    <>
      <FlexCol>
        <h3 className="flex text-2xl mb-2 justify-center text-text">
          Operational vs Non Operational Assets
        </h3>
        <div>
          {operationalBarData ? (
            <Bar
              width={500}
              height={500}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: false,
                },
                scales: {
                  x: {
                    grid: {
                      color: 'green',
                    },
                  },
                  y: {
                    grid: {
                      color: 'green',
                    },
                  },
                },
              }}
              data={operationalBarData}
            />
          ) : (
            <></>
          )}
        </div>
      </FlexCol>
    </>
  );
};

export default OperationalBar;
