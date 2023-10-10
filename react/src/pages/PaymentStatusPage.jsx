import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentFailure from "../components/PaymentFailure";

function PaymentStatusPage() {
  // `useLocation` is a hook from 'react-router-dom' which provides access to the
  // location object representing where the app is "now" (current URL).
  let location = useLocation();

  // `useNavigate` is a hook that provides access to the history instance that you may use
  // to navigate through your React application programmatically.
  let navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState("verifying"); // initial, success, failure

  useEffect(() => {
    // `URLSearchParams` is a web API that provides utilities to work with the query string
    // of a URL. Here, `location.search` gives the query string part of the URL, including
    // the leading "?" character.
    let params = new URLSearchParams(location.search);

    // `params.get('param_name')` method returns the first value associated with the given
    // search parameter ('param_name' in this case). If the parameter isn't found, it returns `null`.
    let paymentIntent = params.get("payment_intent");
    let paymentIntentClientSecret = params.get("payment_intent_client_secret");
    let redirectStatus = params.get("redirect_status");
    let jobId = params.get("job_id");

    const payload = {
      payment_intent: paymentIntent,
      payment_intent_client_secret: paymentIntentClientSecret,
      job_id: jobId
    };

    // Make an API call
    axiosClient
      .post("verify-payment", payload)
      .then((response) => {
        setPaymentStatus('success');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setPaymentStatus('failure');
      });

    // Optionally, use `history.push('/path')` to navigate the user to another page
    // based on the payment status or another business logic. `history.push` adds a new
    // entry into the history stack and navigates to it, updating the browser URL accordingly.
  }, [location, navigate]); // `useEffect` dependencies ensure it only runs again if `location` or `history` changes

    // Conditional rendering based on payment status
    if (paymentStatus === 'verifying') {
      return <div>Checking payment status...</div>;
    } else if (paymentStatus === 'success') {
      return <PaymentSuccess />;
    } else {
      return <PaymentFailure />;
    }
}

export default PaymentStatusPage;
