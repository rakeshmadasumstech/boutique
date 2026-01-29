// ✅ Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);

    // ⏰ Token expired
    if (payload.exp && payload.exp < now) {
      logout();
      return false;
    }

    return true;
  } catch (err) {
    // Invalid token
    logout();
    return false;
  }
};

// ✅ Login: store token + user info
export const login = ({ id, name, email, token }) => {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "user",
    JSON.stringify({ id, name, email })
  );
};

// ✅ Logout: clear session and redirect
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Force redirect to login
  window.location.replace("/login");
};
