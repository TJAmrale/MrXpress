import { Container, Row, Col } from "react-bootstrap";
import LeftSection from "../components/LeftSection";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div id="register-page" className="vw-100">
      <Container fluid>
        <Row>
          <Col
            md={{ span: 6, order: 1 }}
            xs={{ order: 2 }}
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <LeftSection />
          </Col>
          <Col
            md={{ span: 6, order: 2 }}
            xs={{ order: 1 }}
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
            className="d-flex align-items-center"
          >
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
