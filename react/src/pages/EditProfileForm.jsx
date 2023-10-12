 import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../contexts/UserProvider";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import NavBarTechnician from '../components/NavBarTechnician';
import NavBarCustomer from '../components/NavBarCustomer';
import PFP from "../assets/images/Default_pfp.png";
import "../profile.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiImageEditFill } from "react-icons/ri";

function EditProfileForm() {
  const { user, setUser, token, accessLevel } = useUserContext({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });

  const { user_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (user_id) {
      setLoading(true);
      axiosClient.get(`/users/${user_id}`)
        .then((response) => {
          setLoading(false);
          setUser(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user_id]);

  const onSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dob: user.dob,
    };
  
    axiosClient
      .put(`/profile/edit`, updatedData)
      .then(() => {
        console.log(updatedData);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          toast.error("Error 422");
        } else if (response && response.status === 404) {
          setErrors(response.data.errors);
          toast.error("Error 404");
        } else {
          setErrors(response.data.errors);
          toast.error("Error unspecified.");
        }
      });
  };

  return (
    <>
    <div className="profile">

      {accessLevel == null && <NavBar />}
      {accessLevel && accessLevel.toString() === '1' && <NavBarAdmin />}
      {accessLevel && accessLevel.toString() === '2' && <NavBarTechnician />}
      {accessLevel && accessLevel.toString() === '3' && <NavBarCustomer />}

      {loading && <Loading />}

      <div className="profile">
      <div className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="menu-content">
          <ul>
          <li>
              <h2>My Profile</h2>
            </li>
            <hr id="menu-line"></hr>
            <li>
              <a href="/app/profile" className="profile-link">
                Profile Overview
              </a>
            </li>
            <li>
              <a href="/app/profile/edit" className="profile-link">
                Edit Profile
              </a>
            </li>
            <li>
              <a href="/app/profile/jobs" className="profile-link">
                Jobs and Ratings
              </a>
            </li>
            <li>
              <a href="/app/profile/inbox" className="profile-link">
                Inbox
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`toggle-button ${isMenuOpen ? 'button-open' : ''}`} onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </div>
    </div>

          <div className="col-md-9" style={{ paddingTop: "40px"}}>
          <div className="center"> 
          <img src={PFP} alt="Profile Image" width="150" style={{ paddingBottom: "20px"}}/>
          <br></br>
          <RiImageEditFill 
          style={{
            color: '#C62D42',
          }}
          />
          </div> 
          <div className="center">
          <h2>'{user.name}'</h2> 
          <br></br>
          <RiImageEditFill 
          style={{
            color: 'white',
          }}
          />
          </div>
          <hr id="profile-line"></hr>

          {/* Form */}
          {!loading && (
            <Form onSubmit={onSubmit}>
              {/* Name Input */}
              <Form.Group className="mt-3" controlId="formBasicName">
                <Form.Label><strong>Name:</strong></Form.Label>
                <Form.Control
                  id="formcontrol"
                  type="name"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mt-3" controlId="formBasicEmail">
                <Form.Label><strong>Email:</strong></Form.Label>
                <Form.Control
                  id="formcontrol"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>

              {/* Phone Number Input */}
              <Form.Group className="mt-3" controlId="formBasicPhone">
                <Form.Label><strong>Phone:</strong></Form.Label>
                <Form.Control
                  id="formcontrol"
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </Form.Group>

              {/* Full Address Input */}
              <Form.Group className="mt-3" controlId="formBasicAddress">
                <Form.Label><strong>Address:</strong></Form.Label>
                <Form.Control
                  id="formcontrol"
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </Form.Group>

              {/* Date of Birth Input */}
              <Form.Group className="mt-3" controlId="formBasicAddress">
                <Form.Label><strong>Date of Birth:</strong></Form.Label>
                <Form.Control
                  id="formcontrol"
                  type="text"
                  name="dateofbirth"
                  value={user.dob}
                  onChange={(e) =>
                    setUser({ ...user, dob: e.target.value })
                  }
                />
              </Form.Group>

              <div className="container2">
          <Button variant="primary" type="submit" className="mt-4 btn-add3">
            Save
          </Button>
          
          <Link to="/app/profile" className="mt-4 btn-add4">
            Back
          </Link>
          </div>
            </Form>
          )}

        </div>
        
      </div>
      <ToastContainer 
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      theme="colored"
      />
      <Footer />
    </>
  );
}

export default EditProfileForm;


/*
Notes
*/