import { Container, Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
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
          />
          <Form.Text id="forgot-password" style={{ float: "right" }}>
            Forgot Password?
          </Form.Text>
        </Form.Group>
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
