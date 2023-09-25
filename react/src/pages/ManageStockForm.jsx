
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageStockForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [stockItem, setStockItem] = useState({
    id: null,
    device_id: "", // Add input field for Device ID
    part_id: "",   // Add input field for Part ID
    buy_price: "", // Add input field for Buy Price
    wholesale_price: "", // Add input field for Wholesale Price
    retail_price: "",    // Add input field for Retail Price
    quantity: ""
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/stock/${id}`)
        .then((response) => {
          setLoading(false);
          setStockItem(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (stockItem.id) {
      axiosClient
        .put(`/stock/${stockItem.id}`, stockItem)
        .then(() => {
          // TODO Show notificaiton
          navigate("/app/admin/stock");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/stock", stockItem)
        .then(() => {
          navigate("/app/admin/stock");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      <NavBarAdmin />
      <section className="w-50">
        {stockItem.id && <h1>Update Stock Item: {stockItem.part_name}</h1>}
        {!stockItem.id && <h1>New Stock Item</h1>}

        <div>
          {loading && <Loading />}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <span key={key}>{errors[key][0]} </span>
              ))}
            </div>
          )}

          {!loading && (
            <Form onSubmit={onSubmit}>
              {/* Add input fields for Device ID, Part ID, Buy Price, Wholesale Price, and Retail Price */}
              <Form.Group className="mt-3" controlId="formBasicDeviceID">
                <Form.Label>Device ID</Form.Label>
                <Form.Control
                  type="number"
                  name="device_id"
                  value={stockItem.device_id}
                  onChange={(e) => setStockItem({ ...stockItem, device_id: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicPartID">
                <Form.Label>Part ID</Form.Label>
                <Form.Control
                  type="number"
                  name="part_id"
                  value={stockItem.part_id}
                  onChange={(e) => setStockItem({ ...stockItem, part_id: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicPartID">
                <Form.Label>Buy Price</Form.Label>
                <Form.Control
                  type="number"
                  name="buy_price"
                  value={stockItem.buy_price}
                  onChange={(e) => setStockItem({ ...stockItem, buy_price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicPartID">
                <Form.Label>wholesale Price</Form.Label>
                <Form.Control
                  type="number"
                  name="wholesale_price"
                  value={stockItem.wholesale_price}
                  onChange={(e) => setStockItem({ ...stockItem, wholesale_price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicPartID">
                <Form.Label>retail Price</Form.Label>
                <Form.Control
                  type="number"
                  name="retail_price"
                  value={stockItem.retail_price}
                  onChange={(e) => setStockItem({ ...stockItem, retail_price: e.target.value })}
                />
              </Form.Group>
              
              <Form.Group className="mt-3" controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={stockItem.quantity}
                  onChange={(e) => setStockItem({ ...stockItem, quantity: e.target.value })}
                />
              </Form.Group>

              <Button className="mt-4 w-25 full-width" variant="primary" type="submit">
                Save
              </Button>
            </Form>
          )}
        </div>
      </section>
    </>
  );
}

export default ManageStockForm;
