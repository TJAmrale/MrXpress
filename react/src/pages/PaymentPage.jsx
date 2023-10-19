/* eslint-disable react-hooks/exhaustive-deps */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRepair } from "../contexts/RepairProvider";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/UserProvider";
import axiosClient from "../axios-client";
import PaymentForm from "../components/PaymentForm";
import NavBarCustomer from "../components/NavBarCustomer";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";

const stripePromise = loadStripe(
  "pk_test_51NvnnuB5LtC1NaASmv7doGyeEz7sSQV0VeBMz4HALdobXMpzyHFh9fT2lK9Z82A7GZRD8hf8i8K1FCEB6CzZeUBI00VGei0HVJ"
);

export default function PaymentPage() {
  // 1. Handle Stripe payment form -----------------------------------------------

  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(null);
  // Retain the job_id from the current URL
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("job_id");

  useEffect(() => {
    const getJobCostAndCreatePaymentIntent = async () => {
      try {
        // Step 1: Fetch the cost
        const costResponse = await axiosClient.get(`/get-job-cost/${jobId}`);
        setAmount(costResponse.data.totalCost);

        // Step 2: Create the payment intent
        const payload = { amount: costResponse.data.totalCost * 100 }; // amount in Cent
        const intentResponse = await axiosClient.post(
          "/create-payment-intent",
          payload
        );

        setClientSecret(intentResponse.data.clientSecret);
      } catch (error) {
        console.error(error);
      }
    };

    getJobCostAndCreatePaymentIntent();
  }, [jobId]);

  const options = {
    clientSecret: clientSecret,
  };

  // 2. Summary information -----------------------------------------------
  const { user, setUser } = useUserContext(); // Retrieve the user and token state from the user context
  const { customerSelection } = useRepair();
  const [customAddress, setCustomAddress] = useState("");
  const [isCustomAddressChecked, setIsCustomAddressChecked] = useState(false);

  const handleAddressChange = (e) => {
    setCustomAddress(e.target.value); // Set custom address on input change
  };

  const handleSwitchChange = (e) => {
    setIsCustomAddressChecked(e.target.checked);
  };

  // Fetch the current user information when the component mounts
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data); // Update user state with fetched data
    });
  }, []);

  // Return UI -----------------------------------------------
  return !customerSelection ? (
    <NotFoundPage />
  ) : clientSecret ? (
    <div id="payment-page">
      <NavBarCustomer />
      <Container>
        <Row>
          <Col xs={12} md={6} className="">
            <Card className="my-4">
              <Card.Body>
                <Card.Title>Your Order Summary</Card.Title>
                <Card.Text>
                  <ul>
                    <li>
                      <strong>Device:</strong>{" "}
                      {`${customerSelection.device.brand} ${customerSelection.device.model} ${customerSelection.device.colour}`}
                    </li>
                    <li>
                      <strong>Repair Type:</strong>{" "}
                      {customerSelection.repair_type}
                    </li>
                    <li>
                      <strong>Accessories:</strong>{" "}
                      {customerSelection.accessories.join(", ")}
                    </li>
                    <li>
                      <strong>Total Cost:</strong> {amount} AUD
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="">
              <Card.Body>
                <Card.Title>Your Information</Card.Title>
                <Card.Text>
                  <ul>
                    <li>
                      <strong>Phone number:</strong> {user.phone}
                    </li>
                    <li>
                      <strong>Address:</strong> {user.address}
                    </li>
                  </ul>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="I want to use another address"
                    checked={isCustomAddressChecked}
                    onChange={handleSwitchChange}
                  />
                  {isCustomAddressChecked && (
                    <Form.Group
                      className="mt-3"
                      controlId="formBasicStreetAddress"
                    >
                      <Form.Control
                        type="text"
                        name="street_address"
                        placeholder="37 George St, Haymarket NSW 2000"
                        onChange={handleAddressChange}
                      />
                    </Form.Group>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} className="">
            <Card className="my-4">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  You will only be charged upon job completion. Please be aware
                  that a $50 callout fee applies if you cancel after the job has
                  been accepted by a technician.
                </Card.Text>
                <Elements stripe={stripePromise} options={options}>
                  <PaymentForm customAddress={customAddress} />
                </Elements>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <p>
      <LoadingScreen />
    </p>
  );
}
