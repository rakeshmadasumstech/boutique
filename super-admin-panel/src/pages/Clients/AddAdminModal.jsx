import React, { useState } from "react";
import api from "../../utils/axiosConfig"; // ✅ use api instead of axios
import "./AddAdminModal.css";

function AddAdminModal({ clientId, onClose, onAdminAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "BOUTIQUE_ADMIN",
    status: "Active"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post(`/super-admin/admins/add/${clientId}`, formData) // ✅ api with baseURL & JWT
      .then(() => {
        onAdminAdded();
        onClose();
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          role: "BOUTIQUE_ADMIN",
          status: "Active"
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to add admin. Please try again.");
      });
  };

  return (
    <div className="modal-backdrop d-flex justify-content-center align-items-center">
      <div className="modal-card card shadow-sm p-4">
        <div className="modal-header mb-3">
          <h5 className="modal-title">Add Boutique Admin</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="BOUTIQUE_ADMIN">Boutique Admin</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success me-2">
              Add Admin
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdminModal;
