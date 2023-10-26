import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';
import {FaRegEdit } from "react-icons/fa";
import {HiTrash } from "react-icons/hi";



const ManageSeriesPage = () => {
  const [series, setseries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getseries();
  }, []);

  // Fetch all series from API
  const getseries = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get("/series")
      .then(({ data }) => {
        setLoading(false);
        setseries(data.data); // Update the series state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
  };

  // onDelete function to handle series deletion
  const onDelete = (series) => {
    if (!window.confirm("Are you sure you want to delete this series?")) {
      return;
    }

    // Make API call to delete the series
    axiosClient.delete(`/series/${series.series_id}`).then(() => {
      // Refresh the series list
      getseries();
    });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="manage-series">
        <div className="heading">
          <h2>Manage series</h2>
          <Link to="/app/admin/series/new" className="add btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <Table responsive striped>
            <thead>
              <tr>
                <th>series ID</th>
                <th>series Name</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : (
                series.map((series) => (
                  <tr key={series.series_id}>
                    <td>{series.series_id}</td>
                    <td>{series.series_name}</td>
                    <td>{series.created_at}</td>
                    <td>{series.updated_at}</td>
                    
                    <td>
                    <Link to={"/app/admin/series/" + series.series_id}><FaRegEdit size={"1.75em"} /></Link>
                      <button onClick={() => onDelete(series)}><HiTrash size={"1em"}/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ManageSeriesPage;
