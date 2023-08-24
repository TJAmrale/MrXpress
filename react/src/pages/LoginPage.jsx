import { Container, Row, Col } from "react-bootstrap";
import LeftSection from "../components/LeftSection";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div id="login-page" className="vw-100">
      <Container fluid>
        {/* Row component from 'react-bootstrap' to structure content horizontally */}
        <Row>
          {/* 
            Column component to hold the left section. 
            On medium screens and up, it takes half the space (span: 6) and is shown first (order: 1). 
            On extra small screens, it is shown second (order: 2).
            The inline style is used to remove the padding on both sides. */}
          <Col
            md={{ span: 6, order: 1 }}
            xs={{ order: 2 }}
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <LeftSection />
          </Col>
          {/* 
            Column component to hold the login form.
            On medium screens and up, it takes half the space (span: 6) and is shown second (order: 2). 
            On extra small screens, it is shown first (order: 1).
            The inline style is used to remove the padding on both sides.
            The "d-flex align-items-center" class ensures the LoginForm is centered vertically. */}
          <Col
            md={{ span: 6, order: 2 }}
            xs={{ order: 1 }}
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
            className="d-flex align-items-center"
          >
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
