import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const OperationalBar = ({assetList}) => {
  const [operationalBarData,setOperationalBarData] = useState()

  useEffect(()=> {
    if (assetList.length > 0) {
      let totalUnschedulable = assetList.filter(asset => asset.Schedulable === false).length;
      let totalOperational = assetList.filter(asset => asset.Schedulable === true && asset.Operational === true ).length;
      let totalUnOperational = assetList.filter(asset => asset.Schedulable === true && asset.Operational === false).length;
    let assetBarData = [totalUnschedulable,totalOperational,totalUnOperational]
    if (assetList.length > 0) {
      setOperationalBarData({
        labels: ['Unschedulable','Operational','Unavailable'],
        datasets: [{
              data: assetBarData,
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }]
      })

    }
  }}, [assetList])
  return(<>
  <div className="flex flex-col">
          <h3 className="text-2xl mb-2">Operational vs Non Operational</h3>
          <div>
            {operationalBarData ?              
            <Bar
              width={250}
              height={250}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend:false
                }

              }}
              data={operationalBarData}
            /> : <></>}
          </div>
        </div>
  </>)
}

export default OperationalBar