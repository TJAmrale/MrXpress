/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

// Create a user context for shared state (with default value)
const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Andrew'
  });
  const [token, setTokenState] = useState(123);

  // On initial load, check if a token exists in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  // Whenever token state changes, update local storage
  const setToken = (newToken) => {
    setTokenState(newToken);

    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
