import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axiosClient from "../axios-client";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  // Retain the job_id from the current URL
  const job_id = new URLSearchParams(location.search).get("job_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure Stripe.js has loaded
    if (!stripe || !elements) return;

    // try {
    //   const response = await axiosClient.post("/create-payment-intent", {
    //     amount: 1000, // For example $10. Will get this dynamically based on customer's booking.
    //   });
    //   clientSecret = response.data.clientSecret;
    // } catch (error) {
    //   console.error("Error fetching clientSecret:", error);
    //   return; // Exit if there was an issue getting the clientSecret
    // }

    // const payload = {amount: 900}

    // axiosClient
    //   .post("/create-payment-intent", payload)
    //   .then((response) => {
    //     console.log(response.data.clientSecret);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching clientSecret:", error);
    //     return; // Exit if there was an issue getting the clientSecret
    //   });

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) {
      console.error("No PaymentElement found");
      return;
    }

    function getReturnUrl(path) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      return `${baseUrl}${path}`;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: getReturnUrl(
          `/app/book-repair/payment/status?job_id=${job_id}`
        ),
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setErrorMessage(result.error.message);
    } else {
      console.log("SUCCESS! Payment has been made");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit Payment</button>
      {errorMessage && <p>{errorMessage} Please try again.</p>}
    </form>
  );
}

export default PaymentForm;
