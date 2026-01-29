import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig"; // ✅ use api instead of axios
import './Clients.css';
import AddAdminModal from "./AddAdminModal"; // New modal component

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    boutiqueName: "",
    address: ""
  });

  const [editingClientId, setEditingClientId] = useState(null);

  // New states for Add Admin modal
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const apiBase = "/clients"; // ✅ relative path, api will use baseURL

  // Fetch all clients from backend
  const fetchClients = () => {
    setLoading(true);
    api.get(apiBase)
      .then(res => setClients(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingClientId) {
      // Update existing client
      api.put(`${apiBase}/${editingClientId}`, formData)
        .then(() => {
          fetchClients();
          setFormData({ name: "", email: "", status: "Active", boutiqueName: "", address: "" });
          setEditingClientId(null);
        })
        .catch(err => console.error(err));
    } else {
      // Add new client
      api.post(apiBase, formData)
        .then(() => {
          fetchClients();
          setFormData({ name: "", email: "", status: "Active", boutiqueName: "", address: "" });
        })
        .catch(err => console.error(err));
    }
  };

  // Handle Edit
  const handleEdit = (client) => {
    setEditingClientId(client.id);
    setFormData({
      name: client.name || "",
      email: client.email || "",
      status: client.status || "Active",
      boutiqueName: client.boutiqueName || "",
      address: client.address || ""
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      api.delete(`${apiBase}/${id}`).then(fetchClients).catch(err => console.error(err));
    }
  };

  // New function to open Add Admin modal
  const openAddAdmin = (clientId) => {
    setSelectedClientId(clientId);
    setShowAdminModal(true);
  };

  const closeAdminModal = () => setShowAdminModal(false);

  return (
    <div className="clients-page">
      <h2>Clients</h2>

      {/* Add / Edit Form */}
      <div className="client-form card">
        <h5>{editingClientId ? "Edit Client" : "Add Client"}</h5>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Client Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input type="text" name="boutiqueName" placeholder="Boutique Name" value={formData.boutiqueName} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <button type="submit">{editingClientId ? "Update" : "Add"}</button>
          {editingClientId && <button type="button" onClick={() => {
            setEditingClientId(null);
            setFormData({ name: "", email: "", status: "Active", boutiqueName: "", address: "" });
          }}>Cancel</button>}
        </form>
      </div>

      {/* Clients Table */}
      <div className="clients-list card">
        <h5>Clients List</h5>
        {loading ? <p>Loading...</p> :
          clients.length > 0 ? (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Boutique Name</th>
                  <th>Address</th>
                  <th>Number of Admins</th> {/* New column */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.status}</td>
                    <td>{client.boutiqueName}</td>
                    <td>{client.address}</td>
                    <td>{client.numberOfAdmins || 0}</td> {/* Show number of admins */}
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(client)}>Edit</button>
                      <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(client.id)}>Delete</button>
                      <button className="btn btn-sm btn-success" onClick={() => openAddAdmin(client.id)}>Add Admin</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No clients found</p>
        }
      </div>

      {/* Add Admin Modal */}
      {showAdminModal && selectedClientId && (
        <AddAdminModal
          clientId={selectedClientId}
          onClose={closeAdminModal}
          onAdminAdded={fetchClients} // refresh client list after adding admin
        />
      )}
    </div>
  );
}

export default Clients;
