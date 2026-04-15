import React, { useEffect, useState } from 'react'
import './navigationbar.css'
import { Link } from "react-router-dom";

function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <a href="/">
          <div className="nav-brand">
            <div className="brand-tag">OT TRACKER</div>
            <div className="brand-name">
              MGMT<span className="accent">SYSTEM</span>
            </div>
          </div>
        </a>

        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#features" className="nav-link">FEATURES</a>
          </li>

          <li className="nav-item">
            <a href="#reports" className="nav-link">REPORTS</a>
          </li>

          {/* ✅ Show only if logged in */}
          {isLoggedIn && (
            <li className="nav-item">
              <a href="/dashboard" className="nav-link">
                DASHBOARD
              </a>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {isLoggedIn ? (
            <button
              className="nav-cta"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/login" className="nav-cta">
              ENTER SYSTEM
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navigationbar