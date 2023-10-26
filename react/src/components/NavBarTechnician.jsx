/* eslint-disable react-hooks/rules-of-hooks */

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useUserContext } from "../contexts/UserProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { Link, useNavigate } from "react-router-dom";

function NavBarTechnician() {
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
            <Nav.Link className="px-3" href="/app/technician" >
              Portal
            </Nav.Link>
            {!token ? (
              <Button variant="primary" className="px-4" href="/login">
                Login
              </Button>
            ) : (
              <>
                <Nav.Link className="px-3" href="/app/profile">
                  {user.name}
                </Nav.Link>
                <Button onClick={onLogout} variant="outline-primary" className="px-4" href="/">
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

export default NavBarTechnician;
