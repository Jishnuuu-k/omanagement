import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../Axios/Axio";
import "./register.css";

function Register() {
  const navigate = useNavigate();

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

  const validate = () => {
    const errs = {};
    if (!formData.employeeId.trim()) errs.employeeId = "Required";
    if (!formData.fullName.trim()) errs.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      errs.mobile = "Must be 10 digits";
    }
    if (!formData.dob) errs.dob = "Required";
    if (formData.password.length < 8) {
      errs.password = "Min 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords don't match";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/user/register", {
        employeeId: formData.employeeId,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        dob: formData.dob,
      });
      const userId = res.data.data._id;
      localStorage.setItem("userId", userId);
      alert("OTP sent to your email");
      navigate("/verifyotp");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "employeeId", label: "Employee ID", icon: "⌗", placeholder: "EMP-00123", type: "text", span: false },
    { name: "fullName", label: "Full Name", icon: "◈", placeholder: "John Doe", type: "text", span: false },
    { name: "email", label: "Email Address", icon: "◎", placeholder: "john@company.com", type: "email", span: false },
    { name: "mobile", label: "Mobile", icon: "◉", placeholder: "10-digit number", type: "tel", span: false },
    { name: "dob", label: "Date of Birth", icon: "◷", placeholder: "", type: "date", span: false },
    { name: "password", label: "Password", icon: "◆", placeholder: "Min 8 characters", type: "password", span: false },
    { name: "confirmPassword", label: "Confirm Password", icon: "◇", placeholder: "Re-enter password", type: "password", span: true },
  ];

  return (
    <div className="reg-root">
      <div className="reg-grid-bg" />
      <div className="reg-glow" />

      <div className="reg-wrapper">
        {/* ── LEFT ASIDE ── */}
        <aside className="reg-aside">
          <div className="aside-tag">
            <span className="aside-dot" />
            Employee Portal
          </div>

          <div>
            <h1 className="aside-title">
              JOIN<br />
              THE<br />
              <span className="aside-accent">TEAM</span>
            </h1>
          </div>

          <p className="aside-desc">
            Create your employee account to access the internal dashboard, track attendance, and manage your workspace.
          </p>

          <div className="aside-stats">
            <div className="aside-stat">
              <span className="aside-stat-val">2K+</span>
              <span className="aside-stat-lbl">Employees</span>
            </div>
            <div className="aside-divider" />
            <div className="aside-stat">
              <span className="aside-stat-val">99.9%</span>
              <span className="aside-stat-lbl">Uptime</span>
            </div>
            <div className="aside-divider" />
            <div className="aside-stat">
              <span className="aside-stat-val">24/7</span>
              <span className="aside-stat-lbl">Support</span>
            </div>
          </div>

          <div className="aside-pulse">
            <div className="pulse-line">
              <div className="pulse-dot" />
            </div>
          </div>
        </aside>

        {/* ── RIGHT FORM CARD ── */}
        <main className="reg-card">
          <div className="card-header-row">
            <div className="card-dots">
              <span className="dot red" />
              <span className="dot amber" />
              <span className="dot green" />
            </div>
            <span className="card-label">REGISTER.TSX — EMPLOYEE ONBOARDING</span>
          </div>

          <div className="card-inner">
            <div className="card-heading">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">
                Fill in your details &mdash; <strong>OTP verification required</strong>
              </p>
            </div>

            <form className="reg-form" onSubmit={handleSubmit} noValidate>
              <div className="fields-grid">
                {fields.map(({ name, label, icon, placeholder, type, span }) => (
                  <div
                    key={name}
                    className={`field-group${errors[name] ? " field-error" : ""}${span ? " field-span" : ""}`}
                  >
                    <label className="field-label">
                      <span className="field-icon">{icon}</span>
                      {label}
                    </label>
                    <input
                      className="field-input"
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors[name] && (
                      <span className="field-err-msg">⚠ {errors[name]}</span>
                    )}
                  </div>
                ))}
              </div>

              <button className="reg-btn" type="submit" disabled={loading}>
                {loading ? (
                  <span className="btn-spinner" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              <p className="form-login-link">
                Already have an account?{" "}
                <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;