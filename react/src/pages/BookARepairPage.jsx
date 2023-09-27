import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axiosClient from "../axios-client";
import NavBarCustomer from "./../components/NavBarCustomer";

function BookARepairPage() {
  const mockCustomerSelection = {
    customer_id: 4,
    device: {
      brand: "Apple",
      series: "iPhone",
      model: "iPhone 12",
      colour: "Midnight Green",
    },
    parts: "Screen",
    accessories: ["Charger", "Screen Protector"],
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
        console.log("Successful! Total cost:", response.data.totalCost);
        setBookingStatus(
          "You will need to pay the cost of $" + response.data.totalCost + "."
        );
        // TODO Set some state here or redirect the user to a confirmation page.
      })
      .catch((err) => {
        // Handle any errors
        console.error("Query database failed:", err.response);
        setBookingStatus("Booking failed. Please try again.");
      });
  };

  return (
    <>
      <NavBarCustomer />
      <Container>
        <h1>Book A Repair Page</h1>
        <p>
          <em>The development of the Form is in progress..</em>
        </p>
        <p>By clicking Submit, we assume that Customer want to:</p>
        <ul>
          <li>Fix Broken Screen</li>
          <li>Buy Charger & Screen Protector</li>
        </ul>
        <p>for his/her iPhone 12 Midnight Green</p>
        {bookingStatus === "" ? (
          <Button
            className="mt-4 w-50"
            variant="primary"
            type="submit"
            onClick={onSubmit} // change later
          >
            {" "}
            Submit Booking
          </Button>
        ) : (
          <p>
            <b>{bookingStatus}</b>
          </p>
        )}
      </Container>
    </>
  );
}

export default BookARepairPage;
