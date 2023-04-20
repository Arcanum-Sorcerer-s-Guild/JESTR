import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//icons
import { AiFillCloseCircle } from 'react-icons/ai';

const EditAsset = ({ showModal, setShowModal, asset, onClose }) => {
  const [inputs, setInputs] = useState();
  const [schedulable, setSchedulable] = useState();
  const [operational, setOperational] = useState();
  const navigate = useNavigate();

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

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
          className="fixed inset-0 bg-blue-darker bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >
          <div className="relative overflow-hidden bg-blue-darker rounded">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <div className="flex justify-around text-xs text-gray-light/50 bg-gray-dark p-3">
              <div>
                <span className="mr-2">ETIC:</span>
                <span>{`${asset.ETIC}`}</span>
              </div>
              <div>
                <span className="mr-2">Created:</span>
                <span>{`${asset.created}`}</span>
              </div>
              <div>
                <span className="mr-2">Modified:</span>
                <span>{`${asset.modified}`}</span>
              </div>
            </div>
            <form className="flex justify-center p-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="flex flex-col w-full p-3">
                  <div className="rounded-lg flex flex-col">
                    <div className="flex">
                      <span className="font-bold">Entry Id:</span>
                      <span className="px-2">{`${asset.Id}`}</span>
                    </div>
                    <hr className="text-gray-light" />
                  </div>

                  <div className="flex my-4 gap-2">
                    <div className="flex w-1/2">
                      <span className="mr-2">Serial: </span>
                      <input
                        name="Serial"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Serial}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <span className="mr-2">Type: </span>
                      <select
                        name="ThreatType"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs border-none"
                        onChange={(e) => handleChange(e)}
                      >
                        <option
                          value="Unmanned"
                          selected={
                            asset.ThreatType === 'Unmanned' ? 'selected' : ''
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
                  <div className="flex gap-2">
                    <div className="flex w-1/2">
                      <span className="mr-2">Equip: </span>
                      <input
                        name="Equip"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Equipment}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <span className="mr-2">Threat: </span>
                      <input
                        name="Threat"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Threat}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 bg-gray/70 rounded p-2 mt-2">
                    <div className="flex">
                      <span className="mr-2">Lat: </span>
                      <input
                        name="Latitude"
                        className="bg-gray-dark w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Latitude}
                      />
                      <span className="mx-2 ">Long: </span>
                      <input
                        name="Longitude"
                        className="bg-gray-dark w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Longitude}
                      />
                      <span className="mx-2">Elevation: </span>
                      <input
                        name="Elevation"
                        className="bg-gray-dark w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={asset.Elevation}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 bg-gray/70 rounded p-2 mt-2">
                    <div className="flex w-1/2">
                      <span className="mr-2">Range:</span>
                      <input
                        name="Range"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                        defaultValue={asset.Range}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <span className="mr-2">Site:</span>
                      <input
                        name="Range"
                        className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                        defaultValue={asset.SiteLocation}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 bg-gray/70 rounded p-2 mt-2">
                    <span className="mr-2">Current Status:</span>
                    <input
                      name="Curr Status"
                      className="bg-gray-dark rounded-sm px-2 text-xs"
                      onChange={(e) => handleChange(e)}
                      defaultValue={asset.Status}
                    />
                    <div className="flex ml-4">
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
                </div>
                <div className="mt-2 text-xs">
                  <p className="mr-2">Coordination Source: </p>
                  <input
                    name="CoordSource"
                    type="text"
                    className="bg-gray-dark rounded-sm text-xs border-none w-full mt-1"
                    onChange={(e) => handleChange(e)}
                    defaultValue={asset.CoordSource}
                  />
                </div>
              </div>

              <div className="w-1/2 p-5">
                <h3 className="font font-semibold text-center">
                  System Information Remarks & Comments
                </h3>
                <div className="flex text-xs mt-2">
                  <span className="mr-2">Title: </span>
                  <input
                    name="SystemInformation"
                    className="bg-gray-dark w-full rounded-sm px-2 text-xs"
                    defaultValue={asset.SystemInformation}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    name="Remarks"
                    className="rounded w-full text-xs bg-gray-dark border-none"
                    rows="9"
                    cols="50"
                    defaultValue={asset.Remarks}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    onClick={handleSubmit}
                    className="block rounded-lg bg-blue text-text text-semibold p-2 justify-center w-full mt-1"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <button
              className="text-gray text=xl place-self-end absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAsset;
