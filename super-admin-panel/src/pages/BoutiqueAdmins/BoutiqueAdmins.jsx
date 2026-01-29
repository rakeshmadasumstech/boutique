import React, { useState, useEffect } from 'react';
import api from "../../utils/axiosConfig"; // ✅ use api instead of axios
import './BoutiqueAdmins.css';

function BoutiqueAdmins() {
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState([
    { label: "Total Admins", value: 0, color: "primary" },
    { label: "Active Admins", value: 0, color: "success" },
    { label: "Inactive Admins", value: 0, color: "warning" },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Active',
    username: '',
    password: '',
    role: 'Admin',
    clientId: '',
  });

  const API_URL = "/super-admin/admins";
  const CLIENTS_URL = "/clients";

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const res = await api.get(API_URL);
      setAdmins(res.data);
      setStats([
        { label: "Total Admins", value: res.data.length, color: "primary" },
        { label: "Active Admins", value: res.data.filter(a => a.status === "Active").length, color: "success" },
        { label: "Inactive Admins", value: res.data.filter(a => a.status !== "Active").length, color: "warning" },
      ]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admins");
      setLoading(false);
    }
  };

  // Fetch clients
  const fetchClients = async () => {
    try {
      const res = await api.get(CLIENTS_URL);
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchClients();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        status: formData.status,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      };

      if (editingAdmin) {
        await api.put(`${API_URL}/${editingAdmin.id}`, payload);
      } else {
        await api.post(`${API_URL}/add/${formData.clientId}`, payload);
      }

      setFormData({
        name: '',
        email: '',
        status: 'Active',
        username: '',
        password: '',
        role: 'Admin',
        clientId: '',
      });
      setEditingAdmin(null);
      setShowForm(false);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Failed to save admin");
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      status: admin.status,
      username: admin.username,
      password: '',
      role: admin.role,
      clientId: admin.clientId || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await api.delete(`${API_URL}/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Failed to delete admin");
    }
  };

  if (loading) return <p>Loading admins...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="admins-page">
      <h2 className="page-title">Boutique Admins</h2>

      <div className="stats-cards">
        {stats.map((stat, idx) => (
          <div key={idx} className={`card bg-${stat.color} text-white`}>
            <div className="card-body text-center">
              <h5>{stat.label}</h5>
              <p className="fs-3">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setShowForm(!showForm);
          setEditingAdmin(null);
          setFormData({
            name: '',
            email: '',
            status: 'Active',
            username: '',
            password: '',
            role: 'Admin',
            clientId: '',
          });
        }}
      >
        {showForm ? 'Cancel' : 'Add Admin'}
      </button>

      {showForm && (
        <div className="card mb-3 p-3 form-card">
          <h5>{editingAdmin ? "Edit Admin" : "Add Admin"}</h5>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input className="form-control mb-2" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input className="form-control mb-2" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required={!editingAdmin} />
            <select className="form-control mb-2" name="role" value={formData.role} onChange={handleChange} required>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
            </select>
            <select className="form-control mb-2" name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select className="form-control mb-2" name="clientId" value={formData.clientId} onChange={handleChange} required>
              <option value="">Select Client</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button className="btn btn-success">{editingAdmin ? "Update" : "Add"}</button>
          </form>
        </div>
      )}

      <div className="admins-table card">
        <h5>Admin List</h5>
        <table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Username</th>
      <th>Password</th> {/* ✅ Added Password column */}
      <th>Boutique</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {admins.map(admin => (
      <tr key={admin.id}>
        <td>{admin.id}</td>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td>{admin.username}</td>
        <td>********</td> {/* ✅ Always masked */}
        <td>
          <span className="badge bg-primary">
            {admin.boutiqueName || "N/A"}
          </span>
        </td>
        <td>{admin.status}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(admin)}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(admin.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}

export default BoutiqueAdmins;
