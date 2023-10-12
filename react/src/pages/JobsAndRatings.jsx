import { Nav, Navbar, Button} from "react-bootstrap";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const { user, setUser, token, accessLevel } = useUserContext({
    id: null,
    name: "",
    email: "",
    access_level: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: "",
  }); // Retrieve the user and token state from the user context
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {accessLevel == null && <NavBar />}
      {accessLevel && accessLevel.toString() === '1' && <NavBarAdmin />}
      {accessLevel && accessLevel.toString() === '2' && <NavBarTechnician />}
      {accessLevel && accessLevel.toString() === '3' && <NavBarCustomer />}

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
          
        </div>
    
      <Footer />
    </>
  );
}

export default ProfilePage;


/*
Notes

    // If we are in "Editing" mode
useEffect(() => {
  if (id) {
    setLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then((response) => {
        setLoading(false);
        setUser(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }
}, [id]);

const onSubmit = (e) => {
  e.preventDefault();
  if (user.id) {
    axiosClient
      .put(`/users/${user.id}`, user)
      .then(() => {
        // TODO Show notificaiton
        console.log(user);
        navigate("/app/admin/users");
      })
      .catch((err) => {
        // Handle any validation errors
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  } else {
    axiosClient
      .post("/users", user)
      .then(() => {
        // TODO Show notificaiton
        console.log(user);
        navigate("/app/admin/users");
      })
      .catch((err) => {
        // Handle any validation errors
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }
};
*/