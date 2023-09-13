/* eslint-disable react/prop-types */

import { useUserContext } from "../contexts/UserProvider";
import { Navigate } from 'react-router-dom';

function RouteGuard({ requiredLevels, children }) {
  let { accessLevel } = useUserContext();
  accessLevel = Number(accessLevel); // When we get accessLevel from localStorage, it is a string

  if (!requiredLevels.includes(accessLevel)) {
    return <Navigate to="/" />; // Redirect to the homepage
  }

  return children;
}

export default RouteGuard;