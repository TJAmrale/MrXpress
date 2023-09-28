// Disable specific linting rules
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

/*
import { createContext, useContext, useEffect, useState } from "react";

// Create a user context for shared state (with default value)
const UserContext = createContext({
  user: {
      name: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
  },
  token: null,
  accessLevel: null,
  setUser: () => {},
  setToken: () => {},
  setAccessLevel: () => {},
});

// UserProvider component that manages user and token state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });
  const [token, setTokenState] = useState();
  const [accessLevel, setAccessLevelState] = useState();

  // On initial load, check if a token exists in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      setTokenState(storedToken); // If token exists, update state
      setAccessLevelState(localStorage.getItem("USER_ACCESS_LEVEL"));

      const storedUserData = JSON.parse(localStorage.getItem("USER_DATA"));
      if (storedUserData) {
        setUser(storedUserData);
      }
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

  // This function can be used to store accessLevel
  const setAccessLevel = (level) => {
    setAccessLevelState(level);
    if (level) {
      localStorage.setItem("USER_ACCESS_LEVEL", level);
    } else {
      localStorage.removeItem("USER_ACCESS_LEVEL");
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("USER_DATA", JSON.stringify(userData));
  };

  // Return the context provider with current user and token values.
  // All child components will have access to these values.
  return (
    <UserContext.Provider value={{ user, token, accessLevel, setUser, setToken, setAccessLevel, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
*/