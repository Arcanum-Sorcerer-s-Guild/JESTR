import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAsset = ({ showModal, setShowModal, asset }) => {
  const [inputs, setInputs] = useState();
  const [schedulable, setSchedulable] = useState();
  const [operational, setOperational] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setSchedulable(asset.Schedulable);
    setOperational(asset.Operational);
  }, [asset]);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'Schedulable') {
      value = e.target.checked;
      setSchedulable(value);
    }
    if (name === 'Operational') {
      value = e.target.checked;
      setOperational(value);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let reqOpts = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([inputs]),
    };

    fetch(
      `http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(${asset.Id})`,
      reqOpts
    )
      .then((res) => console.log(res.json()))
      .then(setShowModal(false));
    navigate(0);
  };

  return (
    <>
      <div className={showModal ? '' : 'hidden'}>
        <div
          id="wrapper"
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="relative md:w-[60%] w-[90%] flex flex-col">
            <div className="h-2/3 block relative overflow-hidden rounded-lg bg-text justify-center">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />

              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="w-1/2">
                    <div className="flex flex-col w-full p-5">
                      <div className="rounded-lg flex flex-col">
                        <div className="flex">
                          <span className="">Entry Id:</span>
                          <span className="px-2">{`${asset.Id}`}</span>
                        </div>
                        <hr className="text-gray" />
                      </div>

                      <div className="flex mt-4 gap-2">
                        <div className="flex w-1/2">
                          <span className="mr-2">Serial: </span>
                          <input
                            name="Serial"
                            className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Serial}
                          />
                        </div>
                        <div className="flex w-1/2">
                          <span className="mr-2">Type: </span>
                          <select
                            name="ThreatType"
                            className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs border-none"
                            onChange={(e) => handleChange(e)}
                          >
                            <option
                              value="Unmanned"
                              selected={
                                asset.ThreatType === 'Unmanned'
                                  ? 'selected'
                                  : ''
                              }
                            >
                              UNMANNED
                            </option>

                            <option
                              value="Manned"
                              selected={
                                asset.ThreatType === 'Manned' ? 'selected' : ''
                              }
                            >
                              MANNED
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="flex w-1/2">
                          <span className="mr-2">Equip: </span>
                          <input
                            name="Serial"
                            className="bg-gray-light/60 w-full rounded-sm px-2 text-xs"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Equipment}
                          />
                        </div>
                        <div className="flex w-1/2">
                          <span className="mr-2">Threat: </span>
                          <input
                            name="Serial"
                            className="bg-gray-light/60 w-full rounded-sm px-2 text-xs"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Threat}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 bg-gray rounded p-2 mt-2">
                        <div className="flex">
                          <span className="mr-2">Lat: </span>
                          <input
                            name="Latitude"
                            className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Latitude}
                          />
                          <span className="mx-2 ">Long: </span>
                          <input
                            name="Longitude"
                            className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Longitude}
                          />
                          <span className="mx-2">Elevation: </span>
                          <input
                            name="Elevation"
                            className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                            onChange={(e) => handleChange(e)}
                            defaultValue={asset.Elevation}
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs">
                        <p className="mr-2">Coord Source: </p>
                        <input
                          name="CoordSource"
                          type="text"
                          className="bg-gray-light/60 rounded-sm text-xs border-none w-full mt-1"
                          onChange={(e) => handleChange(e)}
                          defaultValue={asset.CoordSource}
                        />
                      </div>
                      <div className="flex flex-col gap-2 bg-gray rounded p-2 mt-2">
                        <div className="flex flex-col">
                          <span className="mr-2">Range:</span>
                          <input
                            name="Range"
                            className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                            defaultValue={asset.Range}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">Site Location:</span>
                          <input
                            name="Range"
                            className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                            defaultValue={asset.SiteLocation}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="flex my-2">
                        <span className="mr-2">Current Status:</span>
                        <input
                          name="Curr Status"
                          className="bg-gray-light/60 h-1/2 rounded-sm px-2 text-xs"
                          onChange={(e) => handleChange(e)}
                          defaultValue={asset.Status}
                        />
                      </div>
                      <div className="flex mt-2 text-xs">
                        <div className="flex">
                          <div className="flex gap-1 mr-4">
                            <span>Ops Status</span>
                            <input
                              type="checkBox"
                              name="Operational"
                              checked={operational}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                          <div className="flex gap-1">
                            <span>Schedulable</span>
                            <input
                              type="checkBox"
                              name="Schedulable"
                              checked={schedulable}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="border border-black block rounded-lg flex flex-row">
                          <span>Equipment:</span>
                          <input
                            name="Equipment"
                            defaultValue={asset.Equipment}
                            onChange={(e) => handleChange(e)}
                          />
                          <div>Threat:</div>
                          <input
                            name="Threat"
                            defaultValue={asset.Threat}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div> */}
                    </div>

                    <div></div>
                  </div>
                  <div className="w-1/3 p-5 font-medium">
                    <span>System Information</span>{' '}
                    <input
                      name="SystemInformation"
                      defaultValue={asset.SystemInformation}
                      onChange={(e) => handleChange(e)}
                    />
                    <textarea
                      name="Remarks"
                      className="mt-3"
                      rows="8"
                      cols="50"
                      defaultValue={asset.Remarks}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className="flex flex-row">
                      <div>
                        <div>{`ETIC: ${asset.ETIC}`}</div>
                        <div>{`Created: ${asset.created}`}</div>
                        <div>{`Modified: ${asset.modified}`}</div>
                      </div>
                      <div>
                        <button
                          onClick={handleSubmit}
                          className="border border-black block rounded-lg bg-blue p-2 justify-center w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button
                className="text-black text=xl place-self-end absolute right-2 top-2"
                onClick={() => setShowModal(false)}
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAsset;
