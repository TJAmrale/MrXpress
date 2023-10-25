import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../footer.css";
import LogoImage from "../assets/images/transparent_logo.png";
import FacebookImage from "../assets/images/facebook.png";
import TwitterImage from "../assets/images/twitter.png";
import LinkedInImage from "../assets/images/linkedin.png";

function Footer() {
  return (
    <div className="footer-container2">
      <footer id="footer2" className="py-4">
        <Container fluid>
          <Row>
            {/* Logo */}
            <Col xs={12} md={4} className="mb-3 mb-md-0 text-center mx-auto">
              <Link to="/">
                <img src={LogoImage} alt="Company Logo" width="150" />
              </Link>
            </Col>

            {/* Legal Links */}
            <Col xs={12} md={4} className="mb-3 mb-md-0 text-center mx-auto">
              <h5>Legal</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/terms-and-conditions">Terms and Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>ABN: 123456789</li>
              </ul>
            </Col>

            {/* Contact Information */}
            <Col xs={12} md={4} className="text-center mx-auto">
              <h5>Contact Us</h5>
              <p className="mb-0">Phone: <a href="tel:+614212345678">+61 412345678</a></p>
              <div className="d-md-flex align-items-center">
              <span className="contact-label me-1">Email: </span><a href="mailto:info@mrxpress.com.au">info@mrxpress.com.au</a><br />
              </div>
              <div className="d-inline-block me-3" style={{ paddingTop: "15px" }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={FacebookImage} alt="Facebook" width="24" height="24"/>
                </a>
              </div>
              <div className="d-inline-block me-3" style={{ paddingTop: "15px" }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src={TwitterImage} alt="Twitter" width="24" height="24"/>
                </a>
              </div>
              <div className="d-inline-block me-3" style={{ paddingTop: "15px" }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedInImage} alt="LinkedIn" width="24" height="24"/>
                </a>
              </div>

            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
