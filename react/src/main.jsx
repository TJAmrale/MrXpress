import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the App with the RouterProvider to enable routing capabilities
    The 'router' prop provides the routing configuration to the RouterProvider */}
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
