import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserProvider';
import axiosClient from '../axios-client'; // Import your axios client for making HTTP requests to your Node.js server

// Import the database connection pool from your Node.js code
import pool from '../services/db';


function Profile() {
  const { user, updateUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Send an HTTP request to update the user's profile on the server
    axiosClient.put('/update-profile', editedUser)
      .then((response) => {
        // Handle the response (e.g., show a success message)
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error('Error updating profile:', error);
      });

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset the editedUser to the original user data and exit edit mode
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
            />
          </label>
          {/* Add fields for Email, Phone number, DateOfBirth, etc. */}
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Address: {user.address}</p>
          {/* Display other user information */}
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Profile;

/*




const pool = require('./db'); // Import the database connection pool

// Example query to retrieve data
pool.query('SELECT * FROM your_table_name', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});
*/