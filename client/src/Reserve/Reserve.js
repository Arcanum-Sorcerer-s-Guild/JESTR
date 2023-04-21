import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useReducer,
} from 'react';
import { Context } from '../App';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DualTimeSelector from './DualTimeSelector';
import ReserveMap from './ReserveMap';
import UserForm from './UserForm';
import ListTableNoCheck from './ListTableNoCheck';
import { useCollapse } from 'react-collapsed';
import { GiCompass, GiObservatory } from 'react-icons/gi';
import { FaMountain } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import DmsCoordinates, { parseDms } from 'dms-conversion';
import { Resizable } from 're-resizable';
import { DateTime } from 'luxon';
import Modal from './Modal';
import './react-tabs.css';
import ButtonClose from './ButtonClose';
import ButtonOpen from './ButtonOpen';

//icons
import { GrFormPrevious, GrFormNext, GrDown, GrUp } from 'react-icons/gr';

let formColumns = [
  {
    Header: 'Equip',
    accessor: 'Equipment',
  },
  {
    Header: 'Threat',
    accessor: 'Threat',
  },
];

const reducer = (state, action) => {
  let test = state.filter((todo) => {
    return todo.id === action.id;
  });

  if (test.length === 0) {
    state.push({
      id: action.id,
      times: action.type,
      Range: action.original.Range,
      SiteLocation: action.original.SiteLocation,
      Threat: action.original.Threat,
      Equipment: action.original.Equipment,
      ThreatType: action.original.ThreatType,
      // EventDate: DateTime.fromISO(`${requestDate}T${start}`).toLocal().toUTC().toISO(),
      // EndDate: DateTime.fromISO(`${requestDate}T${end}`).toLocal().toUTC().toISO(),
      Status: 'Pending',
    });
    return [...state];
  } else {
    return state.map((todo) => {
      if (todo.id === action.id) {
        let test = {
          ...todo,
          times: action.type,
          Range: action.original.Range,
          SiteLocation: action.original.SiteLocation,
          Threat: action.original.Threat,
          Equipment: action.original.Equipment,
          ThreatType: action.original.ThreatType,
          // EventDate: DateTime.fromISO(`${requestDate}T${start}`).toLocal().toUTC().toISO(),
          // EndDate: DateTime.fromISO(`${requestDate}T${end}`).toLocal().toUTC().toISO(),
          Status: 'Pending',
        };
        return test;
      } else {
        return todo;
      }
    });
  }
};

const Reserve = () => {
  const { listUrl } = useContext(Context);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [rangeList, setRangeList] = useState([]);
  const [center, setCenter] = useState([
    -146.44166473513687, 64.31714411488758,
  ]);

  const [timeList, setTimeList] = useState([]);
  const [formNewColumns, setFormNewColumns] = useState([]);
  const [dateForm, dispatch] = useReducer(reducer, []);
  const [itemsToSubmit, setItemsToSubmit] = useState([]);
  const [requestedWeek, setRequestedWeek] = useState([]);
  const [userForm, setUserForm] = React.useState({
    POC: '',
    DSN: '',
    Squadron: '',
  });
  const [selectedData, setSelectedData] = useState({});
  const [showModale, setShowModale] = useState(false);
  const { height, width } = useWindowDimensions();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
  }

  useEffect(() => {
    fetch(`${listUrl}/GetByTitle('Assets')/items`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setRangeList([...new Set(data.d.results.map((a) => a.Range))]);
        setData(data.d.results);
        setData(
          data.d.results.map((asset) => ({
            ...asset,
            dms: new DmsCoordinates(
              Number(asset.Latitude),
              Number(asset.Longitude)
            ),
          }))
        );
      });
  }, []);

  const selectAll = (e) => {
    let allAssets = data.map((asset) => asset.Serial);
    if (
      selected.toString() !== allAssets.toString() &&
      e.target.checked === true
    )
      setSelected(allAssets);
    if (selected.length === allAssets.length) setSelected([]);
  };

  useEffect(() => {
    setSelectedData(data.filter((line) => selected.includes(line.Serial)));
  }, [selected]);

  const handleComplete = (target, original) => {
    dispatch({ type: target.value, id: target.id, original: original });
  };

  const optionsFormat = () => {
    return requestedWeek.map((x, index) => {
      return {
        Header: DateTime.fromISO(x)
          .toLocal()
          .toLocaleString({ weekday: 'short', month: 'short', day: '2-digit' }),
        accessor: x,
        Cell: ({ row, column }) => (
          <div>
            <select
              id={`row-${row.id}-col--${column.id}`}
              name="timeSelector"
              value={dateForm[`row-${row.id}-col--${column.id}`]}
              onChange={(e) => {
                handleComplete(e.target, row.original);
              }}
            >
              <option value="none">None</option>
              {timeList.map((y, index) => {
                return (
                  <option key={index} value={y.name}>
                    {y.name}
                  </option>
                );
              })}
              <option value="all">All</option>
            </select>
          </div>
        ),
      };
    });
  };

  useEffect(() => {
    let options = optionsFormat();
    setFormNewColumns([...formColumns, ...options]);
  }, [requestedWeek, timeList]);

  useEffect(() => {
    if (dateForm.length === 0) {
      return;
    }

    let itemsToPush = [];

    let timesCheck = (nameCheck) =>
      timeList.filter(({ name, start, end }) => {
        if (nameCheck === 'all') {
          return {
            name,
            start,
            end,
          };
        } else if (nameCheck === 'none') {
          return;
        } else if (nameCheck === name) {
          return {
            name,
            start,
            end,
          };
        }
      });

    let newdateForm = dateForm.forEach(
      ({ id, times, Range, SiteLocation, Threat, Equipment, ThreatType }) => {
        let requestDate = id.split('--')[1];
        let timeList = timesCheck(times);

        timeList.forEach(({ name, start, end }) => {
          itemsToPush.push({
            ...userForm,
            // id: id,
            // times: `${start}-${end}`,
            Range: Range,
            SiteLocation: SiteLocation,
            Threat: Threat,
            Equipment: Equipment,
            ThreatType: ThreatType,
            EventDate: DateTime.fromISO(`${requestDate}T${start}`)
              .toLocal()
              .toUTC()
              .toISO(),
            EndDate: DateTime.fromISO(`${requestDate}T${end}`)
              .toLocal()
              .toUTC()
              .toISO(),
            Status: 'Pending',
          });
        });
      }
    );
    //TODO check oin why times arnt right
    setItemsToSubmit(itemsToPush);
  }, [dateForm]);

  //TODO
  const sendForm = (payload) => {
    payload.map((x) => {
      fetch(`${listUrl}/GetByTitle('Reservations')/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([x]),
        credentials: 'include',
      }).then((res) => res.json());
      setShowModale(false);
      // setItemsToSubmit([]);
      // setTimeList([]);
      // alert('Reservation sent');
      // navigate(0)
    });
  };


  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center bg-gray-100">
        <div className="w-full lg:w-5/6 shadow-xl">
          {/* submenu-start */}
          <div className="w-full bg-blue-darker relative rounded px-3 mt-6">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <div className="justify-center items-center">
              <div className="py-4 relative">
                <UserForm
                  setUserForm={setUserForm}
                  setRequestedWeek={setRequestedWeek}
                />
              </div>
              <div className="absolute top-2 right-2">
                <ButtonOpen
                  name={'Reserve'}
                  onClick={() => setShowModale(true)}
                />
              </div>
            </div>
          </div>
          {/* submenu-end */}

          {/* resizable-start */}
          <div className="w-full mt-2 bg-blue-darker rounded p-2">
            <div className="flex pb-4 overflow-hidden">
              <div className="mr-1">
                <Resizable
                  className="border-double hover:border-dashed border-r-4 border-secondary"
                  defaultSize={{
                    width: 475,
                    height: 700,
                  }}
                  minWidth={475}
                  minHeight={600}
                  maxHeight={20}
                  maxWidth={width - 300}
                >
                  <div className="h-full overflow-scroll">
                    <div className="flex items-center bg-secondary rounded-l">
                      <input
                        type="checkbox"
                        className="ml-3 mr-3 border-none"
                        onChange={(e) => selectAll(e)}
                      />
                      <h2 className='text-gray-light font-semibold'>Select All</h2>
                    </div>
                    <hr className='text-secondary ml-2 mt-1'/>
                  
                    {rangeList.length > 0 ? (
                      rangeList.map((range) => (
                        <CollapsibleChild
                          key={range}
                          range={range}
                          selected={selected}
                          setSelected={setSelected}
                          setCenter={setCenter}
                          assets={data.filter((asset) => asset.Range === range)}
                        />
                      ))
                    ) : (
                      <>Loading...</>
                    )}
                  </div>
                </Resizable>
              </div>
             
              <div className="ml-2 p-6 rounded bg-gray-dark">
          
                <ReserveMap
                  assetList={data}
                  selected={selected}
                  center={center}
                  setCenter={setCenter}
                  style={{
                    minWidth: '10px',
                    minHeight: '10px',
                    height: '60vh',
                    width: '50vw'
                  }}
                />
              </div>
            </div>
          </div>
          {/* resizable-end */}

          {/* modal-start */}
          <div>
            <Modal
              isvisible={showModale}
              onClose={() => {
                setShowModale(false);
              }}
            >
              {
                <div className="bg-blue h-full items-center text-center ">
                  <Tabs>
                    <TabList>
                      <Tab>Select VULs and Notes</Tab>
                      <Tab>Week Data</Tab>
                      <Tab>Submit Form</Tab>
                    </TabList>

                    <TabPanel>
                      <div className="flex items-center justify-center">
                        <DualTimeSelector
                          timeList={timeList}
                          setTimeList={setTimeList}
                        />
                      </div>
                      {/* <UserForm
                            setUserForm={setUserForm}
                            setRequestedWeek={setRequestedWeek}
                          /> */}
                      <input
                        type="multiline"
                        className="xl:w-3/4 lg:2-11/12 shadow-2xl pl-10 pr-10 m-10 w-3/4  border border-black"
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            [e.target.name]: e.target.value,
                          })
                        }
                        name="Notes"
                        placeholder="Notes"
                      />

                      {/* TODO, make the input wok for all items  */}
                    </TabPanel>

                    <TabPanel>
                      <div
                        className={
                          'overflow-scroll h-96 flex items-center justify-center'
                        }
                      >
                        {selectedData.length !== 0 ? (
                          <ListTableNoCheck
                            data={selectedData}
                            columns={formNewColumns}
                            selected={selected}
                            setSelected={setSelected}
                          />
                        ) : (
                          'Please close this form and select threats from main display...'
                        )}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <>
                        <div>
                          <h1>User Data</h1>
                          <div className="flex">
                            <label className="mr-2">POC: </label>

                            {userForm.POC ? (
                              <div className="">{userForm.POC}</div>
                            ) : (
                              <div className="border-red bg-red/40">
                                None... A username is required
                              </div>
                            )}
                          </div>
                          <div className="flex">
                            <label className="mr-2">Contact DSN: </label>

                            {userForm.ContactDSN ? (
                              <div className="">{userForm.ContactDSN}</div>
                            ) : (
                              <div className="border-red bg-red/40">
                                None... A email is required
                              </div>
                            )}
                          </div>
                          <div className="flex">
                            <label className="mr-2">Squadron: </label>
                            {userForm.Squadron ? (
                              <div className="">{userForm.Squadron}</div>
                            ) : (
                              <div className="border-red bg-red/40">
                                None... A Squadron is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h1>Requests</h1>
                          {itemsToSubmit.map(
                            (
                              {
                                id,
                                Range,
                                SiteLocation,
                                Threat,
                                Equipment,
                                ThreatType,
                                EventDate,
                                EndDate,
                              },
                              index
                            ) => (
                              <ol>
                                <div className="flex">
                                  {index}
                                  {Range}
                                  {SiteLocation}
                                  {Threat}
                                  {Equipment}
                                  {ThreatType}
                                  {EventDate}
                                  {EndDate}
                                </div>
                              </ol>
                            )
                          )}
                        </div>
                        <button
                          className={
                            'bg-gunmetal text-pink flex items-center text-center justify-between p-4 shadow-md shadow-pink/50'
                          }
                          onClick={() => sendForm(itemsToSubmit)}
                        >
                          Submit
                        </button>
                      </>
                    </TabPanel>
                  </Tabs>
                </div>
              }
            </Modal>
          </div>
          {/* modal-end */}
        </div>
      </div>
    </div>
  );
};

const CollapsibleChild = ({
  range,
  assets,
  selected,
  setSelected,
  setCenter,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (name) => {
    if (selected.includes(name)) {
      const index = selected.indexOf(name);
      setSelected(selected.filter((asset) => asset !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const selectRange = (e) => {
    let allAssets = assets
      .filter((asset) => asset.Range === range)
      .map((asset) => asset.Serial);
    let allIncluded = assets.reduce(
      (acc, curr) => (acc ? selected.includes(curr.Serial) : false),
      true
    );
    if (!allIncluded && e.target.checked)
      setSelected([...selected, ...allAssets]);
    if (allIncluded)
      setSelected(selected.filter((asset) => !allAssets.includes(asset)));
  };

  const centerOnAsset = (lat, lon) => {
    setCenter([Number(lon), Number(lat)]);
  };

  return (
    <div className='p-2'>
      <input
        type="checkbox"
        className="ml-3 mr-3 border-none"
        checked={assets.reduce(
          (acc, curr) => (acc ? selected.includes(curr.Serial) : false),
          true
        )}
        onChange={(e) => selectRange(e)}
      />
      <button className="text-gray-light" {...getToggleProps()}>
        {isExpanded ? '↓ ' : '> '}
        <span className='mr-2'>Range: </span>{range}
      </button>
      <section {...getCollapseProps()}>
        {assets.map((asset) => {
          return (
            <>
              <div
                key={asset.Serial}
                className={`mb-1 flex flex-row overflow whitespace-nowrap`}
              >
                <div className="flex w-full">
                  <div className="flex items-center min-w-[450px] ">
                    <input
                      className="ml-7 mr-3"
                      checked={selected.includes(asset.Serial)}
                      type="checkbox"
                      onChange={() => handleChange(asset.Serial)}
                    />
                    <GiObservatory />
                    <span className="font-medium w-1/3 ml-1 mr-3">
                      {asset.Serial.toUpperCase()}
                    </span>
                    <div className="w-full flex justify-end">
                      <button
                        className=" w-full rounded-full p-1 text-sm bg-blue border border-black ml-2 mr-2 flex flex-row gap-1 items-center"
                        onClick={() =>
                          centerOnAsset(asset.Latitude, asset.Longitude)
                        }
                      >
                        <IoLocationSharp />
                        <span className="pl-1">{`${asset.dms
                          .toString()
                          .slice(0, 12)}${asset.dms
                          .toString()
                          .slice(24, 41)}${asset.dms
                          .toString()
                          .slice(-3, 57)}`}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-row min-w-2/3 items-center">
                    <div className="flex flex-row items-center gap-1">
                      <FaMountain />
                      {`El: ${asset.Elevation}`}
                    </div>
                    <div
                      className={`ml-2 flex justify-between border-2 min-w-[450px] overflow:hidden whitespace-nowrap text-center
                      ${
                        asset.Status === 'AMBER'
                          ? `border-yellow bg-yellow/40`
                          : ``
                      }
                      ${
                        asset.Status === 'GREEN'
                          ? `border-green bg-green/40`
                          : ``
                      }
                      ${asset.Status === 'RED' ? `border-red bg-red/40` : ``}
                      ${asset.Status === 'N/A' ? `border-gray bg-gray/40` : ``}
                    `}
                    >
                      <span className="font-medium pl-1">{`${asset.ThreatType.toUpperCase()}`}</span>
                      <span className="pr-1">{`Equip: ${asset.Equipment}  Threat: ${asset.Threat} Status: ${asset.Status}`}</span>
                    </div>

                    <div className="flex flex-row ml-2 items-center font-medium">
                      Schedulable: {asset.Schedulable ? <>✔️</> : <>❌</>}
                    </div>
                    <div className="flex flex-row ml-2 items-center font-medium">
                      OpStatus: {asset.Operational ? <>✔️</> : <>❌</>}
                    </div>
                    <span className=" ml-3 whitespace-nowrap">{`Located at Site: ${asset.SiteLocation}`}</span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default Reserve;
