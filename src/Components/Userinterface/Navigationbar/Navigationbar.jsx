import React from 'react'
import './navigationbar.css'

function Navigationbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* Logo / Brand */}
        <div className="nav-brand">
          <div className="brand-tag">// OT TRACKER</div>
          <div className="brand-name">
            MGMT<span className="accent">SYSTEM</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link active">
              <span className="link-icon">◆</span>
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link">
              <span className="link-icon">◆</span>
              FEATURES
            </a>
          </li>
          <li className="nav-item">
            <a href="#dashboard" className="nav-link">
              <span className="link-icon">◆</span>
              DASHBOARD
            </a>
          </li>
          <li className="nav-item">
            <a href="#reports" className="nav-link">
              <span className="link-icon">◆</span>
              REPORTS
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="nav-actions">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span className="status-text">LIVE</span>
          </div>
          <a href="/login" className="nav-cta">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ENTER SYSTEM
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="nav-toggle" id="navToggle">
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </button>

      </div>
    </nav>
  )
}

export default Navigationbar