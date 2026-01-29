import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import api from "../../utils/axiosConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState([
    { label: "Boutique Clients", value: 0, color: "primary" },
    { label: "Boutique Admins", value: 0, color: "success" },
    { label: "Vendors", value: 0, color: "warning" },
    { label: "Users", value: 0, color: "danger" },
  ]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Active Admins",
        data: [],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4
      },
      {
        label: "Active Users",
        data: [], // 🔹 keep empty for now
        borderColor: "#198754",
        backgroundColor: "rgba(25,135,84,0.2)",
        tension: 0.4
      }
    ]
  });

  const [ordersCount, setOrdersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Helper: last 7 day labels
  const getLast7DaysLabels = () => {
    const labels = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      labels.push(
        d.toLocaleDateString("en-IN", { weekday: "short" })
      );
    }
    return labels;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          clientsRes,
          adminsRes,
          vendorsRes,
          usersRes,
          adminsChartRes,
          ordersRes
        ] = await Promise.all([
          api.get("/clients/count"),
          api.get("/admins/count"),
          api.get("/vendors/count"),
          api.get("/users/count"),
          api.get("/dashboard/active-admins-last-7-days"), // ✅ REAL API
          api.get("/orders/count")
        ]);

        // Stats cards
        setStats([
          { label: "Boutique Clients", value: clientsRes.data.count, color: "primary" },
          { label: "Boutique Admins", value: adminsRes.data.count, color: "success" },
          { label: "Vendors", value: vendorsRes.data.count, color: "warning" },
          { label: "Users", value: usersRes.data.count, color: "danger" },
        ]);

        // Orders
        setOrdersCount(ordersRes.data.count);
        setRecentOrders(ordersRes.data.recent);

        // Chart (REAL DATA)
        setChartData({
          labels: getLast7DaysLabels(),
          datasets: [
            {
              label: "Active Admins",
              data: adminsChartRes.data,
              borderColor: "#0d6efd",
              backgroundColor: "rgba(13,110,253,0.2)",
              tension: 0.4
            },
            {
              label: "Active Users",
              data: new Array(7).fill(0), // placeholder
              borderColor: "#198754",
              backgroundColor: "rgba(25,135,84,0.2)",
              tension: 0.4
            }
          ]
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Stats Cards */}
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

      {/* Chart */}
      <div className="chart-card card">
        <h5>Active Admins (Last 7 Days)</h5>
        <div className="chart-container">
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="activity-card card">
        <h5>Recent Activities</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-muted">No activity yet</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
