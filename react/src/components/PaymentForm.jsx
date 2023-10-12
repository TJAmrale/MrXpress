import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function PaymentForm() {
  // Using Stripe and Elements hooks to get respective instances
  const stripe = useStripe();  
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();  // State for managing error messages
  
  const location = useLocation(); // Accessing the location object which represents where the app is currently "now"
  const job_id = new URLSearchParams(location.search).get("job_id"); // Extracting the `job_id` query parameter from the current URL

  const handleSubmit = async (e) => {
    // Preventing default form submission behavior
    e.preventDefault();

    // Ensuring Stripe and Elements instances are loaded
    if (!stripe || !elements) return;

    // Extracting the PaymentElement instance from Elements
    const paymentElement = elements.getElement(PaymentElement);

    // Handling scenarios where PaymentElement instance is not available
    if (!paymentElement) {
      console.error("No PaymentElement found");
      return;
    }

    // `getReturnUrl` constructs a return URL using the provided `path`
    function getReturnUrl(path) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`; // Constructing base URL from the window's current location
      return `${baseUrl}${path}`; // Appending provided path to the base URL and returning
    }

    // Invoking Stripe's `confirmPayment` to handle the payment confirmation
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: getReturnUrl(
          `/app/book-repair/payment/status?job_id=${job_id}`
        ),
      },
    });

    // Handling the payment confirmation result
    if (result.error) {
      console.log(result.error.message);
      setErrorMessage(result.error.message);
    } else {
      console.log("SUCCESS! Payment has been made");
      setErrorMessage(null);
    }
  };

  // Rendering the form, which includes Stripe's PaymentElement and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" variant="primary" className="btn-book my-3 px-4 py-2" disabled={!stripe}>Submit Payment</Button>
      {errorMessage && <p>{errorMessage} Please try again.</p>}
    </form>
  );
}

export default PaymentForm;
