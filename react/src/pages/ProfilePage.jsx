import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../contexts/UserProvider";
import Footer from "../components/Footer";
import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import NavBarTechnician from '../components/NavBarTechnician';
import NavBarCustomer from '../components/NavBarCustomer';
import PFP from "../assets/images/Default_pfp.png";
import "../profile.css";
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const { user, setUser, token, accessLevel } = useUserContext({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  }); // Retrieve the user and token state from the user context
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <div className="profile">

      {accessLevel == null && <NavBar />}
      {accessLevel && accessLevel.toString() === '1' && <NavBarAdmin />}
      {accessLevel && accessLevel.toString() === '2' && <NavBarTechnician />}
      {accessLevel && accessLevel.toString() === '3' && <NavBarCustomer />}

      {/* Loading Text */}
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
          </div>
          <div className="center">
          <h2>{user.name}</h2> 
          </div>
          <hr id="profile-line"></hr>
          
          <div className="user-details-box">
          <p><strong>Name: </strong></p>
          <p id="p2">{user.name}</p>
          <p><strong>Email: </strong></p>
          <p id="p2">{user.email}</p>
          <p><strong>Phone: </strong></p>
          <p id="p2">{user.phone}</p>
          <p><strong>Address: </strong></p>
          <p id="p2">{user.address}</p>
          <p><strong>Date of Birth: </strong></p>
          <p id="p2">{user.dob}</p>
          </div>
          <div className="container2">
          <Link to="/app/profile/edit" className="btn-add2">
            Edit Profile
          </Link>
          </div>
        </div>
      </div>
    
      <Footer />
    </>
  );
}

export default ProfilePage;