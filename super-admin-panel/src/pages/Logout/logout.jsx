import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear token/session
    navigate("/login"); // redirect
  };

  return (
    <button
      className="btn btn-danger w-100"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
