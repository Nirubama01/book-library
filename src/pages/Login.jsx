import { Lock, Mail, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    const savedUser = JSON.parse(
      localStorage.getItem("bookStoreUser")
    );

    if (!savedUser) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    if (
      email !== savedUser.email ||
      password !== savedUser.password
    ) {
      setError(
        "Incorrect email or password."
      );
      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <BookOpen size={28} />
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue shopping for your favorite books
        </p>

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          <label>
            Email Address

            <div className="auth-input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
          >
            Create Account
          </button>
        </p>

        <button
          className="admin-login-link"
          onClick={() =>
            navigate("/admin/login")
          }
        >
          Admin Login
        </button>

      </div>
    </div>
  );
}

export default Login;