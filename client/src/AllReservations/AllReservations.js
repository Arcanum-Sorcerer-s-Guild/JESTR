import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../App';
import Modal from './Modal';
import TableHeader from './TableHeader';
import ExportExcel from './Excelexport.js';
import ExportPDF from './ExportPDF';
import { useNavigate, useParams } from 'react-router-dom';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [temp, setTemp] = useState([]);
  const [showModale, setShowModale] = useState(false);
  const [render, setRender] = useState(true);
  const [pageSlice,setPageSlice] = useState([])
  const params = useParams();
  const [modaleChildren, setModaleChildren] = useState(
    <div>this is a big'ol test</div>
  );
  const { userData } = React.useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items",
      {
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReservations(data.d.results.sort());
        setTemp(data.d.results);

      });
  }, [render]);





  //This is for when an approver presses submit when changing the Reservation status
  const handleLogin = (e, id) => {
    e.preventDefault(); // prevent page reload
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([formJSON]),
    };
    fetch(
      `http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(${formJSON.Id})`,
      requestOptions
    )
      .then((response) => response.json())
      .then((userData) => {
        setShowModale(false);
        setRender(!render);
      });
  };

  const changeStatus = (status) => {
    if (typeof status === typeof 10) {
      const newData = temp.filter((item) => {
        return item.AuthorId === status;
      });
      setReservations(newData);
      
    } else {
      const newData = temp.filter((item) => {
        if (status === 'All') return typeof item.Status === typeof 'hello';
        return item.Status === status;
      });
      setReservations(newData);
    }
    navigate('/AllReservations/1')
  };

  const changePageClick = (page) => {
    if (parseInt(params.page) !== 1 && page === 'prev' || parseInt(params.page) !== Math.floor(reservations.length / 10)  && page === 'next') {
      if (page==='next') navigate(`/AllReservations/${parseInt(params.page) + 1}`) 
      if (page==='prev') navigate(`/AllReservations/${parseInt(params.page) - 1}`)
    }
  }

  useEffect(()=> {
    if(params.page !== undefined) {
      setPageSlice(reservations.slice((parseInt(params.page)-1) * 10, parseInt(params.page) * 10).sort())
    } else {
      navigate('/AllReservations/1')
    }  
  },[reservations,params])


  return (<>
     {/* <div className="grid place-items-center"> */}
     <div className="flex flex-row justify-center">
      <div className="mt-4 p-2 rounded-md shadow-md bg-purple/50 text-text text-center items-center">
        <h1 className="text-5xl items-center mt-10">Reservations</h1>
      </div>
      <div className="items-center bg-gray-light m-4">
        <button
          className="mt-4 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center"
          onClick={() => changeStatus('All')}
        >
          All
        </button>
        <button
          className="mt-4 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center"
          onClick={() => changeStatus('Approved')}
        >
          Approved
        </button>
        <button
          className="mt-4 p-2 m-4 w-36 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center"
          onClick={() => changeStatus(userData.Id)}
        >
          My Reservations
        </button>
        <button
          className="mt-10 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center"
          onClick={() => changeStatus('Pending')}
        >
          Pending
        </button>
        <button
          className="mt-4 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center"
          onClick={() => changeStatus('Rejected')}
        >
          Rejected
        </button>

      </div>
      <div className="items-center bg-gray-light m-4">
        <ExportExcel excelData={reservations} fileName={'Excel Export'} />
        <ExportPDF divId={'table'} title={'hello world'} />
      </div>
      <div className="bg-gray-lighter m-4 text-xs italic">
        *To edit a Reservation please contact an Approver
      </div>
    </div>


      <div className="mt-2">

        <div className="mt-2 flex flex-row justify-center">
          {/* <div class="overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
            {/* <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"> */}

              <div class="flex overflow-hidden content-center justify-center" id="table">
                <table class=" text-center content-center ml-32 mr-32 " id="bestTable">

                  {/* {console.log(document.getElementById('bestTable').rows.length, 'plz')} */}
                  <thread className="bg-bluer/75 text-gray/200 items-center">
                    <TableHeader />
                  </thread>

                  <tbody className="flex bg-bluer/75 divide-y bg-opacity-25 divide-y-gray/75 grid ">
                    {pageSlice.length > 0 ? pageSlice.map((list, i) => (
                      <tr key={i} className="hover:bg-primary/60 grid grid-cols-12 grid-container">
                        <td className="text-center text-m col-span-2" onClick={()=>navigate(`/Reservation/${list.Id}`)} >
                          {list.SiteLocation}
                        </td>
                        <td className="text-center text-m col-span-2">
                          {list.Threat}({list.Equipment})
                        </td>
                        <td className="text-center text-m col-span-2">{list.Squadron}</td>
                        <td className="text-center text-m col-span-2">
                          {list.EventDate}
                        </td>
                        <td className="text-center text-m col-span-2">{list.EndDate}</td>
                        <td className="text-center text-m col-span-2">
                          {userData.IsApprover === false ? (
                            list.Status
                          ) : list.Status === 'Approved' ? (
                            <button
                              type="button"
                              data-te-toggle="modal"
                              data-te-target="#exampleModal"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="bg-greener font-medium py-2 px-4 rounded-full col-span-2"
                              onClick={() => {
                                setModaleChildren(
                                  <>
                                    <form onSubmit={handleLogin}>
                                      <label htmlFor="Notes">Remarks</label>
                                      <input
                                        name="Notes"
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <label htmlFor="Status">
                                        Choose a Status
                                      </label>
                                      <select name="Status" id="Status">
                                        <option
                                          value="Rejected"
                                          defaultValue={'Rejected'}
                                        >
                                          Reject
                                        </option>
                                        <option value="Approved">
                                          Approve
                                        </option>
                                      </select>
                                      <input
                                        name="Id"
                                        value={list.Id}
                                        hidden
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                        submit
                                      </button>
                                    </form>
                                  </>
                                );
                                setShowModale(true);
                              }}
                            >
                              {list.Status}
                            </button>
                          ) : list.Status === 'Rejected' ? (
                            <button
                              type="button"
                              data-te-toggle="modal"
                              data-te-target="#exampleModal"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="bg-red font-medium py-2 px-4 rounded-full"
                              onClick={() => {
                                setModaleChildren(
                                  <>
                                    <form onSubmit={handleLogin}>
                                      <label htmlFor="Notes">Remarks</label>
                                      <input
                                        name="Notes"
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <label htmlFor="Status">
                                        Choose a Status
                                      </label>
                                      <select name="Status" id="Status">
                                        <option
                                          value="Rejected"
                                          defaultValue={'Rejected'}
                                        >
                                          Reject
                                        </option>
                                        <option value="Approved">
                                          Approve
                                        </option>
                                      </select>
                                      <input
                                        name="Id"
                                        value={list.Id}
                                        hidden
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                        submit
                                      </button>
                                    </form>
                                  </>
                                );
                                setShowModale(true);
                              }}
                            >
                              {list.Status}
                            </button>
                          ) : (
                            <button
                              type="button"
                              data-te-toggle="modal"
                              data-te-target="#exampleModal"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="bg-gray py-2 px-4 rounded-full"
                              onClick={() => {
                                setModaleChildren(
                                  <>
                                    <form onSubmit={handleLogin}>
                                      <label htmlFor="Notes">Remarks</label>
                                      <input
                                        name="Notes"
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <label htmlFor="Status">
                                        Choose a Status
                                      </label>
                                      <select name="Status" id="Status">
                                        <option
                                          value="Rejected"
                                          defaultValue={'Rejected'}
                                        >
                                          Reject
                                        </option>
                                        <option value="Approved">
                                          Approve
                                        </option>
                                      </select>
                                      <input
                                        name="Id"
                                        value={list.Id}
                                        hidden
                                        type="text"
                                        placeholder="Enter Remarks Here..."
                                      />
                                      <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                        submit
                                      </button>
                                    </form>
                                  </>
                                );
                                setShowModale(true);
                              }}
                            >
                              {list.Status}
                            </button>
                          )}
                        </td>
                      </tr>
                    )):<></>}
                  </tbody>
                </table>
              </div>
              <Modal
                isvisible={showModale}
                onClose={() => {
                  setShowModale(false);
                }}
              >
                {modaleChildren}
              </Modal>
            </div>
            <Modal
              isvisible={showModale}
              onClose={() => {
                setShowModale(false);
              }}
            >
              {modaleChildren}
            </Modal>
      </div>
    
      <div className="flex flex-row justify-center gap-10 mt-5">

        <button className="bg-primary border border-black rounded-lg" onClick={()=>changePageClick('prev')}>
          Prev Page
        </button>

        <span className="text-text">{`${params.page} of ${Math.floor(reservations.length / 10)}`}</span>

        <button className="bg-primary border border-black rounded-lg" onClick={()=>changePageClick('next')}>
          Next Page
        </button>

      </div>

        {/* </div> */}
      {/* // </div> */}
    {/* // </div> */}
  </>);
};

export default AllReservations;
