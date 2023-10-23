import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import Button from 'react-bootstrap/Button';
import NavBarTechnician from './NavBarTechnician'


function TechnicianPortal({ technician }) {
  const [newJobs, setNewJobs] = useState([]);
  const [inProgressJobs, setInProgressJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [status, setStatus] = useState('NEW');
  const technician_id = technician.user_id;

  const [confirmationJobId, setConfirmationJobId] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);

  const fetchData = (status) => {
    axiosClient
      .get(`http://localhost:8000/api/sort-jobs/${status}`)
      .then((response) => {
        if (status === 'NEW') {
          setNewJobs(response.data.filteredJobs);
        } else if (status === 'IN PROGRESS') {
          setInProgressJobs(response.data.filteredJobs);
        } else if (status === 'COMPLETED') {
          setCompletedJobs(response.data.filteredJobs);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // axios.defaults.baseURL = 'http://localhost:8000';
    fetchData(status);
  }, [status]);

  useEffect(() => {
    //fetching data
    fetchData('NEW');
    fetchData('IN PROGRESS');
    fetchData('COMPLETED');
  }, []);

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
          .put(`http://localhost:8000/api/jobs/assign/${job_id}/${technician_id}`, {
            technician_id: technician_id,
          })
          .then(() => {
            console.log(technician_id);
            fetchData('NEW');
            setConfirmationJobId(null);
            setConfirmationAction(null);
          })
          .catch((error) => {
            console.error(error);
            setConfirmationJobId(null);
            setConfirmationAction(null);
          });
      } else if (confirmationAction === 'complete') {
        axiosClient
          .put(`http://localhost:8000/api/jobs/complete/${job_id}`)
          .then(() => {
            fetchData('IN PROGRESS');
            fetchData('COMPLETED');
            setConfirmationJobId(null);
            setConfirmationAction(null);
          })
          .catch((error) => {
            console.error(error);
            setConfirmationJobId(null);
            setConfirmationAction(null);
          });
      }
    }
  };



  return (
    <><NavBarTechnician />
    <div id='TechPortal'>
      <h1>Technician Portal</h1>
      <h3>Welcome {technician.name}</h3>
      <div className='newJobs'>
        <h2>NEW Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Postcode</th>
              <th>Job Status</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {newJobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address.slice(-4)}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
                <td>
                  {confirmationJobId === job.job_id ? (
                    <div>
                      Are you sure?
                      <Button variant="outline-success" onClick={() => confirmAction(job.job_id)}>Yes</Button>
                      <Button variant="outline-danger" onClick={() => setConfirmationJobId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    job.job_status === 'NEW' && (
                      <Button variant="info" onClick={() => handleAcceptJob(job.job_id)}>Accept</Button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='in_progressJobs'>
        <h2>IN PROGRESS Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Customer Address</th>
              <th>Job Status</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {inProgressJobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
                <td>
                  {confirmationJobId === job.job_id ? (
                    <div>
                      Are you sure?
                      <Button variant="outline-success" onClick={() => confirmAction(job.job_id)}>Yes</Button>
                      <Button variant="outline-danger" onClick={() => setConfirmationJobId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    job.job_status === 'IN PROGRESS' && (
                      <Button variant="success" onClick={() => handleCompleteJob(job.job_id)}>Finish</Button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='completedJobs'>
        <h2>COMPLETED Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Customer Address</th>
              <th>Job Status</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {completedJobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
                <td>
                  <Button variant="primary">Invoice</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default TechnicianPortal;
