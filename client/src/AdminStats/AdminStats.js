import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
import { DateTime } from 'luxon';
import ReservationSuccessPie from './Charts/ReservationSuccessPie.js';
import OperationalBar from './Charts/OperationalBar.js';
import EventLine from './Charts/EventLine.js'
import DateRangeSelector from './DateRangeSelector.js';

const AdminStats = () => {
  const { listUrl } = useContext(Context);
  const [reserveList, setReserveList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`)
      .then((res) => res.json())
      .then((data) => {
        setReserveList(
          data.d.results.map((reservation) => {
            return {
              date: DateTime.fromISO(reservation.EventDate).toLocal(),
              status: reservation.Status,
              squadron: reservation.Squadron,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
      .then((res) => res.json())
      .then((data) => {
        setAssetList(data.d.results);
        })
  }, []);

  return (<>
    <div className="m-5">
      <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange}/>

      <div className="flex flex-col text-center content-start">
      <h1 className="text-center text-4xl mb-5">Reservation Statistics</h1>
      <div className="flex flex-row gap-16">
        <ReservationSuccessPie dateRange={dateRange} reserveList={reserveList}/>
        {/* <EventLine dateRange={dateRange} reserveList={reserveList}/> */}
      </div>
      </div>
      <h1  className="text-center text-4xl mb-5 mt-5">Asset Statistics</h1>
      <div className="flex flex-row gap-16">
        <OperationalBar assetList={assetList} />
        
      </div>
    </div>
    </>
  );
};

export default AdminStats;
