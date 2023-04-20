import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';

//icons
import { AiFillCloseCircle } from 'react-icons/ai';

const EditAsset = ({ showModal, setShowModal }) => {
  const { listUrl } = useContext(Context);
  const { userData } = useContext(Context);
  const [inputs, setInputs] = useState();
  const [isManned, setIsManned] = useState(false);
  const [schedulable, setSchedulable] = useState(false);
  const [operational, setOperational] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([inputs]),
    };

    fetch(
      `${listUrl}/GetByTitle('Assets')/items(1)`,
      reqOpts
    )
      .then((res) => console.log(res.json()))
      .then(setShowModal(false));
    navigate("/AllAssets");
  };


  return (
    <>
      <div className={showModal ? '' : 'hidden'}>
        <div
          id="wrapper"
          className="fixed inset-0 bg-gray bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="relative overflow-hidden bg-text rounded">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
            <form className="flex justify-center" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="flex flex-col w-full p-5">
                  <div className="rounded-lg flex flex-col">
                    <div className="flex">
                      <span className="font-bold">Entry Id:</span>
                      <span className="px-2">{`AUTO GENERATED`}</span>
                    </div>
                    <hr className="text-gray" />
                  </div>

                  <div className="flex mt-4 gap-2">
                    <div className="flex w-1/2">
                      <span className="mr-2">Serial: </span>
                      <input
                        name="Serial"
                        id="Serial"
                        className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                        defaultValue={""}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <span className="mr-2">Type: </span>
                      <select
                        name="ThreatType"
                        id="ThreatType"
                        className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs border-none"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue={"Unmanned"}
                      >
                        <option
                          value="Unmanned"
                        >
                          UNMANNED
                        </option>

                        <option
                          value="Manned"
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
                        className="bg-gray-light/60 w-full rounded-sm px-2 text-xs"
                        onChange={(e) => handleChange(e)}
                        defaultValue={""}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <span className="mr-2">Threat: </span>
                      <input
                        name="Threat"
                        className="bg-gray-light/60 w-full rounded-sm px-2 text-xs"
                        onChange={(e) => handleChange(e)}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 bg-gray/70 rounded p-2 mt-2">
                    <div className="flex">
                      <span className="mr-2">Lat: </span>
                      <input
                        name="Latitude"
                        className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={""}
                      />
                      <span className="mx-2 ">Long: </span>
                      <input
                        name="Longitude"
                        className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={""}
                      />
                      <span className="mx-2">Elevation: </span>
                      <input
                        name="Elevation"
                        className="bg-gray-light/60 w-1/2 rounded-sm text-xs border-none text-center"
                        onChange={(e) => handleChange(e)}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="mr-2">Coordination Source: </p>
                    <input
                      name="CoordSource"
                      type="text"
                      className="bg-gray-light/70 rounded-sm text-xs border-none w-full mt-1"
                      onChange={(e) => handleChange(e)}
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col gap-2 bg-gray/70 rounded p-2 mt-2">
                    <div className="flex flex-col">
                      <span className="mb-2">Range:</span>
                      <input
                        name="Range"
                        className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2">Site Location:</span>
                      <input
                        name="Range"
                        className="bg-gray-light/60 w-full h-1/2 rounded-sm px-2 text-xs"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="flex my-2">
                    <span className="mr-2">Current Status:</span>
                    <input
                      name="Curr Status"
                      className="bg-gray-light/60 rounded-sm px-2 text-xs"
                      onChange={(e) => handleChange(e)}
                      defaultValue={""}
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
              </div>
              <div className="w-1/2 p-5">
                <h3 className="font font-semibold">System Information</h3>
                <hr className="text-gray" />
                <div className="flex text-xs mt-2">
                  <span className="mr-2">info: </span>
                  <input
                    name="SystemInformation"
                    className="bg-gray-light/60 w-full rounded-sm px-2 text-xs"
                    defaultValue={""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    name="Remarks"
                    className="rounded w-full text-xs border-gray"
                    rows="8"
                    cols="20"
                    defaultValue={""}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    onClick={handleSubmit}
                    className="block rounded-lg bg-blue text-text text-semibold p-2 justify-center w-full"
                  >
                    Submit
                  </button>
                </div>
                <div className="flex flex-col gap-1 text-xs text-gray-dark/50 mt-2 bg-gray-light/70 rounded p-2">
                  <div>
                    <span className="mr-2">ETIC:</span>
                    <span>{``}</span>
                  </div>
                  <div>
                    <span className="mr-2">Created:</span>
                    <span>{``}</span>
                  </div>
                  <div>
                    <span className="mr-2">Modified:</span>
                    <span>{``}</span>
                  </div>
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



