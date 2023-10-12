/* eslint-disable react-hooks/exhaustive-deps */

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useUserContext } from "../contexts/UserProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate, Link } from "react-router-dom";

function NavBarCustomer() {
  const { user, token, setUser, setToken, setAccessLevel } = useUserContext(); // Retrieve the user and token state from the user context
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();

    // Make an API call to log the user out
    axiosClient.post("/logout").then(() => {
      // On successful logout, reset the user and token state
      setUser({});
      setToken(null);
      setAccessLevel(null);

      navigate("/");
    });
  };

  // Fetch the current user information when the component mounts
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data); // Update user state with fetched data
    });
  }, []);

  const handleHowItWorksClick = (e) => {
    e.preventDefault();

    // Navigate to the IndexPage
    navigate("/app");

    // Scroll to the "How It Works" section
    // Use setTimeout to wait for navigation and rendering to complete
    setTimeout(() => {
      const howItWorksElement = document.getElementById("how-it-works");

      if (howItWorksElement) {
        howItWorksElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleFaqClick = (e) => {
    e.preventDefault();

    // Navigate to the IndexPage
    navigate("/app");

    // Scroll to the FAQ section
    // Use setTimeout to wait for navigation and rendering to complete
    setTimeout(() => {
      const faqElement = document.getElementById("faqs");

      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Navbar expand="lg" className="bg-light-subtle shadow-sm navbar-sticky">
      <Container>
        <Navbar.Brand href="/">MrXpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link
              className="px-3"
              onClick={handleHowItWorksClick}
            >
              How It Works
            </Nav.Link>
            <Nav.Link as={Link} className="px-3" to="/app/book-repair">
              Books a Repair
            </Nav.Link>
            <Nav.Link
              className="px-3"
              onClick={handleFaqClick}
              href="/app/#faqs"
            >
              FAQ
            </Nav.Link>
            <Nav.Link as={Link} className="px-3 me-3" to="/register">
              Become a Technician
            </Nav.Link>
            {!token ? (
              <Button variant="primary" className="px-4" href="/login">
                Login
              </Button>
            ) : (
              <>
                <Nav.Link className="px-3" href="">
                  {user.name}
                </Nav.Link>
                <Button
                  onClick={onLogout}
                  variant="outline-primary"
                  className="px-4"
                  href="/"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarCustomer;
