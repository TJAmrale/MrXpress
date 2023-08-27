import { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import { useUserContext } from "../contexts/UserProvider.jsx";

const LoginForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState();
  const { setUser, setToken } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    console.log(payload);
    axiosClient
      .post("/register", payload)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((err) => {
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

        {/* Error text */}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <span key={key}>{errors[key][0]}{" "}</span>
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
