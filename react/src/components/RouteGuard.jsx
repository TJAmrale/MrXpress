/* eslint-disable react/prop-types */

import { useUserContext } from "../contexts/UserProvider";
import UnauthorizedAccess from "./UnauthorisedAccess";

function RouteGuard({ requiredLevels, children }) {
  let { accessLevel } = useUserContext();
  accessLevel = Number(accessLevel); // When we get accessLevel from localStorage, it is a string

  if (!requiredLevels.includes(accessLevel)) {
    return <UnauthorizedAccess />; // Redirect to the homepage
  }

  return children;
}

export default RouteGuard;