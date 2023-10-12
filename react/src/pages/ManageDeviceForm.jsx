import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageDeviceForm() {
  const { device_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [device, setDevice] = useState({
    device_id: null,
    brand_id: "",
    series_id: "",
    model: "",
    colour: ""
  });

  useEffect(() => {
    if (device_id) {
      setLoading(true);
      axiosClient
        .get(`/device/${device_id}`)
        .then((response) => {
          setLoading(false);
          setDevice(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [device_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (device.device_id) {
      axiosClient
        .put(`/device/${device.device_id}`, device)
        .then(() => {
            console.log(device);
          navigate("/app/admin/device");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/device", device)
        .then(() => {
            console.log(device);
          navigate("/app/admin/device");
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
        {device.device_id && <h1>Update Device: {device.device_id}</h1>}
        {!device.device_id && <h1>New Device</h1>}

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
              <Form.Group className="mt-3" controlId="formBasicBrandID">
                <Form.Label>Brand ID</Form.Label>
                <Form.Control
                  type="number"
                  value={device.brand_id}
                  onChange={(e) => setDevice({ ...device, brand_id: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicSeriesID">
                <Form.Label>Series ID</Form.Label>
                <Form.Control
                  type="number"
                  value={device.series_id}
                  onChange={(e) => setDevice({ ...device, series_id: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicModel">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  value={device.model}
                  onChange={(e) => setDevice({ ...device, model: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicColour">
                <Form.Label>Colour</Form.Label>
                <Form.Control
                  type="text"
                  value={device.colour}
                  onChange={(e) => setDevice({ ...device, colour: e.target.value })}
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

export default ManageDeviceForm;
