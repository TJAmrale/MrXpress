/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, Button} from "react-bootstrap";
import axiosClient from "../axios-client";
import NavBarCustomer from "./../components/NavBarCustomer";
import { useNavigate } from "react-router-dom";
import { useRepair } from "../contexts/RepairProvider";

function BookARepairPage() {

  // Mock customer selection for the purpose of booking a repair
  const mockCustomerSelection = {
    customer_id: 3,
    device: {
      brand: "Apple",
      series: "iPhone",
      model: "iPhone 12",
      colour: "Midnight Green", 
    },
    repair_type: "Broken Screen",
    parts: "Screen",
    accessories: ["Charger", "Screen Protector"],
  };

  // Using context to set customer selection
  const { setCustomerSelection } = useRepair();
  // useEffect hook to set the mock customer selection when component mounts
  useEffect(() => {
    setCustomerSelection(mockCustomerSelection);
  }, []);

  // State variables to manage various statuses and details in the component
  const [priceStatus, setPriceStatus] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [totalCost, setTotalCost] = useState();
  const [techPayout, setTechPayout] = useState();
  const [companyEarnings, setCompanyEarnings] = useState();

  const navigate = useNavigate(); // Hook to programmatically navigate through the application

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = mockCustomerSelection; // Payload for API request is the mock customer selection

    // API call to book a repair
    axiosClient
      .post("/book-repair", payload)
      .then((response) => {
        // Handle successful booking
        console.log("Successful! Total cost:", response.data.totalCost);
        setPriceStatus(
          "You will need to pay the cost of $" + response.data.totalCost + "."
        );
        // Set further details obtained from the response
        setTotalCost(response.data.totalCost);
        setTechPayout(response.data.techPayout);
        setCompanyEarnings(response.data.companyEarnings);
      })
      .catch((err) => {
        // Handle any errors
        console.error("Query database failed:", err.response);
        setPriceStatus("Booking failed. Please try again.");
      });
  };

  const onConfirm = () => {
    axiosClient
      .post("/confirm-repair", {
        ...mockCustomerSelection,
        totalCost: totalCost,
        techPayout: techPayout,
        companyEarnings: companyEarnings
      })
      .then((response) => {
        // Handle successful confirmation
        console.log("Booking confirmed!");
        setConfirmStatus(response.data.message);
        setIsConfirmed(true)
        // Navigate to the payment page, including the job_id in the URL
        navigate(`/app/book-repair/payment?job_id=${response.data.job_id}`);
      })
      .catch((err) => {
        console.error("Confirmation failed:", err.response);
        setConfirmStatus("Confirmation failed. Please try again.");
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
        {priceStatus === "" ? (
          <Button
            className="mt-4 w-50"
            variant="primary"
            type="submit"
            onClick={onSubmit} // change later
          >
            {" "}
            Get the Price
          </Button>
        ) : (
          <p>
            <b>{priceStatus}</b>
          </p>
        )}
        {priceStatus != "" && (
          <Button
            className="mt-4 w-50"
            variant="primary"
            type="submit"
            onClick={onConfirm} // change later
          >
            {" "}
            Checkout
          </Button>
        )}
        {isConfirmed && (<p>{confirmStatus}</p>)}
      </Container>
    </>
  );
}

export default BookARepairPage;
