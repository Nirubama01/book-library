import { User, Mail, Lock, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("bookStoreUser", JSON.stringify(user));

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <BookOpen size={28} />
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your account and start shopping for books
        </p>

        <form
          onSubmit={handleRegister}
          className="auth-form"
        >

          <label>
            Full Name

            <div className="auth-input-wrapper">
              <User size={18} />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>
          </label>

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
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </div>
          </label>

          <label>
            Confirm Password

            <div className="auth-input-wrapper">
              <Lock size={18} />

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
              />
            </div>
          </label>

          <button
            type="submit"
            className="auth-submit-button"
          >
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

        <button
          className="admin-login-link"
          onClick={() => navigate("/admin/login")}
        >
          Admin Login
        </button>

      </div>
    </div>
  );
}

export default Register;