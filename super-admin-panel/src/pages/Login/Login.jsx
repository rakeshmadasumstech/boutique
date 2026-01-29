import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 Firebase login (ONLY change)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔐 Get Firebase ID token
      const token = await userCredential.user.getIdToken(true);

      // 💾 Store token for backend API calls
      localStorage.setItem("token", token);

      // ✅ Redirect
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card shadow-lg p-4 login-card">
        <h3 className="text-center mb-4 fw-bold">Super Admin Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ✅ KEEP forgot password */}
          <p
            className="text-primary text-center mt-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
