// Disable specific linting rules
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

// Create a user context for shared state (with default value)
const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// UserProvider component that manages user and token state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setTokenState] = useState();

  // On initial load, check if a token exists in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      setTokenState(storedToken);  // If token exists, update state
    }
  }, []);

  // Whenever token state changes, update local storage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken); // Store new token in local storage if it exists
    } else {
      localStorage.removeItem("ACCESS_TOKEN"); // Remove token from local storage if it's null
    }
  };

  // Return the context provider with current user and token values.
  // All child components will have access to these values.
  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
