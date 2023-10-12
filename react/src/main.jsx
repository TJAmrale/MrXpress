import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/styles/custom.scss";
import router from "./router.jsx";
// import App from "./App.jsx";
import { UserProvider } from "./contexts/UserProvider.jsx";
import { RepairProvider } from "./contexts/RepairProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the App with the RouterProvider to enable routing capabilities
    The 'router' prop provides the routing configuration to the RouterProvider */}
    <UserProvider>
      <RepairProvider>
        <RouterProvider router={router} />
      </RepairProvider>
    </UserProvider>
  </React.StrictMode>
);
