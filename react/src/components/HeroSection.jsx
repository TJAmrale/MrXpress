import { Container, Row, Col, Image, Button } from "react-bootstrap";
import sideImage from "../assets/images/phone-maintenance-pana.png";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";

function HeroSection() {
  const { token, isLoading } = useUserContext();

  const headline = "Fast, Reliable Phone Repairs At Your Doorstep";
  const subheadline =
    "Connect with top technicians and get your phone fixed without any hassle.";

  return (
    <section id="hero-section">
      <Container fluid>
        <Row>
          <Col md={7}>
            <h1>{headline}</h1>
            <p>{subheadline}</p>
            {!token ? (
              <Button
                as={Link}
                to="/login"
                variant="primary"
                className="btn-book px-4 py-2"
              >
                Book Now & Get Fixed!
              </Button>
            ) : (
              <Button
                as={Link}
                to="/app/book-repair"
                variant="primary"
                className="btn-book px-4 py-2"
              >
                Book Now & Get Fixed!
              </Button>
            )}
          </Col>
          <Col md={5}>
            <Image src={sideImage} fluid />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
