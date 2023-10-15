import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageBrandForm() {
  const { brand_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [brand, setBrand] = useState({
    brand_id: null,
    brand_name: ""
  });

  useEffect(() => {
    if (brand_id) {
      setLoading(true);
      axiosClient
        .get(`/brand/${brand_id}`)
        .then((response) => {
          setLoading(false);
          setBrand(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [brand_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (brand.brand_id) {
      axiosClient
        .put(`/brand/${brand.brand_id}`, brand)
        .then(() => {
          navigate("/app/admin/brand");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/brand", brand)
        .then(() => {
          navigate("/app/admin/brand");
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
        {brand.brand_id && <h1>Update Brand: {brand.brand_id }</h1>}
        {!brand.brand_id && <h1>New Brand</h1>}

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
              <Form.Group className="mt-3" controlId="formBasicBrandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  name="brand_name"
                  value={brand.brand_name}
                  onChange={(e) => setBrand({ ...brand, brand_name: e.target.value })}
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

export default ManageBrandForm;
