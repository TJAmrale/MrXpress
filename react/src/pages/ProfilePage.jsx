import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../contexts/UserProvider";
import Footer from "../components/Footer";
import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import NavBarTechnician from '../components/NavBarTechnician';
import NavBarCustomer from '../components/NavBarCustomer';
import axiosClient from '../axios-client';
import PFP from "../assets/images/Default_pfp.png";
import "../profile.css";
import 'react-toastify/dist/ReactToastify.css';
import { AiFillStar} from "react-icons/ai";

function ProfilePage() {
  const { user, setUser, token, accessLevel } = useUserContext({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    // Fetch the ratings for the user based on their access level
    if (user.user_id) {
      const route = accessLevel == 3 ? 'customer' : accessLevel == 2 ? 'technician' : '';
  
      if (route) {
        axiosClient
          .get(`/profile/ratings/${route}/${user.user_id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then((data) => {
            const receivedRatings = data;
  
            // Calculate the average rating
            const totalRating = receivedRatings.reduce((acc, rating) => acc + rating, 0);
            const avgRating = receivedRatings.length > 0 ? totalRating / receivedRatings.length : 0;
  
            const formattedAvgRating = avgRating.toFixed(2);
            setRatings(receivedRatings);
            setAverageRating(formattedAvgRating);
          })
          .catch((error) => {
            console.error("Error fetching ratings", error);
          });
      }
    }
  }, [user.user_id, accessLevel]);

  // Your component rendering code here

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
          </div>
          <div className="center">
          <h2>{user.name}</h2> 
          </div>
          <h3>Rating:  {averageRating}<AiFillStar/></h3>
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