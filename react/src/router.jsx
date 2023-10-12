import { Outlet, Route, createBrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import RouteGuard from "./components/RouteGuard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import TechnicianDashboard from "./pages/TechnicianDashboard.jsx";
import ManageUsersPage from "./pages/ManageUsersPage.jsx";
import ManageUserForm from "./pages/ManageUserForm.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BookARepairPage from "./pages/BookARepairPage.jsx";
import ManageStockPage from "./pages/ManageStockPage.jsx";
import ManageStockForm from "./pages/ManageStockForm.jsx";
import ManageDevicePage from "./pages/ManageDevicePage.jsx";
import ManageDeviceForm from "./pages/ManageDeviceForm.jsx";

// Define the router configuration using `createBrowserRouter`
const router = createBrowserRouter([
  // Authenticated routes
  {
    path: "/app",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "",
        element: <IndexPage />,
      },
      {
        path: "book-repair",
        element: (
          <RouteGuard requiredLevels={[3]}>
            <BookARepairPage />
          </RouteGuard>
        )
      },
      // Route to display a page specifically for technicians
      {
        path: "technician",
        element: (
          <RouteGuard requiredLevels={[2]}>
            <TechnicianDashboard />
          </RouteGuard>
        ),
      },
      {
        path: "admin",
        element: (
          <RouteGuard requiredLevels={[1]}>
            <Outlet />
          </RouteGuard>
        ),
        children: [
          {
            path: "",
            element: <AdminDashboard />, 
          },
          {
            path: "users",
            element: <ManageUsersPage />,
          },
          {
            path: "users/new",
            element: <ManageUserForm key="userCreate" />,
          },
          {
            path: "users/:id",
            element: <ManageUserForm key="userUpdate" />,
          },
          {
            path: "stock",
            element: <ManageStockPage/>,
          },
          {
            path: "stock/new",
            element: <ManageStockForm key="stockCreate" />,
          },
          {
            path: "stock/:stock_id",
            element: <ManageStockForm key="stockUpdate" />,
          },
          {
            path: "device",
            element: <ManageDevicePage/>,
          },
          {
            path: "Device/new",
            element: <ManageDeviceForm key="DeviceCreate" />,
          },
          {
            path: "Device/:device_id",
            element: <ManageDeviceForm key="DeviceUpdate" />,
          },

        ],
      },
    ],
  },

  // Guest-specific routes, for users not logged in
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "",
        element: <IndexPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // Fallback route - this will display when no other routes match
  // It's commonly used to display a 404 Not Found page
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
