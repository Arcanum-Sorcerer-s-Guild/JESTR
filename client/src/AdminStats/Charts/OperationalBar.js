import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

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
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      }
    }
  }, [assetList]);
  return (
    <>
      <div className="flex flex-col ">
        <h3 className="flex text-2xl mb-2 justify-center text-text">Operational vs Non Operational Assets</h3>
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
                      color: "green"
                    }
                  },
                  y: {
                    grid: {
                      color: "green"
                    },
                  }
                },
              }}
              data={operationalBarData}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default OperationalBar;
