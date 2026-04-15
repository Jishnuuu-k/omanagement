import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // ✅ STORE TOKEN
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    navigate("/dashboard");

  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <section className="login-banner">
      <div className="login-container">

        <div className="login-left">
          <span className="login-tag">● OT MANAGEMENT SYSTEM</span>
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
              <label>EMAIL</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
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