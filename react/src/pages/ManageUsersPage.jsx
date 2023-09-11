import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch all users from the API
  const getUsers = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false); // Stop loading animation
        console.log(data);
        setUsers(data.data); // Update the users state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
  };

  // onDelete function to handle user deletion
  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    // Make API call to delete the user
    axiosClient.delete(`/users/${user.id}`).then(() => {
      // TODO Show notification
      getUsers(); // Refresh the user list
    });
  };

  return (
    <>
      <NavBar />
      <section id="manage-users" className="custom-container">
        <div className="heading">
          <h2>Manage Users</h2>
          <Link to="/app/users/new" className="btn-add">
            Add new
          </Link>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Access Level</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    {console.log(user)}
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.access_level}</td>
                    <td>
                      <Link to={"/app/users/" + user.id}>Edit</Link>
                      <button onClick={() => onDelete(user)}>Delete</button>
                    </td>
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

export default ManageUsers;
