import { useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import { useUserContext } from "../contexts/UserProvider.jsx";

const LoginForm = () => {
  // Initialize refs for form fields
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const phoneRef = useRef();
  const streetAddressRef = useRef();
  const suburbRef = useRef();
  const postcodeRef = useRef();
  const stateRef = useRef();
  const [dob, setDob] = useState(null);

  // Initialize state for holding any form errors
  const [errors, setErrors] = useState();
  // Retrieve setUser, setToken and setAccessLevel functions from UserContext
  const { setUser, setToken, setAccessLevel } = useUserContext();

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Prepare payload for API request
    const address = `${streetAddressRef.current.value}, ${suburbRef.current.value} ${stateRef.current.value} ${postcodeRef.current.value}`;

    const payload = {
      access_level: "1",
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      phone: phoneRef.current.value,
      address: address,
      dob: dob,
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

        {/* Date of Birth Input */}
        <Form.Group className="mt-3" controlId="formBasicDOB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            placeholder="YYYY-MM-DD"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>

        {/* Street Address and Suburb */}
        <Row>
          <Col sm={6}>
            <Form.Group className="mt-3" controlId="formBasicStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="street_address"
                placeholder="37 George St"
                ref={streetAddressRef}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mt-3" controlId="formBasicSuburb">
              <Form.Label>Suburb</Form.Label>
              <Form.Control
                type="text"
                name="suburb"
                placeholder="Haymarket"
                ref={suburbRef}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Postcode and State */}
        <Row>
          <Col sm={3}>
            <Form.Group className="mt-3" controlId="formBasicPostcode">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="number"
                name="postcode"
                placeholder="2000"
                ref={postcodeRef}
              />
            </Form.Group>
          </Col>
          <Col sm={9}>
            <Form.Group className="mt-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="" ref={stateRef} required>
                <option value="" disabled>
                  Select your state
                </option>
                <option value="NSW">New South Wales</option>
                <option value="VIC">Victoria</option>
                <option value="QLD">Queensland</option>
                <option value="SA">South Australia</option>
                <option value="WA">Western Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="ACT">Australian Capital Territory</option>
                <option value="NT">Northern Territory</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

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
