import { Outlet, Route, createBrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import RouteGuard from "./components/RouteGuard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import TechnicianPage from "../src/pages/TechnicianPage.jsx"
import ManageUsersPage from "./pages/ManageUsersPage.jsx";
import ManageUserForm from "./pages/ManageUserForm.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BookARepairPage from "./pages/BookARepairPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PaymentStatusPage from "./pages/PaymentStatusPage.jsx";
import ManageStockPage from "./pages/ManageStockPage.jsx";
import ManageStockForm from "./pages/ManageStockForm.jsx";
import ManageDevicePage from "./pages/ManageDevicePage.jsx";
import ManageDeviceForm from "./pages/ManageDeviceForm.jsx";
import ManageItemPage from "./pages/ManageItemPage.jsx";
import ManageItemForm from "./pages/ManageItemForm.jsx";
import ManageBrandPage from "./pages/ManageBrandPage.jsx";
import ManageBrandForm from "./pages/ManageBrandForm.jsx";
import ManageSeriesPage from "./pages/ManageSeriesPage.jsx";
import ManageSeriesForm from "./pages/ManageSeriesForm.jsx";
import InvoiceView from "./components/InvoiceView.jsx";
import TechnicianPortal from "./components/TechnicianPortal.jsx";

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
        children: [
          {
            path: "",
            element: (
              <RouteGuard requiredLevels={[3]}>
                <BookARepairPage />
              </RouteGuard>
            ),
          },
          {
            path: "payment",
            children: [
              {
                path: "",
                element: (
                  <RouteGuard requiredLevels={[3]}>
                    <PaymentPage />
                  </RouteGuard>
                ),
              },
              {
                path: "status",
                element: (
                  <RouteGuard requiredLevels={[3]}>
                    <PaymentStatusPage />
                  </RouteGuard>
                )
              }
            ],
          },
        ],
      },
      // Route to display a page specifically for technicians
      {
        path: "technician",
        element: (
          <RouteGuard requiredLevels={[2]}>
            <Outlet />
          </RouteGuard>
        ),
        children: [
          {
            path: "",
            element: <TechnicianPage />
          },

          {
            path: "invoice",
            element: <InvoiceView />,
          },

        ],
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
            path: "test",
            element: <TechnicianPage />,
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
            path: "device/new",
            element: <ManageDeviceForm key="DeviceCreate" />,
          },
          {
            path: "device/:device_id",
            element: <ManageDeviceForm key="DeviceUpdate" />,
          },
          {
            path: "item",
            element: <ManageItemPage/>,
          },
          {
            path: "item/new",
            element: <ManageItemForm key="ItemCreate" />,
          },
          {
            path: "item/:item_id",
            element: <ManageItemForm key="ItemUpdate" />,
          },
          {
            path: "brand",
            element: <ManageBrandPage/>,
          },
          {
            path: "brand/new",
            element: <ManageBrandForm key="BrandCreate" />,
          },
          {
            path: "brand/:brand_id",
            element: <ManageBrandForm key="BrandUpdate" />,
          },
          {
            path: "series",
            element: <ManageSeriesPage/>,
          },
          {
            path: "series/new",
            element: <ManageSeriesForm key="SeriesCreate" />,
          },
          {
            path: "series/:series_id",
            element: <ManageSeriesForm key="SeriesUpdate" />,
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
