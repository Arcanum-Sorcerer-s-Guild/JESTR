import React, { useState, useEffect } from 'react'
import { Context } from '../App';


const AllAssets = () => {
  const {userData, setUserdata} = React.useContext(Context)

  const [currItems, setCurrItems] = useState([]);

  async function updateInventory() {
    // Retrieves all database items
    fetch(`http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items`)
    .then(res => res.json())
    .then(items => setCurrItems(items.d.results))
  }

  useEffect(() => {
    // Gets all items from the database
    updateInventory()
  }, [])
``
  return (
  <>
    {console.log(currItems)}
    <h1>AllAssets</h1>
    <div>
      {currItems.map(item => {
        return <div>
          <div>{item.Id}</div>
          <div>{item.Operational ? "GREEN" : "RED"}</div>
          <div>{item.Threat}</div>
        </div>
      })}
    </div>
  </>
  )
}

export default AllAssets;
