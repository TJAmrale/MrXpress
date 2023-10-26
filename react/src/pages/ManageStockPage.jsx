import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';
import {FaRegEdit } from "react-icons/fa";
import {HiTrash } from "react-icons/hi";


const ManageStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStock();
  }, []);

 // Fetch all stock from API
  const getStock = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get("/stock")
      .then(({ data }) => { // Stop loading animation
        setLoading(false);
        setStock(data.data); // Update the stock state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
  };

  // onDelete function to handle user deletion
  const onDelete = (stock) => {
    if (!window.confirm("Are you sure you want to delete this stock stock?")) {
      return;
    }

    // Make API call to delete the stock stock
    axiosClient.delete(`/stock/${stock.stock_id}`).then(() => {
      // Refresh the stock list
      getStock();
    });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="manage-stock">
        <div  className="heading">
          <h2>Manage Stock</h2>
          <Link to="/app/admin/stock/new" className="add btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Device ID</th>
                <th>Brand Name</th>
                <th>Series Name</th>
                <th>Model</th>
                <th>Colour</th>
                <th>Item ID</th>
                <th>item Type</th>
                <th>Item Name</th>
                <th>Buy Price</th>
                <th>Wholesale Price</th>
                <th>Retail Price</th>
                <th>Quantity</th>
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
                stock.map((stock) => (
                  <tr key={stock.stock_id}>

                    <td>{stock.stock_id}</td>
                    <td>{stock.device_id}</td>
                    <td>{stock.device?.brand?.brand_name}</td>
                    <td>{stock.device?.series?.series_name}</td>
                    <td>{stock.device?.model}</td>
                    <td>{stock.device?.color}</td>
                    <td>{stock.item_id}</td>
                    <td>{stock.item?.item_type}</td>
                    <td>{stock.item?.item_name}</td>
                    <td>{stock.buy_price}</td>
                    <td>{stock.wholesale_price}</td>
                    <td>{stock.retail_price}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.created_at}</td>
                    <td>{stock.updated_at}</td>
                    
                    <td>
                    <Link to={"/app/admin/stock/" + stock.stock_id}><FaRegEdit size={"1.75em"} /></Link> 
                      <button onClick={() => onDelete(stock)}><HiTrash size={"1em"}/></button>
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

export default ManageStock;