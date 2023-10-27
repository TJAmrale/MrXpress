/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, Button} from "react-bootstrap";
import axiosClient from "../axios-client";
import NavBarCustomer from "./../components/NavBarCustomer";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";
import '../assets/styles/BookARepairPage.css';
import { useRepair } from "../contexts/RepairProvider";

function BookARepairPage() {
  const { setUser } = useUserContext(); // Retrieve the user and token state from the user context
  // Customer Selection for the purpose of booking a repair
  const [customerSelection] = useState({
    customer_id: null,
    device: {
      brand: "",
      series: "",
      model: "",
      colour: "",
    },
    repair_type: "",
    parts: "",
    accessories: [],
  });

    // Using context to set customer selection
    const { setCustomerSelection } = useRepair();
    // useEffect hook to set the mock customer selection when component mounts
    useEffect(() => {
      setCustomerSelection(customerSelection);
    }, []);

    console.log(customerSelection);

  useEffect(() => {
    // Fetch the current user information when the component mounts
    axiosClient
      .get('/user')
      .then(({ data }) => {
        // Update user state with fetched data
        setUser(data);
        // Set customer_id to the logged in user
        customerSelection.customer_id = data.user_id;
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
    // Fetch data from Laravel backend to get the list of brands
    axiosClient
      .get("/repair-select-brands")
      .then((response) => {
        // Handle successful response
        console.log("Successful! Brands:", response.data);
        setBrands(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  }, []);

  // State variables to manage various statuses and details in the component
  const [priceStatus, setPriceStatus] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [totalCost, setTotalCost] = useState();
  const [techPayout, setTechPayout] = useState();
  const [companyEarnings, setCompanyEarnings] = useState();
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);
  const [models, setModels] = useState([]);
  const [colours, setColours] = useState([]);
  const [repairType, setRepairType] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [currentContainer, setCurrentContainer] = useState("brand");
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const navigate = useNavigate(); // Hook to programmatically navigate through the application

  const handleContainerChange = (container) => {
    setCurrentContainer(container);
  };

  const handleBrandClick = (selectedBrand) => {
    console.log("selectedBrand is :", selectedBrand);
    // Add the selected brand to the Customer Selection Object
    customerSelection.device.brand = selectedBrand;

    // Make an API request with the selected brand
    axiosClient
      .get("/repair-select-series", {
        params: customerSelection,
      })
      .then((response) => {
        // Handle successful response
        console.log("Successful! Series:", response.data);
        setSeries(response.data);
        handleContainerChange("series");
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching series:', error);
      });
  };

  const handleSeriesClick = (selectedSeries) => {
    // Add the selected series to the Customer Selection Object
    customerSelection.device.series = selectedSeries;
    
    // Make an API request with the selected series
    axiosClient
      .get("/repair-select-models", {
        params: customerSelection,
      })
      .then((response) => {
        // Handle successful response
        console.log("Successful! Models:", response.data);
        setModels(response.data);
        handleContainerChange("model");
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching models:', error);
      });
  };

  const handleModelClick = (selectedModel) => {
    // Add the selected model to the Customer Selection Object
    customerSelection.device.model = selectedModel;

    // Make an API request with the selected model
    axiosClient
      .get("/repair-select-colours", {
        params: customerSelection,
      })
      .then((response) => {
        // Handle successful response
        console.log("Successful! Colours:", response.data);
        setColours(response.data);
        handleContainerChange("colour");
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching colours:', error);
      });
  };

  const handleColourClick = (selectedColour) => {
    // Add the selected colour to the Customer Selection Object
    customerSelection.device.colour = selectedColour;

    // Make an API request with the selected colour
    axiosClient
      .get("/repair-select-repairtype", {
        params: customerSelection,
      })
      .then((response) => {
        // Handle successful response
        console.log("Successful! RepairType:", response.data);
        setRepairType(response.data);
        handleContainerChange("repair");
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching RepairType:', error);
      });
  };

  const handleRepairClick = (selectedRepair) => {
    // Add the selected repair and parts to the Customer Selection Object
    customerSelection.repair_type = selectedRepair;
    customerSelection.parts = selectedRepair;

    // Make an API request with the selected Repair
    axiosClient
      .get("/repair-select-accessories", {
        params: customerSelection,
      })
      .then((response) => {
        // Handle successful response
        console.log("Successful! Accessories:", response.data);
        setAccessories(response.data);
        handleContainerChange("accessory");
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching Accessories:', error);
      });
  };

  const handleAccessoriesClick = (selectedAccessory) => {
    if (selectedAccessories.includes(selectedAccessory)) {
      setSelectedAccessories((prevSelected) =>
        prevSelected.filter((name) => name !== selectedAccessory)
      );
    } else {
      setSelectedAccessories((prevSelected) => [...prevSelected, selectedAccessory]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = customerSelection; // Payload for API request is the mock customer selection

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
        ...customerSelection,
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

  const handleLinkClick = () => {
    // Fetch data from Laravel backend to get the list of brands
    axiosClient
      .get("/repair-select-brands")
      .then((response) => {
        // Handle successful response
        console.log("Successful! Brands:", response.data);
        setBrands(response.data);
        handleContainerChange("brand");
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  };

  const onContinue = () => {
    // Add the selected Accessories to the Customer Selection Object
    customerSelection.accessories = selectedAccessories;
    handleContainerChange("confirm");

    console.log("Finished customerSelection:", customerSelection);
  };

  return (
    <>
      <NavBarCustomer />
      {currentContainer === "brand" && (
        <Container className="centreDiv">
          <h1>Select a Brand</h1>
          <br />
          <div className="centreDiv">
            <h1>Brands</h1>
            <div>
              {brands.map((brand) => (
                <button className="optionButtons" key={brand.brand_id} onClick={() => handleBrandClick(brand.brand_name)}>{brand.brand_name}</button>
              ))}
            </div>
          </div>
        </Container>
      )}
      {currentContainer === "series" && (
        <Container className="centreDiv">
          <p className="hiddenButtons">
            {<button onClick={() => handleLinkClick()}>Selection: {customerSelection.device.brand} {">"}</button>}
          </p>
          <h1>Select a Series</h1>
          <br />
          <div className="centreDiv">
            <h1>Series</h1>
            <div>
              {series.map((serie) => (
                <button className="optionButtons" key={serie.series_id} onClick={() => handleSeriesClick(serie.series_name)}>{serie.series_name}</button>
              ))}
            </div>
          </div>
        </Container>
      )}
      {currentContainer === "model" && (
        <Container className="centreDiv">
          <p className="hiddenButtons">
            {<button onClick={() => handleLinkClick()}>Selection: {customerSelection.device.brand} {">"}</button>}
            {<button onClick={() => handleBrandClick(customerSelection.device.brand)}>{customerSelection.device.series} {">"}</button>}
          </p>
          <h1>Select a Model</h1>
          <br />
          <div>
            <h1>Models</h1>
            <div>
              {models.map((model, index) => (
                <button className="optionButtons" key={index} onClick={() => handleModelClick(model.model)}>{model.model}</button>
              ))}
            </div>
          </div>
        </Container>
      )}
      {currentContainer === "colour" && (
        <Container className="centreDiv">
          <p className="hiddenButtons">
            {<button onClick={() => handleLinkClick()}>Selection: {customerSelection.device.brand} {">"}</button>}
            {<button onClick={() => handleBrandClick(customerSelection.device.brand)}>{customerSelection.device.series} {">"}</button>}
            {<button onClick={() => handleSeriesClick(customerSelection.device.series)}>{customerSelection.device.model} {">"}</button>}
          </p>
          <h1>Select a Colour</h1>
          <br />
          <div>
            <h1>Colours</h1>
            <div>
              {colours.map((colour) => (
                <button className="optionButtons" key={colour.device_id} onClick={() => handleColourClick(colour.colours)}>{colour.colours}</button>
              ))}
            </div>
          </div>
        </Container>
      )}
      {currentContainer === "repair" && (
        <Container className="centreDiv">
          <p className="hiddenButtons">
            {<button onClick={() => handleLinkClick()}>Selection: {customerSelection.device.brand} {">"}</button>}
            {<button onClick={() => handleBrandClick(customerSelection.device.brand)}>{customerSelection.device.series} {">"}</button>}
            {<button onClick={() => handleSeriesClick(customerSelection.device.series)}>{customerSelection.device.model} {">"}</button>}
            {<button onClick={() => handleModelClick(customerSelection.device.model)}>{customerSelection.device.colour} {">"}</button>}
          </p>
          <h1>Select a Repair</h1>
          <br />
          <div>
            <h1>Repairs</h1>
            <div>
              {repairType.map((repair) => (
                <button className="optionButtons" key={repair.item_id} onClick={() => handleRepairClick(repair.item_name)}>{repair.item_name}</button>
              ))}
            </div>
          </div>
        </Container>
      )}
      {currentContainer === "accessory" && (
        <Container className="centreDiv">
          <p className="hiddenButtons">
            {<button onClick={() => handleLinkClick()}>Selection: {customerSelection.device.brand} {">"}</button>}
            {<button onClick={() => handleBrandClick(customerSelection.device.brand)}>{customerSelection.device.series} {">"}</button>}
            {<button onClick={() => handleSeriesClick(customerSelection.device.series)}>{customerSelection.device.model} {">"}</button>}
            {<button onClick={() => handleModelClick(customerSelection.device.model)}>{customerSelection.device.colour} {">"}</button>}
            {<button onClick={() => handleColourClick(customerSelection.device.colour)}>{customerSelection.repair_type}</button>}
          </p>
          <h1>Would you like to buy an additional Accessory?</h1>
          <br />
          <div>
            <h1>Accessories</h1>
            <div>
              {accessories.map((accessory) => (
                <button key={accessory.item_id}
                  onClick={() => handleAccessoriesClick(accessory.item_name)}
                  style={{
                    backgroundColor: selectedAccessories.includes(accessory.item_name)
                      ? "lightblue"
                      : "white",
                  }}
                >
                  {accessory.item_name}
                </button>
              ))}
            </div>
          </div>
          <Button
            className="mt-4 px-5"
            variant="primary"
            type="submit"
            onClick={onContinue} // change later
          >
            {" "}
            Continue
          </Button>
        </Container>
      )}
      {currentContainer === "confirm" && (
        <Container>
          <h1 className="mt-4">Book A Repair Page</h1>
          <p>
            <em>The development of the Form is in progress..</em>
          </p>
          <p>By clicking Submit, we assume that Customer want to:</p>
          <ul>
            <li>Fix their {customerSelection.repair_type}</li>
            <li>Buy a {customerSelection.accessories}</li>
          </ul>
          <p>for his/her {customerSelection.device.brand} {customerSelection.device.model} {customerSelection.device.colour}</p>
          {priceStatus === "" ? (
            <Button
              className="mt-4 px-5"
              variant="primary"
              type="submit"
              onClick={onSubmit} 
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
              className="mt-4 px-5"
              variant="primary"
              type="submit"
              onClick={onConfirm}
            >
              {" "}
              Checkout
            </Button>
          )}
          {isConfirmed && (<p>{confirmStatus}</p>)}
        </Container>
      )}
    </>
  );
}

export default BookARepairPage;