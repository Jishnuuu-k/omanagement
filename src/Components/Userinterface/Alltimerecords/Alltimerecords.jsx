import React, { useEffect, useState } from "react";
import "./alltimerecords.css";

const API_BASE = "http://localhost:5000";

function AlltimeRecords() {
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalDays: 0, totalHours: 0, totalOT: 0 });

  const fetchRecords = async () => {
    if (!token) {
      alert("Unauthorized. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/attendance/all-records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Failed to fetch records");
        return;
      }

      const recordsData = data.records || [];
      setRecords(recordsData);
      
      // Calculate statistics
      const totalDays = recordsData.length;
      const totalHours = recordsData.reduce((sum, r) => sum + (r.workedHours || 0), 0);
      const totalOT = recordsData.reduce((sum, r) => sum + (r.otHours || 0), 0);
      
      setStats({
        totalDays,
        totalHours: totalHours.toFixed(2),
        totalOT: totalOT.toFixed(2)
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while fetching records");
    } finally {
      setLoading(false);
    }
  };


// HERE HERE HERE


useEffect(() => {
  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/attendance/all-records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRecords(data.records || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchRecords();
}, [token]);


  return (
    <div className="records-root">
      <div className="records-grid-bg"></div>
      <div className="records-glow"></div>

      <div className="records-wrapper">
        {/* Left Sidebar */}
        <div className="records-aside">
          <div className="aside-tag">
            <span className="aside-dot"></span>
            <span>ATTENDANCE PORTAL</span>
          </div>
          
          <div className="aside-title">
            TIME<br />
            <span className="aside-accent">CAPSULE</span>
          </div>
          
          <div className="aside-desc">
            Complete history of your attendance records. Track your productivity and overtime.
          </div>
          
          <div className="aside-stats">
            <div className="aside-stat">
              <span className="aside-stat-val">{stats.totalDays}</span>
              <span className="aside-stat-lbl">TOTAL DAYS</span>
            </div>
            <div className="aside-divider"></div>
            <div className="aside-stat">
              <span className="aside-stat-val">{stats.totalHours}h</span>
              <span className="aside-stat-lbl">WORKED</span>
            </div>
            <div className="aside-divider"></div>
            <div className="aside-stat">
              <span className="aside-stat-val">{stats.totalOT}h</span>
              <span className="aside-stat-lbl">OVERTIME</span>
            </div>
          </div>
          
          <div className="aside-pulse">
            <div className="pulse-line">
              <div className="pulse-dot"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="records-card">
          <div className="card-header-row">
            <div className="card-dots">
              <div className="dot red"></div>
              <div className="dot amber"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-label">ALL TIME RECORDS — ARCHIVE</div>
          </div>

          <div className="card-inner">
            <div className="card-heading">
              <div className="form-title">
                ATTENDANCE<br />
                <span className="aside-accent">ARCHIVE</span>
              </div>
              <div className="form-subtitle">
                <strong>{records.length}</strong> RECORDS FOUND
              </div>
            </div>

            <div className="table-controls">
              <button onClick={fetchRecords} className="refresh-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="btn-spinner-small"></span>
                    LOADING...
                  </>
                ) : (
                  <>
                    <svg className="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6M1 20v-6h6" />
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                    </svg>
                    REFRESH
                  </>
                )}
              </button>
              
              <div className="filter-info">
                <span>ALL TIME</span>
              </div>
            </div>

            <div className="table-container">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DAY</th>
                    <th>PUNCH IN</th>
                    <th>PUNCH OUT</th>
                    <th>WORKED</th>
                    <th>OT</th>
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
                        </div>
                      </td>
                    </tr>
                  ) : records.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        <div className="empty-state">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 12v8H4v-8M12 2v12m0 0l-3-3m3 3l3-3"/>
                          </svg>
                          <span>No records found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i} className="record-row">
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
                            {r.workedHours ? `${r.workedHours.toFixed(2)}h` : "-"}
                          </span>
                        </td>
                        <td data-label="OT">
                          <span className="ot-hours">
                            {r.otHours ? `${r.otHours.toFixed(2)}h` : "0.00h"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {!loading && records.length > 0 && (
              <div className="table-footer">
                <div className="footer-stats">
                  <span>Total Records: <strong>{records.length}</strong></span>
                  <span>Total Worked: <strong>{stats.totalHours}h</strong></span>
                  <span>Total OT: <strong>{stats.totalOT}h</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlltimeRecords;