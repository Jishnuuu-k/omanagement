import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Here you will later call backend API
    // For now simulate success
    document.body.classList.add("fade-out");

    setTimeout(() => {
      navigate("/dashboard");
      document.body.classList.remove("fade-out");
    }, 500);
  };

  return (
    <section className="login-banner">

      <div className="login-container">

        <div className="login-left">
          <span className="login-tag">
            ● OT MANAGEMENT SYSTEM
          </span>

          <h1 className="login-title">
            Workforce <span className="accent">Control</span>
          </h1>

          <p className="login-description">
            Secure access to attendance tracking and overtime monitoring.
          </p>
        </div>

        <div className="login-card">

          <div className="card-header">
            <div className="card-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="card-title">LOGIN PANEL</span>
          </div>

          <form className="card-body" onSubmit={handleLogin}>

            <div className="input-group">
              <label>USERNAME</label>
              <input type="text" required />
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <input type="password" required />
            </div>

            <button className="btn-login">LOGIN</button>

            <p className="register-link">
              Not registered? <Link to="/register">Create Account</Link>
            </p>

          </form>
        </div>

      </div>

    </section>
  );
}

export default Login;