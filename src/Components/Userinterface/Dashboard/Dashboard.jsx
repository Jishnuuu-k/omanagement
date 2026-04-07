import React, { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("John Doe");
  const [totalOT, setTotalOT] = useState(0);
  const [daysTracked, setDaysTracked] = useState(0);
  const [records, setRecords] = useState([]);
  const [allTimeRecords, setAllTimeRecords] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [viewMode, setViewMode] = useState("monthly");
  const [punchStatus, setPunchStatus] = useState(null); // null | "in" | "out"
  const [punchInTime, setPunchInTime] = useState(null);
  const [isPunching, setIsPunching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const formattedDate = `${days[currentTime.getDay()]} ${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`;
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const formattedTime = `${displayHours}:${minutes}:${seconds}`;

  const showToast = (message, type = "info") => {
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  const handlePunchIn = async () => {
    if (punchStatus === "in") return;
    setIsPunching(true);
    try {
      const res = await fetch("/api/attendance/punch-in", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
});
      const data = await res.json();
      if (data.error) { showToast(data.error, "error"); return; }
      setPunchStatus("in");
      setPunchInTime(new Date());
      showToast("Punched in successfully", "success");
    } catch {
      // Optimistic update if API not ready
      setPunchStatus("in");
      setPunchInTime(new Date());
    } finally {
      setIsPunching(false);
    }
  };

  const handlePunchOut = async () => {
    if (punchStatus !== "in") return;
    setIsPunching(true);
    try {
      const res = await fetch("/api/attendance/punch-out", { method: "POST" });
      const data = await res.json();
      if (data.error) { showToast(data.error, "error"); return; }
      setPunchStatus("out");
      showToast("Punched out successfully", "success");
    } catch {
      setPunchStatus("out");
    } finally {
      setIsPunching(false);
    }
  };

  const handleCalculateMonthlyOT = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch("/api/attendance/calculate-ot");
      const data = await res.json();
      if (data.error) { showToast(data.error, "error"); return; }
      const recordsList = data.records || [];
      const otDays = recordsList.filter(r => r.workedHours);
      setTotalOT(data.totalOt || 0);
      setDaysTracked(otDays.length);
      setRecords(recordsList);
      setViewMode("monthly");
      showToast(`Loaded ${recordsList.length} records`, "success");
    } catch {
      showToast("Failed to fetch OT data", "error");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleViewAllTimeRecords = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch("/api/attendance/all-records");
      const data = await res.json();
      if (data.error) { showToast(data.error, "error"); return; }
      setAllTimeRecords(data.records || []);
      setViewMode("all-time");
      showToast(`Loaded ${data.records?.length || 0} all-time records`, "success");
    } catch {
      showToast("Failed to fetch all-time records", "error");
    } finally {
      setIsCalculating(false);
    }
  };

  const displayRecords = viewMode === "monthly" ? records : allTimeRecords;

  const punchInTimeStr = punchInTime
    ? `${punchInTime.getHours() % 12 || 12}:${punchInTime.getMinutes().toString().padStart(2, "0")} ${punchInTime.getHours() >= 12 ? "PM" : "AM"}`
    : null;

  return (
    <div className="dashboard-wrapper">

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-tag">// OVERTIME TRACKER v2.0</div>
          <h1 className="dashboard-title">
            OT <span className="accent">MGMT</span><br />DASHBOARD
          </h1>
        </div>
        <div className="header-right">
          <div className="user-welcome">
            <span className="welcome-text">WELCOME BACK,</span>
            <span className="user-name">{userName.toUpperCase()}</span>
          </div>
          <div className="live-date">{formattedDate}</div>
          <div className="live-time">
            <span className="time-dot"></span>
            <span>{formattedTime}</span>
            <span className="time-period">{period}</span>
          </div>
        </div>
      </header>

      {/* ── PUNCH IN / PUNCH OUT ── */}
      <div className="punch-section">
        <div className="punch-status-bar">
          <div className={`punch-indicator ${punchStatus === "in" ? "active" : punchStatus === "out" ? "done" : "idle"}`}>
            <span className="punch-dot"></span>
            <span className="punch-status-text">
              {punchStatus === "in"
                ? `ON SHIFT · SINCE ${punchInTimeStr}`
                : punchStatus === "out"
                ? "SHIFT ENDED"
                : "NOT PUNCHED IN"}
            </span>
          </div>
        </div>

        <div className="punch-buttons">
          <button
            className={`btn-punch btn-punch-in ${punchStatus === "in" ? "disabled" : ""}`}
            onClick={handlePunchIn}
            disabled={isPunching || punchStatus === "in"}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            PUNCH IN
          </button>

          <button
            className={`btn-punch btn-punch-out ${punchStatus !== "in" ? "disabled" : ""}`}
            onClick={handlePunchOut}
            disabled={isPunching || punchStatus !== "in"}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            PUNCH OUT
          </button>
        </div>
      </div>

      {/* OT Summary Cards */}
      <div className="ot-section">
        <div className="ot-card featured">
          <div className="card-label">// Total Overtime This Month</div>
          <div>
            <span className="card-value">{totalOT.toFixed(1)}</span>
            <span className="card-unit">hrs</span>
          </div>
          <div className="progress-wrap">
            <div className="progress-bar" style={{ width: `${Math.min((totalOT / 40) * 100, 100)}%` }}></div>
          </div>
          <div className="card-sub">{Math.min((totalOT / 40) * 100, 100).toFixed(0)}% of 40-hr OT threshold</div>
        </div>

        <div className="ot-card">
          <div className="card-label">// Days Tracked</div>
          <div><span className="card-value small">{daysTracked || "—"}</span></div>
          <div className="card-sub">Working days logged</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="calc-wrap">
        <button
          className={`btn-calc ${isCalculating && viewMode === "monthly" ? "loading" : ""} ${viewMode === "monthly" ? "active" : ""}`}
          onClick={handleCalculateMonthlyOT}
          disabled={isCalculating}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {isCalculating && viewMode === "monthly" ? "LOADING DATA..." : "CALCULATE MONTHLY OT"}
        </button>

        <button
          className={`btn-calc secondary ${isCalculating && viewMode === "all-time" ? "loading" : ""} ${viewMode === "all-time" ? "active" : ""}`}
          onClick={handleViewAllTimeRecords}
          disabled={isCalculating}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          {isCalculating && viewMode === "all-time" ? "LOADING DATA..." : "VIEW ALL-TIME RECORDS"}
        </button>
      </div>

      {/* Records Table */}
      <div className="records-section">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-title">
              {viewMode === "monthly" ? "MONTHLY RECORDS" : "ALL-TIME RECORDS"}
            </span>
            {viewMode === "all-time" && (
              <span className="section-subtitle">Complete attendance history since registration</span>
            )}
          </div>
          <span className="record-count">{displayRecords.length} ENTRIES</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Worked Hrs</th>
                <th>OT Hrs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-icon">◎</div>
                      <div className="empty-text">
                        {viewMode === "monthly"
                          ? "No records yet — press calculate to load monthly data"
                          : "No records yet — press view all-time records to load complete history"}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                displayRecords.map((record, index) => {
                  const isWeekend = record.day && (record.day.startsWith("Sun") || record.day.startsWith("Sat"));
                  const hasOt = record.otHours && record.otHours > 0;
                  return (
                    <tr key={index}>
                      <td>{record.date || "—"}</td>
                      <td>
                        <span className={`day-pill ${isWeekend ? "weekend" : "weekday"}`}>
                          {record.day || "—"}
                        </span>
                      </td>
                      <td className="time-cell">{record.punchIn || "—"}</td>
                      <td className="time-cell">{record.punchOut || "—"}</td>
                      <td className="worked-hours">{record.workedHours ? record.workedHours.toFixed(2) : "—"}</td>
                      <td className={`ot-cell ${hasOt ? "has-ot" : "no-ot"}`}>
                        {hasOt ? record.otHours.toFixed(2) : "0.00"}
                      </td>
                      <td>
                        {hasOt
                          ? <span className="status-badge ot">▲ OT</span>
                          : <span className="status-badge std">— STD</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;