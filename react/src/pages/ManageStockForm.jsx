
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageStockForm() {
  const { stock_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [stockItem, setStockItem] = useState({
    stock_id: null,
    device_id: "", 
    part_id: "",   
    buy_price: "", 
    wholesale_price: "",
    retail_price: "",   
    quantity: ""
  });


  useEffect(() => {
    if (stock_id) {
      setLoading(true);
      axiosClient
        .get(`/stock/${stock_id}`)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          setStockItem(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [stock_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (stockItem.stock_id) {
      axiosClient
        .put(`/stock/${stockItem.stock_id}`, stockItem)
        .then(() => {
          // TODO Show notificaiton
          console.log(stockItem);
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
          console.log(stockItem);
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
        {stockItem.stock_id && <h1>Update Stock Item: {stockItem.stock_id }</h1>}
        {!stockItem.stock_id && <h1>New Stock Item</h1>}

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
              {}
              <Form.Group className="mt-3" controlId="formBasicDeviceID">
                <Form.Label>Device ID</Form.Label>
                <Form.Control
                  type="number"
                  name="device_id"
                  value={stockItem.device_id}
                  onChange={(e) => setStockItem({ ...stockItem, device_id: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicItemID">
                <Form.Label>Item ID</Form.Label>
                <Form.Control
                  type="number"
                  name="item_id"
                  value={stockItem.item_id}
                  onChange={(e) => setStockItem({ ...stockItem, item_id: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicBuyPrice">
                <Form.Label>Buy Price</Form.Label>
                <Form.Control
                  type="number"
                  name="buy_price"
                  value={stockItem.buy_price}
                  onChange={(e) => setStockItem({ ...stockItem, buy_price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicWholesalePrice">
                <Form.Label>Wholesale Price</Form.Label>
                <Form.Control
                  type="number"
                  name="wholesale_price"
                  value={stockItem.wholesale_price}
                  onChange={(e) => setStockItem({ ...stockItem, wholesale_price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicRetailPrice">
                <Form.Label>Retail Price</Form.Label>
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
