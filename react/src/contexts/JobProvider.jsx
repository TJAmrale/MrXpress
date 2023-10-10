/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobId, setJobId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  return (
    <JobContext.Provider value={{ jobId, setJobId, customerId, setCustomerId }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  return useContext(JobContext);
};
