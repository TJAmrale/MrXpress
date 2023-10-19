import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TechnicianPortal({ technician }) {
  const [newJobs, setNewJobs] = useState([]);
  const [inProgressJobs, setInProgressJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [status, setStatus] = useState('NEW');
  const technician_id = technician.user_id;

  const fetchData = (status) => {
    axios.get(`/api/sort-jobs/${status}`)
      .then(response => {
        if (status === 'NEW') {
          setNewJobs(response.data.filteredJobs);
        } else if (status === 'IN PROGRESS') {
          setInProgressJobs(response.data.filteredJobs);
        } else if (status === 'COMPLETED') {
          setCompletedJobs(response.data.filteredJobs);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000';
    fetchData(status);
  }, [status]);

  useEffect(() => {
    // Fetch data for each status when the component mounts
    fetchData('NEW');
    fetchData('IN PROGRESS');
    fetchData('COMPLETED');
  }, []);


  const handleAcceptJob = (job_id) => {
    axios.post(`/api/jobs/${job_id}/assign`, {
      technician_id: technician_id,
    })
    .then(() => {

      fetchData('NEW');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Technician Portal</h1>
      <h3>Welcome {technician.name}</h3>
      <div>
        <h2>NEW Jobs</h2>
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
            {newJobs.map(job => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
                <td>
                    {job.job_status === 'NEW' && (
                        <button onClick={() => handleAcceptJob(job.job_id)}>Accept</button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
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
            {inProgressJobs.map(job => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
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
            {completedJobs.map(job => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.custom_address}</td>
                <td>{job.job_status}</td>
                <td>{job.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechnicianPortal;
