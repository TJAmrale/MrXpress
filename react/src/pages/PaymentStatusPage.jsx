import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentFailure from "../components/PaymentFailure";
import LoadingScreen from "../components/LoadingScreen";

function PaymentStatusPage() {
  // `useLocation` is a hook from 'react-router-dom' which provides access to the
  // location object representing where the app is "now" (current URL).
  let location = useLocation();

  // `useNavigate` is a hook that provides access to the history instance that you may use
  // to navigate through your React application programmatically.
  let navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState("verifying"); // initial, success, failure
  const [jobId, setJobId] = useState();

  useEffect(() => {
    // `URLSearchParams` is a web API that provides utilities to work with the query string
    // of a URL. Here, `location.search` gives the query string part of the URL, including
    // the leading "?" character.
    let params = new URLSearchParams(location.search);

    let customAddress;
    const customAddressParam = params.get("custom_address");
    if (customAddressParam) {
      customAddress = decodeURIComponent(customAddressParam);
    }

    // `params.get('param_name')` method returns the first value associated with the given
    // search parameter ('param_name' in this case). If the parameter isn't found, it returns `null`.
    let paymentIntent = params.get("payment_intent");
    let paymentIntentClientSecret = params.get("payment_intent_client_secret");
    let jobId = params.get("job_id");
    setJobId(jobId);

    const payload = {
      payment_intent: paymentIntent,
      payment_intent_client_secret: paymentIntentClientSecret,
      job_id: jobId,
    };

    // Conditionally adding custom_address to payload if it is defined
    if (customAddress) {
      payload.custom_address = customAddress;
    }

    console.log(payload);

    // Make an API call
    axiosClient
      .post("verify-payment", payload)
      .then((response) => {
        setPaymentStatus("success");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setPaymentStatus("failure");
      });
  }, [location, navigate]);

  // Conditional rendering based on payment status
  if (paymentStatus === "verifying") {
    return <LoadingScreen />;
  } else if (paymentStatus === "success") {
    return <PaymentSuccess jobId={jobId} />;
  } else {
    return <PaymentFailure />;
  }
}

export default PaymentStatusPage;
