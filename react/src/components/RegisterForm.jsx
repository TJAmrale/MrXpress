import { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import { useUserContext } from "../contexts/UserProvider.jsx";

const LoginForm = () => {
  // Initialize refs for form fields
  const roleRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  // Initialize state for holding any form errors
  const [errors, setErrors] = useState();
  // Retrieve setUser, setToken and setAccessLevel functions from UserContext
  const { setUser, setToken, setAccessLevel } = useUserContext();

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Prepare payload for API request
    const payload = {
      role: roleRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    };
    console.log(payload);

    // Make an API call to register the user
    axiosClient
      .post("/register", payload)
      .then((response) => {
        // On successful registration, set user and token in context
        setUser(response.data.user);
        setToken(response.data.token);
        setAccessLevel(response.data.user.access_level);
      })
      .catch((err) => {
        // Handle any validation errors
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <Container id="login-form" className="w-75">
      <h2 className="mt-5 text-center">Create new account</h2>
      <Form onSubmit={onSubmit}>
        {/* Role Input */}
        <Form.Group className="mt-3" controlId="formBasicRole">
          <Form.Label>I want to become a</Form.Label>
          <Form.Select aria-label="Role select" ref={roleRef}>
            <option value="4">Customer</option> {/* "value=4" is access_level */}
            <option value="3">Technician</option>
          </Form.Select>
        </Form.Group>

        {/* Name Input */}
        <Form.Group className="mt-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="John Doe"
            ref={nameRef}
          />
        </Form.Group>

        {/* Email Input */}
        <Form.Group className="mt-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="someone@domain.com"
            ref={emailRef}
          />
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mt-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="••••••••"
            ref={passwordRef}
          />
        </Form.Group>

        {/* Password Confirmation Input */}
        <Form.Group className="mt-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password-confirmation"
            placeholder="••••••••"
            ref={passwordConfirmationRef}
          />
        </Form.Group>

        {/* Phone Number Input */}
        <Form.Group className="mt-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="04xx xxx xxx"
            ref={phoneRef}
          />
        </Form.Group>

        {/* Full Address Input */}
        <Form.Group className="mt-3" controlId="formBasicAddress">
          <Form.Label>Full Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="37 George St, Haymarket NSW 2000"
            ref={addressRef}
          />
        </Form.Group>

        {/* Error text */}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <span key={key}>{errors[key][0]} </span>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button
          className="mt-4 w-25 full-width"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>

      <p className="mt-5 text-center">
        Already a member?{" "}
        <b>
          <a href="/login">Login now</a>
        </b>
        .
      </p>
    </Container>
  );
};

export default LoginForm;
