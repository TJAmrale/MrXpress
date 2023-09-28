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
    axiosClient.post('/logout')
      .then(() => {
        // On successful logout, reset the user and token state
        setUser({});
        setToken(null);
        setAccessLevel(null);

        navigate("/");
      })
  }

  // Fetch the current user information when the component mounts
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data); // Update user state with fetched data
      })
  }, []);

  return (
    <Navbar expand="lg" className="bg-light-subtle shadow-sm navbar-sticky">
      <Container>
        <Navbar.Brand href="/">MrXpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link className="px-3" href="/app/#how-it-works">
              How It Works
            </Nav.Link>
            <Nav.Link className="px-3" href="">
              Book a Repair
            </Nav.Link>
            <Nav.Link className="px-3" href="#faqs">
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} className="px-3 me-3" to="/register">
              Become a Technician
            </Nav.Link>
            {token ? (
            <div className="d-flex align-items-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-name">{user.name}</Tooltip>}
              >
                <span className="px-2">{user.name}</span>
              </OverlayTrigger>
              <div className="d-flex">
                <Button variant="link" className="px-2" as={Link} to="/profile">
                  Edit Profile
                </Button>
                <Button variant="link" className="px-2" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="primary" className="px-4" href="/login">
              Login
            </Button>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarCustomer;
