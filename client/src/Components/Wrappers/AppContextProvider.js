import React from 'react';
import AppContext from '../../Context/AppContext.js';

//done
const AppContextProvider = ({ children, value }) => {
  return (
    <AppContext.Provider value={value}>
      <>{children}</>
    </AppContext.Provider>
  );
};
export default AppContextProvider;
