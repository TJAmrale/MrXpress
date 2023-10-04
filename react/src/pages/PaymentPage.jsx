import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe("pk_test_51NvnnuB5LtC1NaASmv7doGyeEz7sSQV0VeBMz4HALdobXMpzyHFh9fT2lK9Z82A7GZRD8hf8i8K1FCEB6CzZeUBI00VGei0HVJ");

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const payload = {
    amount: 10 // mock data
  }

  useEffect(() => {
    axiosClient.post("/create-payment-intent", payload)
      .then((response) => {
        setClientSecret(response.clientSecret);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
}
