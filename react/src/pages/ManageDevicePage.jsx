import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";

const ManageDevice = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDevices();
  }, []);

  // Fetch all devices from API
  const getDevices = () => {
    setLoading(true);
    axiosClient
      .get("/device")
      .then(({ data }) => {
        setLoading(false);
        console.log(data)
        setDevices(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // onDelete function to handle device deletion
  const onDelete = (device) => {
    if (!window.confirm("Are you sure you want to delete this device?")) {
      return;
    }

    axiosClient.delete(`/device/${device.device_id}`).then(() => {
      getDevices();
    });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="manage-device">
        <div className="heading">
          <h2>Manage Devices</h2>
          <Link to="/app/admin/device/new" className="btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Brand ID</th>
                <th>Brand Name</th>
                <th>Series ID</th>
                <th>Series Name</th>
                <th>Model</th>
                <th>Colours</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <tr key={device.device_id}>
                    <td>{device.device_id}</td>
                    <td>{device.brand_id}</td>
                    <td>{device.brand?.brand_name}</td>
                    <td>{device.series_id}</td>
                    <td>{device?.series?.series_name}</td>
                    <td>{device.model}</td>
                    <td>{device.colours}</td>
                    <td>{device.created_at}</td>
                    <td>{device.updated_at}</td>
                    <td>
                      <Link to={"/app/admin/device/" + device.device_id}>Edit</Link> 
                      <button onClick={() => onDelete(device)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ManageDevice;
