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
import Loading from "../components/Loading";
import axiosClient from "../axios-client";

function JobsAndRatings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, token, accessLevel } = useUserContext({user_id: "",});
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (user.user_id) {
      // Only call getJobs if user.id is available
      getJobs();
    }
  }, [user]); // Add user as a dependency to useEffect

   // Fetch all users from the API
   const getJobs = () => {
    setLoading(true); // Start loading animation
    axiosClient
    .get(`/jobs?customer_id=${user.user_id}`)
      .then(({ data }) => {
        console.log(data.jobs); // Log data received from the API
        setLoading(false); // Stop loading animation
        setJobs(data.jobs); // Update the jobs state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
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

    <section id="manage-users" className="custom-container">
    <div className="card">
          <table>
            <thead>
              <tr>
                <th>Active Jobs</th>
              </tr>
            </thead>

            <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <Loading />
                </td>
              </tr>
            ) : (
              jobs.map((jobs) => (
                <tr key={jobs.job_id}>
                  <td>{jobs.job_id}</td>
                  <td>{jobs.customer_id}</td>
                  <td>{jobs.technician_id}</td>
                  <td>{jobs.job_status}</td>
                  <td>{jobs.total_cost}</td>
                  <td>{jobs.created_at}</td>
                  <td>{jobs.updated_at}</td>
                </tr>
              ))
            )}

            </tbody>
          </table>
        </div>
        </section>
      <Footer />
    </>
  );
}

export default JobsAndRatings;


/*
Notes

*/