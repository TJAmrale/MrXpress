/* eslint-disable react-hooks/exhaustive-deps */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51NvnnuB5LtC1NaASmv7doGyeEz7sSQV0VeBMz4HALdobXMpzyHFh9fT2lK9Z82A7GZRD8hf8i8K1FCEB6CzZeUBI00VGei0HVJ"
);

export default function PaymentPage() {
  // 1. Handle Stripe payment form -----------------------------------------------

  const [clientSecret, setClientSecret] = useState(null);
  // Retain the job_id from the current URL
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("job_id");

  useEffect(() => {
    const getJobCostAndCreatePaymentIntent = async () => {
      try {
        // Step 1: Fetch the cost
        const costResponse = await axiosClient.get(`/get-job-cost/${jobId}`);
        const amount = costResponse.data.totalCost * 100; // amount in Cent

        // Step 2: Create the payment intent
        const payload = { amount };
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
  






  // Return UI -----------------------------------------------
  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  ) : (
    <p>Loading...</p>
  );
}
