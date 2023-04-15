import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../App';
import { DateTime } from 'luxon';
import ReservationSuccessPie from './Charts/ReservationSuccessPie.js';
import OperationalBar from './Charts/OperationalBar.js';
import EventLine from './Charts/EventLine.js';
import DateRangeSelector from './DateRangeSelector.js';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import type {ReactTabsFunctionComponent, TabProps} from 'react-tabs'

const AdminStats = () => {
  const { listUrl } = useContext(Context);
  const [reserveList, setReserveList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: DateTime.local(),
    end: DateTime.local(),
  });

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
            };
          })
        );
      });
  }, []);

  ///UNCOMMENT TO VALIDATE DATES IN CONSOLE///
  // useEffect(()=>{
  //   reserveList.sort((a,b)=>{return a.date - b.date})
  //   reserveList.forEach((res)=>console.log(res.date.toFormat('dd MMM yyyy EEE')))

  // },[reserveList])

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setAssetList(data.d.results);
      });
  }, []);

  return (<>
    <div className="m-5">

    <Tabs>
      <TabList className="my-6 flex flex-col sm:flex-row sm:justify-between sm:items-center" id="controlled-tabs" selectedTabClassName="bg-primary-600">
        <Tab className="cursor-pointer py-4 px-8 bg-primary border border-grey-intermediate">Reservation Data</Tab>
        <Tab>Asset Data</Tab>
        <Tab>User Permissions</Tab>
        <Tab>User Data</Tab>
      </TabList>
      <TabPanel>
        <div className="flex flex-col text-center content-start">
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          <h1 className="text-center text-4xl mb-5">Reservation Statistics</h1>
          <div className="flex flex-row gap-16">
            <ReservationSuccessPie
              dateRange={dateRange}
              reserveList={reserveList}
            />
            <EventLine dateRange={dateRange} reserveList={reserveList} />
          </div>
        </div>
      </TabPanel> 
      <TabPanel>
        <div className="flex flex-col text-center content-start">
        <h1 className="text-center text-4xl mb-5 mt-5">Asset Statistics</h1>
        <div className="flex flex-row gap-16">
          <OperationalBar assetList={assetList} />
        </div>
      </div>
      </TabPanel> 
    </Tabs>


    </div>

    </>
  );
};

export default AdminStats;
