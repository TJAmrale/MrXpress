/* eslint-disable react/prop-types */
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function PaymentFailure() {
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
          <Card.Title className="text-center text-danger">
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" className="" />
          </Card.Title>
          <Card.Title className="text-center text-danger">
            {`Booking Failure :'(`}
          </Card.Title>
          <Card.Text className="text-center">
            Oops! Booking failed. Please try again, and if the issue persists,
            contact our support team. We're here to help!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaymentFailure;
