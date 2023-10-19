import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageStockForm() {
  const [devices, setDevices] = useState([]);
  const [items, setItems] = useState([]);
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
    quantity: "",
  });

  useEffect(() => {
    // Fetch devices
    axiosClient.get("/device-info").then((response) => {
      const deviceOptions = response.data.map((device) => ({
        value: device.device_id,
        label: `${device.brand.brand_name} - ${device.series.series_name} - ${device.model} - ${device.colours}`,
      }));
      setDevices(deviceOptions);
    });

    // Fetch items
    axiosClient.get("/items-stock").then((response) => {
      const itemOptions = response.data.map((items) => ({
        value: items.item_id,
        label: `${items.item_name} - ${items.description}`,
      }));
      setItems(itemOptions);
    });
  }, []);

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
        {stockItem.stock_id && <h1>Update Stock Item: {stockItem.stock_id}</h1>}
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
                <Form.Label>Device</Form.Label>
                <Form.Select
                  value={stockItem.device_id}
                  onChange={(e) =>
                    setStockItem({ ...stockItem, device_id: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Device
                  </option>
                  {devices.map((device) => (
                    <option key={device.value} value={device.value}>
                      {device.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicItemID">
                <Form.Label>Item</Form.Label>
                <Form.Select
                  value={stockItem.item_id || ""}
                  onChange={(e) =>
                    setStockItem({ ...stockItem, item_id: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  {items.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicBuyPrice">
                <Form.Label>Buy Price</Form.Label>
                <Form.Control
                  type="number"
                  name="buy_price"
                  value={stockItem.buy_price}
                  onChange={(e) =>
                    setStockItem({ ...stockItem, buy_price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicWholesalePrice">
                <Form.Label>Wholesale Price</Form.Label>
                <Form.Control
                  type="number"
                  name="wholesale_price"
                  value={stockItem.wholesale_price}
                  onChange={(e) =>
                    setStockItem({
                      ...stockItem,
                      wholesale_price: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicRetailPrice">
                <Form.Label>Retail Price</Form.Label>
                <Form.Control
                  type="number"
                  name="retail_price"
                  value={stockItem.retail_price}
                  onChange={(e) =>
                    setStockItem({ ...stockItem, retail_price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={stockItem.quantity}
                  onChange={(e) =>
                    setStockItem({ ...stockItem, quantity: e.target.value })
                  }
                />
              </Form.Group>

              <Button
                className="mt-4 w-25 full-width"
                variant="primary"
                type="submit"
              >
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
