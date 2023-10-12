/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const RepairContext = createContext();

export const RepairProvider = ({ children }) => {
  const [customerSelection, setCustomerSelection] = useState(null);

  return (
    <RepairContext.Provider value={{ customerSelection, setCustomerSelection }}>
      {children}
    </RepairContext.Provider>
  );
};

export const useRepair = () => {
  return useContext(RepairContext);
};
