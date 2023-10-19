import React, { useEffect } from 'react';
import { useUserContext } from "../contexts/UserProvider";
import axiosClient from "../axios-client";
import TechnicianPortal from "../components/TechnicianPortal"

function TechnicianPage() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data); 
        console.log(data);
      })
  }, []);

  return (
    <div>
        <TechnicianPortal technician={user} />
    </div>
  );
}
 
export default TechnicianPage;
