// import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";

export default function AuthenticatedLayout() {
  // lúc này component AuthenticatedLayout lấy giá trị của user và token từ các bậc cha của nó
  const { token } = useUserContext();
  console.log(token);

  // if (token === undefined) {
  //   return <div>Loading...</div>;
  // }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* This acts as a placeholder where child components (nested routes) will be rendered */}
      <Outlet />
    </div>
  );
}
