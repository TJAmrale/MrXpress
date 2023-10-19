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
  const [activeJobs, setActiveJobs] = useState([]);
  const [pastJobs, setPastJobs] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, token, accessLevel } = useUserContext({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });
  console.log(user);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (user.customer_id) {
      setLoading(true);
      axiosClient.get(`/jobs?customer_id=${user.customer_id}`)
        .then((response) => {
          setLoading(false);
          setUser(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user.customer_id]);

   // Fetch all users from the API
   const getJobs = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get(`/jobs?customer_id=${user.customer_id}`)
      .then(({ data }) => {
        const allJobs = data.jobs;
        const activeJobs = allJobs.filter(
          (job) =>
            job.job_status === 'NEW' ||
            job.job_status === 'IN PROGRESS' ||
            job.job_status === 'ON HOLD'
        );
        const pastJobs = allJobs.filter(
          (job) =>
            job.job_status === 'CANCELLED' || job.job_status === 'COMPLETED'
        );
        setLoading(false); // Stop loading animation
        setActiveJobs(activeJobs); // Update the active jobs state
        setPastJobs(pastJobs); // Update the past jobs state
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
          activeJobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.customer_id}</td>
              <td>{job.technician_id}</td>
              <td>{job.job_status}</td>
              <td>{job.total_cost}</td>
              <td>{job.created_at}</td>
              <td>{job.updated_at}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</section>

<section id="manage-users" className="custom-container">
  <div className="card">
    <table>
      <thead>
        <tr>
          <th>Past Jobs</th>
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
          pastJobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.customer_id}</td>
              <td>{job.technician_id}</td>
              <td>{job.job_status}</td>
              <td>{job.total_cost}</td>
              <td>{job.created_at}</td>
              <td>{job.updated_at}</td>
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