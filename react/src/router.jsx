import { Outlet, createBrowserRouter } from "react-router-dom";
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
import SuperAdminDashboard from "./pages/SuperAdminDashboard.jsx";

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
      // Route to display a page specifically for technicians
      {
        path: "technician",
        element: (
          <RouteGuard requiredLevels={[1, 2, 3]}>
            <TechnicianDashboard />
          </RouteGuard>
        ),
      },
      {
        path: "admin",
        element: (
          <RouteGuard requiredLevels={[1, 2]}>
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
        ],
      },
      {
        path: "superadmin",
        element: (
          <RouteGuard requiredLevels={[1]}>
            <SuperAdminDashboard />
          </RouteGuard>
        ),
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
