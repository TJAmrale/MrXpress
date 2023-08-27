import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useUserContext } from "../contexts/UserProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

function NavBar() {
  const { user, token, setUser, setToken } = useUserContext();
  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, []);

  return (
    <Navbar expand="lg" className="bg-light-subtle shadow-sm">
      <Container>
        <Navbar.Brand href="#home">MrXpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link className="px-3" href="#how-it-works">
              How It Works
            </Nav.Link>
            <Nav.Link className="px-3" href="">
              Books a Repair
            </Nav.Link>
            <Nav.Link className="px-3" href="#faqs">
              FAQ
            </Nav.Link>
            <Nav.Link className="px-3 me-3" href="">
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

export default NavBar;
