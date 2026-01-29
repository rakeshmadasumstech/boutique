import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig"; // ✅ use api with JWT
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", status: "Active" });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await api.put(`/users/${editingUserId}`, formData);
      } else {
        await api.post("/users", formData);
      }
      fetchUsers();
      setFormData({ name: "", email: "", status: "Active" });
      setEditingUserId(null);
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Failed to save user");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, status: user.status });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="users-page">
      <h2>Users</h2>

      {/* User Form */}
      <div className="user-form card p-3 mb-3">
        <h5>{editingUserId ? "Edit User" : "Add User"}</h5>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            className="form-control mb-2"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="btn btn-success me-2">{editingUserId ? "Update" : "Add"}</button>
          {editingUserId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingUserId(null);
                setFormData({ name: "", email: "", status: "Active" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Users List */}
      <div className="users-list card p-3">
        <h5>Users List</h5>
        {loading ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
