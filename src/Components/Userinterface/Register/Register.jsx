import React, { useState } from "react";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    otp: ""
  });

  const registrationDate = new Date().toLocaleDateString();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Submitted (Backend integration pending)");
  };

  return (
    <div className="register-container">

      <div className="register-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group otp-section">
            <label>OTP Verification</label>
            <div className="otp-box">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />
              <button type="button" className="otp-btn">
                Send OTP
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Registration Date</label>
            <input type="text" value={registrationDate} readOnly />
          </div>

          <button className="register-btn">Register</button>

        </form>
      </div>

    </div>
  );
}

export default Register;