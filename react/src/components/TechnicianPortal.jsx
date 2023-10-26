import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import Button from 'react-bootstrap/Button';
import NavBarTechnician from './NavBarTechnician'
import InvoiceView from './InvoiceView';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from 'react-bootstrap/Table';
import FeedbackForm from "../components/FeedbackForm";



//Jobs(job_id)->job_stock(stock_id)->stock(device_id, item_id)->devices(series_id, model)->series(series_name)->items(item_type, item_name)


function TechnicianPortal({ technician }) {
  const [newJobs, setNewJobs] = useState([]);
  const [inProgressJobs, setInProgressJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const technician_id = technician.user_id;
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [jobIdForRating, setjobIdForRating] = useState(null);

  const [confirmationJobId, setConfirmationJobId] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);

  const fetchData = (status, technician_id) => {
    let url =
      status === 'NEW'
        ? `/sort-jobs/${status}/null`
        : `/sort-jobs/${status}/${technician_id}`;

    axiosClient
      .get(url)
      .then((response) => {
        if (status === 'NEW') {
          setNewJobs(response.data.jobsWithDetails);
        } else if (status === 'IN PROGRESS') {
          setInProgressJobs(response.data.jobsWithDetails);
        } else if (status === 'COMPLETED') {
          setCompletedJobs(response.data.jobsWithDetails);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch data for each job status
    fetchData('NEW', null);
    fetchData('IN PROGRESS', technician_id);
    fetchData('COMPLETED', technician_id);
  }, [technician_id]);


  const handleAcceptJob = (job_id) => {
    setConfirmationJobId(job_id);
    setConfirmationAction('accept');
  };

  const handleCompleteJob = (job_id) => {
    setConfirmationJobId(job_id);
    setConfirmationAction('complete');
  };


  const confirmAction = (job_id) => {
    if (confirmationJobId === job_id) {
      if (confirmationAction === 'accept') {
        axiosClient
          .put(`/jobs/assign/${job_id}/${technician_id}`, {
            technician_id: technician_id,
          })
          .then(() => {
            toast.info("Job Accepted");
            console.log(technician_id);
            fetchData('NEW');
            setConfirmationJobId(null);
            setConfirmationAction(null);
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            setConfirmationJobId(null);
            setConfirmationAction(null);
          });
      } else if (confirmationAction === 'complete') {
        axiosClient
          .put(`/jobs/complete/${job_id}`)
          .then(() => {
            toast.success("Job Completed");
            fetchData('IN PROGRESS');
            fetchData('COMPLETED');
            setConfirmationJobId(null);
            setConfirmationAction(null);
            //window.location.reload();
            setjobIdForRating(job_id);
            setShowRatingForm(true);
          })
          .catch((error) => {
            console.error(error);
            setConfirmationJobId(null);
            setConfirmationAction(null);
          });
      }
    }
  };

  const handleInvoice = (job) => {
    setSelectedJob(job);
  };

  const closeInvoice = () => {
    setSelectedJob(null);
  };


  const handleCloseRatingForm = () => {
    // Close the rating form and reset the bookingIdForRating
    setjobIdForRating(null);
    setShowRatingForm(false);
  };



  return (
    <><NavBarTechnician />
    <div id='TechPortal'>
      <h1>Technician Portal</h1>
      <h3>Welcome {technician.name}</h3>
      <div className='jobnav'>
        <a href="#NEW">New Jobs</a>
        <a href="#IN PROGRESS">In Progress Jobs</a>
        <a href="#COMPLETED">Completed Jobs</a>
      </div>
      <div className='newJobs'>
        <h2 id="NEW">NEW Jobs</h2>
          <Table responsive="md" striped >
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Status</th>
                <th>Total Cost</th>
                <th>Post Code</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {newJobs && newJobs.length > 0 ? (
                newJobs.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.job_id}</td>
                    <td>{job.job_status}</td>
                    <td>${job.total_cost}</td>
                    {job.custom_address ? (
                      <td>{job.custom_address.slice(-4)}</td>
                    ) : (
                      <td>{job.address.slice(-4)}</td>
                    )}
                    <td>
                      {job.item_details.map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {itemIndex === 0 && ( // Display series_name and model for the first item
                            <div>
                              <td>{item.series_name} {item.model}</td>
                            </div>
                          )}
                          <div>
                            <td>{item.item_type}</td>
                            <td>{item.item_name}</td>
                          </div>
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {confirmationJobId === job.job_id ? (
                        <div className="button-container">
                          Are you sure?
                          <Button variant="outline-success" onClick={() => confirmAction(job.job_id)}>
                            Yes
                          </Button>
                          <Button variant="outline-danger" onClick={() => setConfirmationJobId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        job.job_status === 'NEW' && (
                          <div className="button-container">
                            <Button variant="info" onClick={() => handleAcceptJob(job.job_id)}>
                              Accept
                            </Button>
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No new jobs available.</td>
                </tr>
              )}
            </tbody>
          </Table>
      </div>

      <div className='in_progressJobs'>
        <h2 id="IN PROGRESS">IN PROGRESS</h2>
          <Table responsive="md" striped>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Status</th>
                <th>Total Cost</th>
                <th>Number</th>
                <th>Address</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {inProgressJobs && inProgressJobs.length > 0 ? (
                inProgressJobs.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.job_id}</td>
                    <td>{job.job_status}</td>
                    <td>${job.total_cost}</td>
                    <td>{job.phone}</td>
                    {job.custom_address ? (
                      <td>{job.custom_address}</td>
                    ) : (
                      <td>{job.address}</td>
                    )}
                    <td>
                      {job.item_details.map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {itemIndex === 0 && ( // Display series_name and model for the first item
                            <div>
                              <td>{item.series_name} {item.model}</td>
                            </div>
                          )}
                          <div>
                            <td>{item.item_type}</td>
                            <td>{item.item_name}</td>
                          </div>
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {confirmationJobId === job.job_id ? (
                        <div>
                          Are you sure?
                          <Button variant="outline-success" onClick={() => confirmAction(job.job_id)}>
                            Yes
                          </Button>
                          <Button variant="outline-danger" onClick={() => setConfirmationJobId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        job.job_status === 'IN PROGRESS' && (
                          <Button variant="success" onClick={() => handleCompleteJob(job.job_id)}>
                            Finish
                          </Button>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No jobs in progress</td>
                </tr>
              )}
            </tbody>
          </Table>
      </div>

      <div className='completedJobs'>
        <h2 id="COMPLETED">Completed Jobs</h2>
          <Table responsive="md" striped>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Status</th>
                <th>Total Cost</th>
                <th>Post Code</th>
                <th>Device</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {completedJobs && completedJobs.length > 0 ? (
                completedJobs.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.job_id}</td>
                    <td>{job.job_status}</td>
                    <td>${job.total_cost}</td>
                    {job.custom_address ? (
                      <td>{job.custom_address.slice(-4)}</td>
                    ) : (
                      <td>{job.address.slice(-4)}</td>
                    )}
                    <td>
                      {job.item_details.map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {itemIndex === 0 && ( // Display series_name and model for the first item
                            <div>
                              <td>{item.series_name} {item.model}</td>
                            </div>
                          )}
                          <div>
                            <td>{item.item_type}</td>
                            <td>{item.item_name}</td>
                          </div>
                        </React.Fragment>
                      ))}
                    </td>
                    <td>{job.finished_at.slice(0, 10)}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleInvoice(job)}>Invoice</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No jobs completed</td>
                </tr>
              )}
            </tbody>
          </Table>
      </div>
      {showRatingForm && jobIdForRating !== null && (
        <FeedbackForm
          user={technician} // Pass the technician object
          jobId={jobIdForRating} // Pass the jobId
          onClose={handleCloseRatingForm}
        />
      )}
      {selectedJob && (
        <div>
          <InvoiceView job={selectedJob} closeInvoice={closeInvoice} />
        </div>
      )}
      <ToastContainer/>
    </div>
    </>
  );
}

export default TechnicianPortal;
