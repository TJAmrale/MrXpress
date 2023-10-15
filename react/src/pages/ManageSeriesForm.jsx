import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageSeriesForm() {
  const { series_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [series, setseries] = useState({
    series_id: null,
    series_name: ""
  });

  useEffect(() => {
    if (series_id) {
      setLoading(true);
      axiosClient
        .get(`/series/${series_id}`)
        .then((response) => {
          setLoading(false);
          setseries(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [series_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (series.series_id) {
      axiosClient
        .put(`/series/${series.series_id}`, series)
        .then(() => {
          navigate("/app/admin/series");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/series", series)
        .then(() => {
          navigate("/app/admin/series");
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
        {series.series_id && <h1>Update series: {series.series_id }</h1>}
        {!series.series_id && <h1>New series</h1>}

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
              <Form.Group className="mt-3" controlId="formBasicseriesName">
                <Form.Label>series Name</Form.Label>
                <Form.Control
                  type="text"
                  name="series_name"
                  value={series.series_name}
                  onChange={(e) => setseries({ ...series, series_name: e.target.value })}
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

export default ManageSeriesForm;
