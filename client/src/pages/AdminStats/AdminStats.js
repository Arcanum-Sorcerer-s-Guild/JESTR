import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../../Context/AppContext.js';
import { DateTime } from 'luxon';
import ReservationSuccessPie from './Charts/ReservationSuccessPie.js';
import OperationalBar from './Charts/OperationalBar.js';
import EventLine from './Charts/EventLine.js';
import SquadronRadar from './Charts/SquadronRadar.js';
import DateRangeSelector from './DateRangeSelector.js';
import UserDoughnut from './Charts/UserDoughnut';
import SquadronBubble from './Charts/SquadronBubble.js';

import { userListFetch } from '../../utils/api/endPoints.js';
import { listFetch } from '../../utils/api/endPoints.js';

const AdminStats = () => {
  const [reserveList, setReserveList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });

  useEffect(() => {
    userListFetch((e) => setUserList(e));
  }, []);

  useEffect(() => {
    listFetch('Reservations', (data) =>
      setReserveList(
        data.d.results.map((reservation) => {
          return {
            date: DateTime.fromISO(reservation.EventDate).toLocal(),
            status: reservation.Status,
            squadron: reservation.Squadron,
            range: reservation.Range,
          };
        })
      )
    );
  }, []);

  useEffect(() => {
    listFetch('Assets', (data) => setAssetList(data.d.results));
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="mt-5 bg-gray-100 flex items-center justify-center bg-gray-100">
        <div className="w-full shadow-xl">
          <div className="flex justify-center">
            <div>
              <DateRangeSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 px-5 gap-4 mb-2">
            <div className=" bg-blue-darker rounded-lg px-4">
              <EventLine dateRange={dateRange} reserveList={reserveList} />
            </div>
            <div className="bg-blue-darker rounded-lg mx-4">
              <ReservationSuccessPie
                dateRange={dateRange}
                reserveList={reserveList}
              />
            </div>
            <div className=" bg-blue-darker rounded-lg mx-4">
              <SquadronRadar dateRange={dateRange} reserveList={reserveList} />
            </div>
            <div className=" bg-blue-darker rounded-lg mx-4">
              <SquadronBubble reserveList={reserveList} dateRange={dateRange} />
            </div>
            <div className=" bg-blue-darker rounded-lg mx-4">
              <OperationalBar assetList={assetList} />
            </div>
            <div className=" bg-blue-darker rounded-lg mx-4">
              <UserDoughnut userList={userList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
