import React, { useState, useEffect } from "react";
import axios from "axios";
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-page container">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No orders found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Number</th>
                <th>Client Name</th>
                <th>Assigned Admin</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.orderNumber}</td>
                  <td>{order.client?.name || "Unknown"}</td>
                  <td>{order.assignedAdmin?.name || "Not assigned"}</td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>${order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
