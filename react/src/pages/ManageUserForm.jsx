/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";

function ManageUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
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
          navigate("/app/users");
        })
        .catch((err) => {
          // Handle any validation errors
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
    else {
      axiosClient
        .post('/users', user)
        .then(() => {
          // TODO Show notificaiton
          navigate("/app/users");
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
    <Container>
      {/* Heading */}
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}

      <div className="card">
        {/* Loading Text */}
        {loading && <div className="text-center">Loading...</div>}

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

            {/* Password Input */}
            <Form.Group className="mt-3" controlId="formBasicPassword">
              {user.id && <>
              <Form.Label>New Password</Form.Label>
              <em> (If you don't want to change your password, just leave it blank)</em></>}
              {!user.id && <Form.Label>Password</Form.Label>}
              <Form.Control
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
    </Container>
  );
}

export default ManageUserForm;
