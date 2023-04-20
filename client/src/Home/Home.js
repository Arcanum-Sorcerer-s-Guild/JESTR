import React, { useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TwoDayTimeLineChart from './TwoDayTimeLineChart.js';
import { DateTime } from 'luxon';

ChartJS.register(ArcElement, Tooltip, Legend);


const Home = () => {
  const [resArray,setResArray] = useState([])
  const [selectedDate,setSelectedDate] = useState()

  const handleDateSelection = (e) => {
    setSelectedDate(DateTime.fromISO(e.target.value).toLocal())
  }

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      { credentials: 'include' }
    )
      .then((res) => res.json())
      .then((data) => {
        setResArray(
          data.d.results.map((res) => {
            return {
              ...res,
              start: DateTime.fromISO(res.EventDate).toLocal(),
              end: DateTime.fromISO(res.EndDate).toLocal(),
            };
          })
        );
      });
      setSelectedDate(DateTime.now().toLocal())
  }, []);



  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-10 mt-5 mb-5"> 
        <button className="border border-black bg-primary rounded-lg p-3 w-1/12" onClick={()=>setSelectedDate(selectedDate.minus({Day:1}))}>Previous</button>
        {selectedDate !== undefined ? <input type="date" onChange={handleDateSelection} value={selectedDate.toFormat('yyyy-MM-dd')}/> : <></> }
        <button className="border border-black bg-primary rounded-lg p-3 w-1/12" onClick={()=>setSelectedDate(selectedDate.plus({Day:1}))}>Next</button>
        
      </div>

      <div className="flex h-screen overflow-hidden justify-center">
      {selectedDate !== undefined ? <>
      <TwoDayTimeLineChart resArray={resArray} selectedDate={selectedDate}/>
      </>:<></>}
      </div>
    </div>

  );
};

export default Home;

      // <h1>Awesomeness</h1>
      // <div>
      //   <Pie
      //     width={250}
      //     height={250}
      //     options={{ maintainAspectRatio: false }}
      //     data={data}
      //   />
      // </div>
      
      // export const data = {
      //   labels: ['Brandon', 'David', 'Jacob', 'Jason', 'Joseph', 'Kyle'],
      //   datasets: [
      //     {
      //       label: 'Awesomeness',
      //       data: [12, 12, 12, 3, 12, 50],
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(255, 206, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //       ],
      //       borderColor: [
      //         'rgba(255, 99, 132, 1)',
      //         'rgba(54, 162, 235, 1)',
      //         'rgba(255, 206, 86, 1)',
      //         'rgba(75, 192, 192, 1)',
      //         'rgba(153, 102, 255, 1)',
      //         'rgba(255, 159, 64, 1)',
      //       ],
      //       borderWidth: 1,
      //     },
      //   ],
      // };
      
