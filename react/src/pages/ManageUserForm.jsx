/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";

function ManageUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    access_level: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  // If we are in "Editing" mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then((response) => {
          setLoading(false);
          setUser(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          // TODO Show notificaiton
          console.log(user);
          navigate("/app/admin/users");
        })
        .catch((err) => {
          // Handle any validation errors
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          // TODO Show notificaiton
          console.log(user);
          navigate("/app/admin/users");
        })
        .catch((err) => {
          // Handle any validation errors
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
        {/* Heading */}
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}

        <div>
          {/* Loading Text */}
          {loading && <Loading />}

          {/* Error text */}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <span key={key}>{errors[key][0]} </span>
              ))}
            </div>
          )}

          {/* Form */}
          {!loading && (
            <Form onSubmit={onSubmit}>
              {/* Name Input */}
              <Form.Group className="mt-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mt-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>

              {/* Role Input */}
              <Form.Group className="mt-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Role select"
                  value={user.access_level}
                  onChange={(e) =>
                    setUser({ ...user, access_level: parseInt(e.target.value) })
                  }
                >
                  <option value="0">Customer/Technician/Admin</option>{" "}
                  <option value="4">Customer</option>{" "}
                  <option value="3">Technician</option>
                  <option value="2">Admin</option>
                </Form.Select>
              </Form.Group>

              {/* Phone Number Input */}
              <Form.Group className="mt-3" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </Form.Group>

              {/* Full Address Input */}
              <Form.Group className="mt-3" controlId="formBasicAddress">
                <Form.Label>Full Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mt-3" controlId="formBasicPassword">
                {user.id && (
                  <>
                    <Form.Label>New Password</Form.Label>
                    <em>
                      {" "}
                      (If you don't want to change your password, just leave it
                      blank)
                    </em>
                  </>
                )}
                {!user.id && <Form.Label>Password</Form.Label>}
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Form.Group>

              {/* Password Confirmation Input */}
              <Form.Group
                className="mt-3"
                controlId="formBasicPasswordConfirmation"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password-confirmation"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setUser({ ...user, password_confirmation: e.target.value })
                  }
                />
              </Form.Group>

              {/* Submit Button */}
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

export default ManageUserForm;
