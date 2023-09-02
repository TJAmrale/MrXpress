// import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";

export default function AuthenticatedLayout() {
  const { token } = useUserContext();
  console.log(token);

  //TODO Handle this case:
  if (token === undefined) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet /> {/* This acts as a placeholder where child components (nested routes) will be rendered */}
    </>
  );
}
