import React from 'react'
import './banner.css'

function Banner() {
  return (
    <section className="banner">
      <div className="banner-container">
        

        <div className="hero-content">
          
          <div className="hero-tag">
            <span className="tag-icon">▸</span>
            NEXT-GENERATION WORKFORCE MANAGEMENT
          </div>

          <h1 className="hero-title">
            TRACK YOUR
            <br />
            <span className="title-accent">OVERTIME</span>
            <br />
            WITH PRECISION
          </h1>

          <p className="hero-description">
            A powerful, industrial-grade system designed for modern teams.
            Monitor attendance, calculate overtime, and generate comprehensive
            reports—all in real-time with military precision.
          </p>

          <div className="hero-actions">
            <a href="/dashboard.html" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 9h6M9 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              LAUNCH DASHBOARD
            </a>
            <a href="#features" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 6v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              VIEW FEATURES
            </a>
          </div>


          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">UPTIME</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">TRACKING</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">&lt;50ms</div>
              <div className="stat-label">RESPONSE</div>
            </div>
          </div>

        </div>


        <div className="hero-visual">
          

          <div className="visual-card">
            <div className="card-header">
              <div className="card-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <div className="card-title">SYSTEM DASHBOARD</div>
            </div>

            <div className="card-body">
              <div className="metric-row">
                <div className="metric">
                  <div className="metric-label">TOTAL OT</div>
                  <div className="metric-value">142.5 <span>HRS</span></div>
                </div>
                <div className="metric">
                  <div className="metric-label">TRACKED DAYS</div>
                  <div className="metric-value">22 <span>DAYS</span></div>
                </div>
              </div>
              <div className="chart-preview">
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '45%'}}></div>
                <div className="chart-bar" style={{height: '95%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
                <div className="chart-bar" style={{height: '55%'}}></div>
              </div>


              <div className="pulse-line">
                <span className="pulse-dot"></span>
              </div>

            </div>
          </div>


          <div className="float-element float-1">
            <div className="float-icon">◆</div>
            <div className="float-text">REAL-TIME SYNC</div>
          </div>
          <div className="float-element float-2">
            <div className="float-icon">▲</div>
            <div className="float-text">AUTO CALCULATE</div>
          </div>

        </div>

      </div>

   
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">SCROLL TO EXPLORE</div>
      </div>

    </section>
  )
}

export default Banner