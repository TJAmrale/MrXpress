import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axiosClient from "../axios-client";

function BookARepairPage() {
  const mockCustomerSelection = {
    customer_id: 3,
    device: {
      brand: "Apple",
      series: "iPhone",
      model: "iPhone 12",
      colour: "Midnight Green",
    },
    repair: {
      type: "Broken screen",
      part_name: "iPhone 12 LCD screen", // this is auto generated based on the repair type
      repair_price: 500.0, // this is a mock price fetched from the database based on the selected repair type
    },
    accessories: [
      {
        part_name: "iPhone Charger",
        price: 20.0,
      },
      {
        part_name: "iPhone 12 Screen protector",
        price: 15.0,
      },
    ],
  };
  console.log(mockCustomerSelection);

  const [bookingStatus, setBookingStatus] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = mockCustomerSelection;

    axiosClient
      .post("/book-repair", payload)
      .then((response) => {
        // Handle successful booking
        console.log("Booking successful! Total cost:", response.data.totalCost);
        setBookingStatus("Booking successful! You will need to pay the cost of $" + response.data.totalCost);
        // You can set some state here or redirect the user to a confirmation page.
      })
      .catch((err) => {
        // Handle any errors
        console.error("Booking failed:", err.response);
        setBookingStatus("Booking failed. Please try again.");
        // Here you can set some state to show an error message to the user if needed.
      });
  };

  return (
    <Container>
      <h1>Book A Repair Page</h1>
      {bookingStatus === "" ? (
        <Button
          className="mt-4 w-50"
          variant="primary"
          type="submit"
          onClick={onSubmit} // change later
        > Submit Booking
        </Button>
      ) : (
        <p>{bookingStatus}</p>
      )}
    </Container>
  );
}

export default BookARepairPage;
