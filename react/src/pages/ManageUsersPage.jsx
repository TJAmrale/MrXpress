import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])
  
  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) =>{
        setLoading(false);
        console.log(data);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  return (
    <section id="manage-users" className="custom-container">
      <div className="heading">
        <h2>Manage Users</h2>
        <Link to="/app/users/new" className="btn-add">Add new</Link>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link to={'/app/users/' + user.id}>Edit</Link>
                  <button>Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ManageUsers