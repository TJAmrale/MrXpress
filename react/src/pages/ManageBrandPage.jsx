import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';
import {FaRegEdit } from "react-icons/fa";
import {HiTrash } from "react-icons/hi";


const ManageBrandPage = () => {
  const [brand, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

  // Fetch all brands from API
  const getBrands = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get("/brand")
      .then(({ data }) => {
        setLoading(false);
        setBrands(data.data); // Update the brands state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
  };

  // onDelete function to handle brand deletion
  const onDelete = (brand) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) {
      return;
    }

    // Make API call to delete the brand
    axiosClient.delete(`/brand/${brand.brand_id}`).then(() => {
      // Refresh the brand list
      getBrands();
    });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="manage-brand" className="custom-container">
        <div className="heading" >
          <h2>Manage Brand</h2>
          <Link to="/app/admin/brand/new" className="add btn-add ">
            Add new
          </Link>
        </div>
        <div className="card">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Brand ID</th>
                <th>Brand Name</th>
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
                brand.map((brand) => (
                  <tr key={brand.brand_id}>
                    <td>{brand.brand_id}</td>
                    <td>{brand.brand_name}</td>
                    <td>{brand.created_at}</td>
                    <td>{brand.updated_at}</td>
                    
                    <td>
                    <Link to={"/app/admin/brand/" + brand.brand_id}><FaRegEdit size={"1.75em"} /></Link>
                      <button onClick={() => onDelete(brand)}><HiTrash size={"1em"}/></button>
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

export default ManageBrandPage;
