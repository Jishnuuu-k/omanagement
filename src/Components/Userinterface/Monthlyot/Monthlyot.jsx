import React, { useEffect, useState, useCallback  } from "react";
import "./monthlyot.css";

const API_BASE = "http://localhost:5000";

function Monthlyot() {
  const token = localStorage.getItem("token");

  const [records, setRecords] = useState([]);
  const [totalOT, setTotalOT] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");

const fetchMonthlyOT = useCallback(async () => {
  if (!token) {
    alert("Unauthorized. Please login again.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/attendance/calculate-ot`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error || "Failed to fetch OT data");
      return;
    }

    setRecords(data.records || []);
    setTotalOT(data.totalOt || 0);

    if (data.records && data.records.length > 0 && data.records[0].date) {
      const date = new Date(data.records[0].date);
      setCurrentMonth(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    } else {
      const now = new Date();
      setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong while fetching OT");
  } finally {
    setLoading(false);
  }
}, [token]);

useEffect(() => {
  fetchMonthlyOT();
}, [fetchMonthlyOT]);

  // Calculate additional stats
  const totalWorked = records.reduce((sum, r) => sum + (r.workedHours || 0), 0);
  const daysWithOT = records.filter(r => (r.otHours || 0) > 0).length;
  const maxOT = Math.max(...records.map(r => r.otHours || 0), 0);

  return (
    <div className="monthly-root">
      <div className="monthly-grid-bg"></div>
      <div className="monthly-glow"></div>

      <div className="monthly-wrapper">
        {/* Left Sidebar */}
        <div className="monthly-aside">
          <div className="aside-tag">
            <span className="aside-dot"></span>
            <span>OVERTIME TRACKER</span>
          </div>
          
          <div className="aside-title">
            OVERTIME<br />
            <span className="aside-accent">ANALYTICS</span>
          </div>
          
          <div className="aside-desc">
            Track your monthly overtime hours and monitor productivity metrics.
          </div>
          
          <div className="aside-stats">
            <div className="aside-stat">
              <span className="aside-stat-val">{daysWithOT}</span>
              <span className="aside-stat-lbl">DAYS WITH OT</span>
            </div>
            <div className="aside-divider"></div>
            <div className="aside-stat">
              <span className="aside-stat-val">{totalWorked.toFixed(1)}h</span>
              <span className="aside-stat-lbl">TOTAL WORKED</span>
            </div>
            <div className="aside-divider"></div>
            <div className="aside-stat">
              <span className="aside-stat-val">{maxOT.toFixed(1)}h</span>
              <span className="aside-stat-lbl">MAX OT DAY</span>
            </div>
          </div>
          
          <div className="aside-pulse">
            <div className="pulse-line">
              <div className="pulse-dot"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="monthly-card">
          <div className="card-header-row">
            <div className="card-dots">
              <div className="dot red"></div>
              <div className="dot amber"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-label">MONTHLY OVERTIME — DETAILED REPORT</div>
          </div>

          <div className="card-inner">
            <div className="card-heading">
              <div className="form-title">
                OVERTIME<br />
                <span className="aside-accent">REPORT</span>
              </div>
              <div className="form-subtitle">
                <strong>{currentMonth}</strong> — {records.length} RECORDS
              </div>
            </div>

            {/* OT Summary Card */}
            <div className="ot-summary-card">
              <div className="summary-header">
                <span className="summary-label">TOTAL OVERTIME</span>
                <button onClick={fetchMonthlyOT} className="refresh-btn-mini" disabled={loading}>
                  {loading ? (
                    <span className="mini-spinner"></span>
                  ) : (
                    <svg className="refresh-icon-mini" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6M1 20v-6h6" />
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="summary-value">
                {loading ? (
                  <span className="loading-pulse">...</span>
                ) : (
                  <>
                    <span className="ot-number">{totalOT.toFixed(2)}</span>
                    <span className="ot-unit">hours</span>
                  </>
                )}
              </div>
              <div className="summary-stats">
                <div className="summary-stat-item">
                  <span className="stat-label">AVG PER DAY</span>
                  <span className="stat-value">
                    {records.length > 0 ? (totalOT / records.length).toFixed(2) : "0.00"}h
                  </span>
                </div>
                <div className="summary-stat-divider"></div>
                <div className="summary-stat-item">
                  <span className="stat-label">DAYS WITH OT</span>
                  <span className="stat-value">{daysWithOT}</span>
                </div>
                <div className="summary-stat-divider"></div>
                <div className="summary-stat-item">
                  <span className="stat-label">MAX OT</span>
                  <span className="stat-value">{maxOT.toFixed(2)}h</span>
                </div>
              </div>
            </div>

            {/* Table Controls */}
            <div className="table-controls">
              <div className="filter-info">
                <span>DETAILED BREAKDOWN</span>
              </div>
              <div className="ot-badge">
                <span>💰 Overtime highlighted</span>
              </div>
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="ot-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DAY</th>
                    <th>PUNCH IN</th>
                    <th>PUNCH OUT</th>
                    <th>WORKED</th>
                    <th>OVERTIME</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        <div className="skeleton-loader">
                          <div className="skeleton-row"></div>
                          <div className="skeleton-row"></div>
                          <div className="skeleton-row"></div>
                          <div className="skeleton-row"></div>
                        </div>
                      </td>
                    </tr>
                  ) : records.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        <div className="empty-state">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                          </svg>
                          <span>No overtime records found</span>
                          <small>No data available for this month</small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => {
                      const otHours = r.otHours || 0;
                      const workedHours = r.workedHours || 0;
                      return (
                        <tr key={i} className={`ot-row ${otHours > 0 ? 'has-ot' : ''}`}>
                          <td data-label="DATE">
                            <span className="date-cell">{r.date || "-"}</span>
                          </td>
                          <td data-label="DAY">{r.day || "-"}</td>
                          <td data-label="PUNCH IN">
                            <span className="punch-in">{r.punchIn || "-"}</span>
                          </td>
                          <td data-label="PUNCH OUT">
                            <span className="punch-out">{r.punchOut || "-"}</span>
                          </td>
                          <td data-label="WORKED">
                            <span className="worked-hours">
                              {workedHours ? `${workedHours.toFixed(2)}h` : "-"}
                            </span>
                          </td>
                          <td data-label="OVERTIME" className="ot-cell">
                            {otHours > 0 ? (
                              <div className="ot-badge-value">
                                <span className="ot-icon">⚡</span>
                                <span className="ot-value">{otHours.toFixed(2)}h</span>
                              </div>
                            ) : (
                              <span className="no-ot">0.00h</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {!loading && records.length > 0 && (
              <div className="table-footer">
                <div className="footer-stats">
                  <span>Total Records: <strong>{records.length}</strong></span>
                  <span>Total Worked: <strong>{totalWorked.toFixed(2)}h</strong></span>
                  <span>Total OT: <strong>{totalOT.toFixed(2)}h</strong></span>
                  <span>OT Rate: <strong>{(totalOT / totalWorked * 100).toFixed(1)}%</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monthlyot;