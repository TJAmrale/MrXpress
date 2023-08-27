import { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axiosClient from "../axios-client";
import { useUserContext } from "../contexts/UserProvider";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState();
  const { setUser, setToken } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            console.log(response);
            setErrors(response.data.errors);
          } else {
            console.log("2 ", response);
            setErrors({
              email: [response.data.message]
            })
          }
        }
      });
  };

  return (
    <Container id="login-form" className="w-75">
      <h2 className="mt-5 text-center">Login</h2>
      <Form onSubmit={onSubmit}>
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
            aria-describedby="forgot-password"
            ref={passwordRef}
          />
          <Form.Text id="forgot-password" style={{ float: "right" }}>
            Forgot Password?
          </Form.Text>
        </Form.Group>

        {/* Error text */}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <span key={key}>{errors[key][0]} </span>
            ))}
          </div>
        )}

        <Button
          className="mt-4 w-25 full-width"
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
      <p className="mt-5 text-center">
        Don't have an account?{" "}
        <b>
          <a href="/register">Register now</a>
        </b>
        .
      </p>
    </Container>
  );
};

export default LoginForm;
