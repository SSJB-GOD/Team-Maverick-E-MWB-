import React, { createContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    userid: null,
    questions: [],
  });

  // Update the global state
  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
