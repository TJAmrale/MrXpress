/* eslint-disable react/prop-types */
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function PaymentSuccess({ jobId }) {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#f6f6f6",
      }}
    >
      <Card className="payment-status-card py-4">
        <Card.Body>
          <Card.Title className="text-center text-success">
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" className="" />
          </Card.Title>
          <Card.Title className="text-center text-success">
            Payment Successful!
          </Card.Title>
          <Card.Text className="text-center">Booking ID: #{jobId}</Card.Text>
          <Card.Text className="text-center">
            Thank you for choosing us among <br></br>many options available! Your
            trust is <br></br>immensely valued.
          </Card.Text>
          <Card.Text className="text-center">
            A skilled technician will be in touch with you shortly to assist
            with your phone repair needs.
          </Card.Text>
          <Card.Text className="text-center">
            <Link to="/app">Back to home</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaymentSuccess;
