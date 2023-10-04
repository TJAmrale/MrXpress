import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axiosClient from "../axios-client";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure Stripe.js has loaded
    if (!stripe || !elements) return; 

    // Fetch the clientSecret from your backend
    let clientSecret;
    try {
      const response = await axiosClient.post('/stripe/create-payment-intent', {
        amount: 1000  // For example $10. Will get this dynamically based on customer's booking.
      });
      clientSecret = response.data.clientSecret;
    } catch (error) {
      console.error("Error fetching clientSecret:", error);
      return;  // Exit if there was an issue getting the clientSecret
    }

    const paymentElement = elements.getElement(PaymentElement);

    const result = await stripe.confirmPayment({
      clientSecret: clientSecret, // Use the clientSecret from the backend
      payment_method: {
        card: paymentElement,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      // Handle success: e.g., redirecting to a thank you page, updating order status in DB, etc.
      console.log("SUCCESS! Payment has been made");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
}

export default PaymentForm;
