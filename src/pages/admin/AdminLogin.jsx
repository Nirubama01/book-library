import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    const adminEmail = "admin@bookstore.com";
    const adminPassword = "Admin@123";

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      setError(
        "Incorrect admin email or password."
      );
      return;
    }

    localStorage.setItem(
      "isAdminLoggedIn",
      "true"
    );

    navigate("/admin");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="admin-auth-logo">
          <ShieldCheck size={30} />
        </div>

        <h1>Admin Login</h1>

        <p className="auth-subtitle">
          Sign in to manage your bookstore
        </p>

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          <label>
            Admin Email

            <div className="auth-input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>
          </label>

          <label>
            Password

            <div className="auth-input-wrapper">
              <Lock size={18} />

              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </div>
          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-button"
          >
            Admin Login
          </button>

        </form>

        <button
          className="admin-login-link"
          onClick={() => navigate("/login")}
        >
          Back to User Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;