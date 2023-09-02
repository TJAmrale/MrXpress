// import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";

export default function GuestLayout() {
  const { token } = useUserContext();

  if (token) {
    return <Navigate to="/app" />;
  }

  return (
    <div>
      <Outlet /> {/* This acts as a placeholder where child components (nested routes) will be rendered */}
    </div>
  );
}
