import React, { useState } from "react";
import "./register.css";

function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const registrationDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const validate = () => {
    const errs = {};
    if (!formData.employeeId.trim()) errs.employeeId = "Required";
    if (!formData.fullName.trim()) errs.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Must be 10 digits";
    if (!formData.dob) errs.dob = "Required";
    if (formData.password.length < 8)
      errs.password = "Min 8 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call — replace with real backend
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    if (onRegisterSuccess) onRegisterSuccess(formData.email);
  };

  const fields = [
    { name: "employeeId", label: "Employee ID", type: "text", icon: "◈", placeholder: "EMP-0001" },
    { name: "fullName", label: "Full Name", type: "text", icon: "◉", placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", icon: "◎", placeholder: "john@company.com" },
    { name: "mobile", label: "Mobile Number", type: "tel", icon: "◌", placeholder: "9876543210" },
    { name: "dob", label: "Date of Birth", type: "date", icon: "◆" },
    { name: "password", label: "Password", type: "password", icon: "◈", placeholder: "Min 8 characters" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", icon: "◈", placeholder: "Repeat password" },
  ];

  return (
    <div className="reg-root">
      <div className="reg-grid-bg" />
      <div className="reg-glow" />

      <div className="reg-wrapper">
        {/* Left decorative panel */}
        <aside className="reg-aside">
          <div className="aside-tag">
            <span className="aside-dot" />
            EMPLOYEE PORTAL
          </div>
          <h2 className="aside-title">
            JOIN THE<br />
            <span className="aside-accent">TEAM.</span>
          </h2>
          <p className="aside-desc">
            Create your employee account to access internal dashboards, reports,
            and collaboration tools — all in one place.
          </p>
          <div className="aside-stats">
            <div className="aside-stat">
              <span className="aside-stat-val">12K+</span>
              <span className="aside-stat-lbl">EMPLOYEES</span>
            </div>
            <div className="aside-divider" />
            <div className="aside-stat">
              <span className="aside-stat-val">99.9%</span>
              <span className="aside-stat-lbl">UPTIME</span>
            </div>
            <div className="aside-divider" />
            <div className="aside-stat">
              <span className="aside-stat-val">256</span>
              <span className="aside-stat-lbl">BIT ENC.</span>
            </div>
          </div>
          <div className="aside-pulse">
            <div className="pulse-line">
              <div className="pulse-dot" />
            </div>
          </div>
        </aside>

        {/* Form card */}
        <main className="reg-card">
          <div className="card-header-row">
            <div className="card-dots">
              <span className="dot red" />
              <span className="dot amber" />
              <span className="dot green" />
            </div>
            <span className="card-label">registration.form</span>
          </div>

          <div className="card-inner">
            <div className="card-heading">
              <h1 className="form-title">Create Account</h1>
              <p className="form-subtitle">
                Registered on <strong>{registrationDate}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="reg-form">
              <div className="fields-grid">
                {fields.map(({ name, label, type, icon, placeholder }) => (
                  <div
                    className={`field-group ${errors[name] ? "field-error" : ""}`}
                    key={name}
                  >
                    <label className="field-label">
                      <span className="field-icon">{icon}</span>
                      {label}
                    </label>
                    <input
                      className="field-input"
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder || ""}
                      required
                      autoComplete="off"
                    />
                    {errors[name] && (
                      <span className="field-err-msg">⚠ {errors[name]}</span>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className={`reg-btn ${loading ? "reg-btn--loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-spinner" />
                ) : (
                  <>
                    <span>REGISTER &amp; VERIFY</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              <p className="form-login-link">
                Already have an account?{" "}
                <a href="/login" className="link-accent">Sign in</a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;