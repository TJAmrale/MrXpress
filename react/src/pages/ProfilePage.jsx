import { Nav, Navbar, Button } from "react-bootstrap";
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
  const { user, setUser, token, accessLevel } = useUserContext(); // Retrieve the user and token state from the user context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name); // Add state for edited name

  const updateUserDetails = async (newName) => {
    try {
      const response = await axios.put('/user', { name: newName }); // Assuming you have an API endpoint for updating user details
      console.log('User details updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Update the user's name using the updateUserDetails function
    updateUserDetails(editedName)
      .then(() => {
        // If the update is successful, set isEditing to false and update the user's name in the component state
        setIsEditing(false);
        setUser({ ...user, name: editedName }); // Update user name in the component state
        toast.success('User details updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        toast.error('Failed to update user details');
      });
  };

  // Fetch the current user information when the component mounts
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data); // Update user state with fetched data
        setEditedName(data.name); // Set editedName state with fetched name
      })
  }, [setUser]);

  return (
    <>
    <div className="profile">

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
              <a href="#" className="profile-link">
                Profile Overview
              </a>
            </li>
            <li>
              <a href="#" className="profile-link">
                Edit Profile
              </a>
            </li>
            <li>
              <a href="#" className="profile-link">
                Jobs and Ratings
              </a>
            </li>
            <li>
              <a href="#" className="profile-link">
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

      <div className="content-container">
      <div className="container">
          <div className="col-md-9" style={{ paddingTop: "40px"}}>
          <div className="center"> 
          <img src={PFP} alt="Profile Image" width="150" style={{ paddingBottom: "20px"}}/>
          </div>
          <div className="center">
          <h2>{user.name}</h2> 
          </div>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
            />
          <hr id="profile-line"></hr>
          <div className="user-details-box">
            <p><strong>Name: </strong>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </p>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Phone: </strong>0{user.phone}</p>
          <p><strong>Address: </strong>{user.address}</p>
          <p><strong>Date of Birth: </strong>{user.dob}</p>

          {isEditing ? (
              <button variant="primary" className="mx-auto" style={{ marginTop: "60px", float: "right"}}onClick={handleSaveClick}>Save</button>
            ) : (
              <button variant="primary" onClick={handleEditClick}>Edit Details</button>
            )} <br></br><br></br><br></br><br></br>
          </div>
        </div>
      </div>
      </div>
    </div>
    
      <Footer />
    </>
  );
}

export default ProfilePage;


/*
Notes

                {console.log("accessLevel: " + accessLevel)}
      {console.log("type accessLevel: " + typeof(accessLevel))}

              <Button variant="primary" className="mx-auto" style={{ marginTop: "60px", float: "right"}} href="#">
              Edit Details
            </Button><br></br><br></br><br></br><br></br>
*/