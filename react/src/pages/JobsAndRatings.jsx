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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";
import axiosClient from "../axios-client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FeedbackForm from "../components/FeedbackForm";



function JobsAndRatings() {
  const [CnewJobs, CsetNewJobs] = useState([]);
  const [CinProgressJobs, CsetInProgressJobs] = useState([]);
  const [CcompletedJobs, CsetCompletedJobs] = useState([]);
  const [cancelJobId, setcancelJobId] = useState(null);
  const [cancelAcceptedJobId, setcancelAcceptedJobId] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null); 
  const [confirmationAction2, setConfirmationAction2] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [jobIdForRating, setjobIdForRating] = useState(null);

  const { user, setUser, token, accessLevel } = useUserContext({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });
  const customer_id = user.user_id;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   //Fetch all jobs according to customer_id
   const getJobs = (status, customer_id) => {
    let url = `/jobs/sort/${status}/${customer_id}`;
    setLoading(true); // Start loading animation
    axiosClient
      .get(url)
      .then((response) => {
        if (status === 'NEW') {
          CsetNewJobs(response.data.jobsWithDetails);
        } else if (status === 'IN PROGRESS') {
          CsetInProgressJobs(response.data.jobsWithDetails);
        } else if (status === 'COMPLETED') {
          CsetCompletedJobs(response.data.jobsWithDetails);
        }
        setLoading(false); // Stop loading animation
      })
      .catch(() => {
        setLoading(false); 
      });
  };

  useEffect(() => {
    getJobs('NEW', customer_id);
    getJobs('IN PROGRESS', customer_id);
    getJobs('COMPLETED', customer_id);
  }, [customer_id]);


  const handleCancelJob = (job_id) => {
    setcancelJobId(job_id);
    setConfirmationAction('accept');
  };


  const handleCancelAcceptedJob = (job_id) => {
    setcancelAcceptedJobId(job_id);
    setConfirmationAction2('accept');
  };

  const confirmAction = (job_id) => {
    if (cancelJobId === job_id) {
      if (confirmationAction === 'accept') {
        axiosClient
          .put(`/job/cancel/${job_id}/`, {})
          .then(() => {
            toast.success("Job Cancelled"); // Assuming you want to display a success message
            window.location.reload(); // Reload the page
          })
          .catch((error) => {
            console.error(error);
            setcancelJobId(null);
            setConfirmationAction(null);
          });
      } 
    }
  };



  const confirmAction2 = (job_id) => {
    if (cancelAcceptedJobId === job_id) {
      if (confirmationAction2 === 'accept') {
        axiosClient
          .put(`/job/cancel-accepted/${job_id}/`, {})
          .then(() => {
            toast.success("Job Cancelled"); // Assuming you want to display a success message
            window.location.reload(); // Reload the page
          })
          .catch((error) => {
            console.error(error);
            setcancelAcceptedJobId(null);
            setConfirmationAction2(null);
          });
      } 
    }
  };

  const handleCloseRatingForm = () => {
    // Close the rating form and reset the bookingIdForRating
    setjobIdForRating(null);
    setShowRatingForm(false);
  };


  const handleReview = (job_id) =>{
    setjobIdForRating(job_id);
    setShowRatingForm(true);
  }

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
      <h2 style={{ color: "#000000" }}>Ordered</h2>
      <Table responsive="md" striped>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Status</th>
            <th>Total Cost</th>
            <th>Device</th>
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
            CnewJobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.job_status}</td>
                <td>${job.total_cost}</td>
                <td>
                  {job.item_details.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {itemIndex === 0 && (
                        <span>{item.series_name} {item.model}<br></br></span>
                      )}
                    </div>
                  ))}
                </td>
                <td>
                      {cancelJobId === job.job_id ? (
                        <div className="button-container">
                          Are you sure?
                          <Button variant="outline-danger" onClick={() => confirmAction(job.job_id)}>
                            Yes
                          </Button>
                          <Button variant="outline-success" onClick={() => setcancelJobId(null)}>
                            No
                          </Button>
                        </div>
                      ) : (
                        job.job_status === 'NEW' && (
                          <div className="button-container">
                            <Button variant="danger" onClick={() => handleCancelJob(job.job_id)}>
                              Cancel
                            </Button>
                          </div>
                        )
                      )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  </section>

  <section id="manage-users" className="custom-container">
    <div className="card">
    <h2 style={{ color: "#000000" }}>Active</h2>
        <Table responsive="md" striped>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Status</th>
              <th>Total Cost</th>
              <th>Device</th>
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
              CinProgressJobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.job_id}</td>
                  <td>{job.job_status}</td>
                  <td>${job.total_cost}</td>
                  <td>
                    {job.item_details.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {itemIndex === 0 && (
                          <span>{item.series_name} {item.model}<br></br></span>
                        )}
                      </div>
                    ))}
                  </td>
                  <td>
                      {cancelAcceptedJobId === job.job_id ? (
                        <div className="button-container">
                          Are you sure? You will be charge $50 for the cancellation.
                          <Button variant="outline-danger" onClick={() => confirmAction2(job.job_id)}>
                            Yes
                          </Button>
                          <Button variant="outline-success" onClick={() => setcancelAcceptedJobId(null)}>
                            No
                          </Button>
                        </div>
                      ) : (
                        job.job_status === 'IN PROGRESS' && (
                          <div className="button-container">
                            <Button variant="danger" onClick={() => handleCancelAcceptedJob(job.job_id)}>
                              Cancel
                            </Button>
                          </div>
                        )
                      )}
                </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
    </div>
  </section>

  <section id="manage-users" className="custom-container">
    <div className="card">
    <h2 style={{ color: "#000000" }}>Completed</h2>
        <Table responsive="md" striped>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Status</th>
              <th>Total Cost</th>
              <th>Device</th>
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
              CcompletedJobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.job_id}</td>
                  <td>{job.job_status}</td>
                  <td>${job.total_cost}</td>
                  <td>
                    {job.item_details.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {itemIndex === 0 && (
                          <span>{item.series_name} {item.model}<br></br></span>
                        )}
                      </div>
                    ))}
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleReview(job.job_id)}> Rate Technician </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {showRatingForm && jobIdForRating !== null && (
        <FeedbackForm
          user={user} //Pass the technician object
          jobId={jobIdForRating} //Pass the jobId
          onClose={handleCloseRatingForm}
        />
      )}
        <ToastContainer/>
    </div>
  </section>
      <Footer />
    </>
  );
}

export default JobsAndRatings;
