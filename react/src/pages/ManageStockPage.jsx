import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";

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
        console.log(data);
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
    axiosClient.delete(`/stock/${stock.id}`).then(() => {
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
          <Link to="/app/admin/stock/new" className="btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Device ID</th>
                <th>Part ID</th>
                <th>Buy Price</th>
                <th>Wholesale Price</th>
                <th>Retail Price</th>
                <th>Quantity</th>
                <th>created_at</th>
                <th>updated_at</th>
                <th>deleted_at</th>
                
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
                  <tr key={stock.id}>
                    {console.log(stock)}
                    <td>{stock.stock_id}</td>
                    <td>{stock.device_id}</td>
                    <td>{stock.part_id}</td>
                    <td>{stock.buy_price}</td>
                    <td>{stock.wholesale_price}</td>
                    <td>{stock.retail_price}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.created_at}</td>
                    <td>{stock.updated_at}</td>
                    <td>{stock.deleted_at}</td>
                    
                    <td>
                    <Link to={"/app/admin/stock/" + stock.id}>Edit</Link> 
                      <button onClick={() => onDelete(stock)}>Delete</button>
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

export default ManageStock;