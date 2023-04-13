import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../App';

const AdminStats = () => {
  const { listUrl } = useContext(Context);
  const [lists, setLists] = useState([]);

  useEffect(()=>{
    fetch(`${listUrl}/GetByTitle('Assets')/items`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.d.results[0].AuthorId);
      setLists(data.d.results);
    });
  },[])

  return(<>
    <div>AdminStats</div>
  </>)
}

export default AdminStats