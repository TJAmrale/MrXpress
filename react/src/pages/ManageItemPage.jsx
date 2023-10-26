import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';
import {FaRegEdit } from "react-icons/fa";
import {HiTrash } from "react-icons/hi";



const ManageItemPage = () => {
  const [item, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  // Fetch all items from API
  const getItems = () => {
    setLoading(true);
    axiosClient
      .get("/item")
      .then(({ data }) => {
        setLoading(false);
        setItems(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDelete = (item) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    axiosClient.delete(`/item/${item.item_id}`).then(() => {
      getItems();
    });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="manage-items">
        <div className="heading">
          <h2>Manage Items</h2>
          <Link to="/app/admin/item/new" className="add btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Type</th>
                <th>Item Name</th>
                <th>Description</th>
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
                item.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.item_id}</td>
                    <td>{item.item_type}</td>
                    <td>{item.item_name}</td>
                    <td>{item.description}</td>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td>
                      <Link to={"/app/admin/item/" + item.item_id}><FaRegEdit size={"1.75em"} /></Link>
                      <button onClick={() => onDelete(item)}><HiTrash size={"1em"}/></button>
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

export default ManageItemPage;
