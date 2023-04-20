import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
import { DateTime } from 'luxon';
import ReservationSuccessPie from './Charts/ReservationSuccessPie.js';
import OperationalBar from './Charts/OperationalBar.js';
import EventLine from './Charts/EventLine.js';
import SquadronRadar from './Charts/SquadronRadar.js';
import DateRangeSelector from './DateRangeSelector.js';
import UserDoughnut from './Charts/UserDoughnut';
import SquadronBubble from './Charts/SquadronBubble.js';

const AdminStats = () => {
  const { listUrl } = useContext(Context);
  const [reserveList, setReserveList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });

  useEffect(() => {
    fetch(`http://localhost:3001/user/list`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUserList(data));
  }, []);

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Reservations')/items`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setReserveList(
          data.d.results.map((reservation) => {
            return {
              date: DateTime.fromISO(reservation.EventDate).toLocal(),
              status: reservation.Status,
              squadron: reservation.Squadron,
              range: reservation.Range,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setAssetList(data.d.results);
      });
  }, []);

  return (
    <>
        <div className="flex justify-center">
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      <div className=" m-3 flex flex-row ">


        <div className="flex flex-col gap-5 justify-around flex-wrap w-screen m-5">
          
          <div className="flex flex-row">
            <div className="w-1/3">
              <EventLine dateRange={dateRange} reserveList={reserveList} />
                
            </div>

            <div className="w-1/3">
              <ReservationSuccessPie dateRange={dateRange} reserveList={reserveList}/>
            </div>


            <div className="w-1/3">
              <SquadronRadar dateRange={dateRange} reserveList={reserveList} />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/3">
              <SquadronBubble reserveList={reserveList} dateRange={dateRange}/>
            </div>


            <div className="w-1/3">
              <OperationalBar assetList={assetList} />
            </div>

            
            <div className="w-1/3">
              <UserDoughnut userList={userList} />
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default AdminStats;
