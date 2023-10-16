// import React from 'react';
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";
import LoadingScreen from "./LoadingScreen";
import NotFoundPage from "./../pages/NotFoundPage";

export default function AuthenticatedLayout() {
  const { token, isLoading } = useUserContext();
  console.log(token);
  console.log(isLoading);

  if (!token) {
    if (isLoading) {
      return <LoadingScreen />;
    }

    return <NotFoundPage />;
  }

  return (
    <>
      <Outlet />{" "}
      {/* This acts as a placeholder where child components (nested routes) will be rendered */}
    </>
  );
}
