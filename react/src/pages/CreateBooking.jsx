import { useState } from "react";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";

function AddBookingForm() {
  const [booking, setBooking] = useState({
    device: "",
    repair_type: "",
    address: "",
    price: "",
    status: "pending",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to create a new booking
    axiosClient
      .post("/bookings", booking)
      .then(() => {
        // TODO Show notification
      })
      .catch((err) => {
        // Handle any validation errors
        const response = err.response;
        if (response && response.status === 422) {
          // Handle validation errors
        }
      });
  };

  return (
    <Container>
      <h1>Add New Booking</h1>
      <div className="card">
        <Form onSubmit={onSubmit}>
          {/* Device Input */}
          <Form.Group className="mt-3" controlId="formBasicDevice">
            <Form.Label>Device</Form.Label>
            <Form.Control
              type="text"
              name="device"
              value={booking.device}
              onChange={(e) =>
                setBooking({ ...booking, device: e.target.value })
              }
            />
          </Form.Group>

          {/* Repair Type Input */}
          <Form.Group className="mt-3" controlId="formBasicRepairType">
            <Form.Label>Repair Type</Form.Label>
            <Form.Control
              type="text"
              name="repair_type"
              value={booking.repair_type}
              onChange={(e) =>
                setBooking({ ...booking, repair_type: e.target.value })
              }
            />
          </Form.Group>

          {/* Address Input */}
          <Form.Group className="mt-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={booking.address}
              onChange={(e) =>
                setBooking({ ...booking, address: e.target.value })
              }
            />
          </Form.Group>

          {/* Price Input */}
          <Form.Group className="mt-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={booking.price}
              onChange={(e) =>
                setBooking({ ...booking, price: e.target.value })
              }
            />
          </Form.Group>

          {/* Submit Button */}
          <Button className="mt-4" variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default AddBookingForm;