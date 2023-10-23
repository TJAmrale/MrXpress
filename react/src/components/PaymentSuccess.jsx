/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function PaymentSuccess({ jobId }) {
  const [bookingInformation, setBookingInformation] = useState({});
  const [showBookingInfo, setShowBookingInfo] = useState(false); // State to toggle booking information visibility

  useEffect(() => {
    const savedBookingInfo = localStorage.getItem("bookingInformation");
    if (savedBookingInfo) {
      setBookingInformation(JSON.parse(savedBookingInfo));
    }
  }, []);

  console.log(bookingInformation); // this print undefined

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
            Booking Successful!
          </Card.Title>
          <Card.Text className="text-center">Booking ID: #{jobId}</Card.Text>
          <Card.Text className="text-center">
            Thank you for choosing us among many options available!
            Your trust is immensely valued.
          </Card.Text>
          <Card.Text className="text-center">
            A skilled technician will be in touch with you shortly to assist
            with your phone repair needs.
          </Card.Text>
          <div className="row">
            {" "}
            {/* Create a row */}
            <div className="col-6">
              {" "}
              <Link to="/app" className="w-100">
                <Button variant="outline-primary" className="w-100">
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="col-6">
              {" "}
              <Button
                variant="primary"
                onClick={() => setShowBookingInfo(!showBookingInfo)}
                className="w-100"
              >
                {showBookingInfo
                  ? "Hide Booking Info"
                  : "Show Booking Info"}
              </Button>
            </div>
          </div>
        </Card.Body>
        {showBookingInfo && ( 
          <div className="booking-information-receipt font-monospace">
            <p>Device: {bookingInformation.device}</p>
            <p>Repair Type: {bookingInformation.repairType}</p>
            {bookingInformation.accessories && (
              <p>Accessories: {bookingInformation.accessories}</p>
            )}
            <p>Total Cost: ${bookingInformation.totalCost}</p>
            <p>Phone Number: {bookingInformation.phoneNumber}</p>
            <p>Address: {bookingInformation.address}</p>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default PaymentSuccess;
