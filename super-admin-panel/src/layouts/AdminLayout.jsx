import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="admin-header px-4">
        {/* Logo + Title (clickable) */}
        <div
          className="d-flex align-items-center header-left"
          onClick={() => navigate("/")}
        >
          <img
            src="/src/assets/logo.png"
            alt="Super Admin Logo"
            className="admin-logo"
          />
          <span className="admin-title">Super Admin</span>
        </div>

        {/* Logout */}
        <button className="btn btn-danger btn-sm logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
