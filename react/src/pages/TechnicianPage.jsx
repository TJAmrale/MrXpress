
import React, { useEffect } from 'react';
import { useUserContext } from "../contexts/UserProvider";
import axiosClient from "../axios-client";
import TechnicianPortal from "../components/TechnicianPortal"
import Footer from "../components/Footer"

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
        <Footer/>
    </div>
  );
}
 
export default TechnicianPage;
