/* eslint-disable react/prop-types */

import { useUserContext } from "../contexts/UserProvider";
import NotFoundPage from "../pages/NotFoundPage";

function RouteGuard({ requiredLevels, children }) {
  let { accessLevel } = useUserContext();
  accessLevel = Number(accessLevel); // When we get accessLevel from localStorage, it is a string

  if (!requiredLevels.includes(accessLevel)) {
    return <NotFoundPage />; 
  }

  return children;
}

export default RouteGuard;