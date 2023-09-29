// import React from 'react';
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";
import NotFoundPage from './../pages/NotFoundPage';

export default function AuthenticatedLayout() {
  const { token } = useUserContext();
  console.log(token);

  //TODO Handle this case (If I really need it?)
  if (token === undefined) {
    // return <div>Loading...</div>;
    // return <Loading />;
  }

  if (!token) {
    // debugger;
    return <NotFoundPage />;
  }

  return (
    <>
      <Outlet /> {/* This acts as a placeholder where child components (nested routes) will be rendered */}
    </>
  );
}
