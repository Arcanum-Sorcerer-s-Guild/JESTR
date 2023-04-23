const apiurl = 'http://localhost:3001';

export const userRegisterPost = (payload, setData) => {
  fetch(`${apiurl}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    });
};
export const userLoginFetchPost = (payload, setData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  };

  fetch(`${apiurl}/user/login`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    });
};

export const userDetailsFetch = (setData) => {
  let reqOpts = {
    method: 'GET',
    'Access-Control-Allow-Origin': '*',
    credentials: 'include',
  };

  return fetch(`${apiurl}/user/details`, reqOpts)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      setData(data);
    });
};
export const userListFetch = (setData) => {
  let reqOpts = {
    method: 'GET',
    'Access-Control-Allow-Origin': '*',
    credentials: 'include',
  };

  return fetch(`${apiurl}/user/list`, reqOpts)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      setData(data);
    });
};
export const userSignOut = (setData) => {
  return fetch(`${apiurl}/user/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'logout successful') {
        // Clear Session Storage
        localStorage.clear();
        setData({});
        // navigate('/');
      }
    });
};

export const listFetch = (listname, setData) => {
  return fetch(`${apiurl}/_api/web/lists/GetByTitle('${listname}')/items`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    });
};

export const listItemGet = (listname, itemNumber, setData) => {
  let reqOpts = {
    credentials: 'include',
  };
  fetch(
    `${apiurl}/_api/web/lists/GetByTitle('${listname}')/items(${itemNumber})`,
    reqOpts
  )
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    });
};

export const listFetchItemPUT = (listname, itemNumber, formJSON, setData) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify([formJSON]),
  };
  return fetch(
    `${apiurl}/_api/web/lists/GetByTitle('${listname}')/items(${itemNumber})`,
    requestOptions
  )
    .then((response) => response.json())
    .then((userData) => {
      setData(userData);
    });
};
export const listFetchItemPOST = (listname, formJSON, setData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formJSON),
    credentials: 'include',
  };
  return fetch(
    `${apiurl}/_api/web/lists/GetByTitle('${listname}')/items`,
    requestOptions
  )
    .then((response) => response.json())
    .then((userData) => {
      setData(userData);
    });
};

export const listFetchItemDELETE = (listname, itemNumber, setData) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  fetch(
    `${apiurl}/GetByTitle('${listname}')/items(${itemNumber})`,
    requestOptions
  ).then((res) => {
    setData(res);
  });
};
