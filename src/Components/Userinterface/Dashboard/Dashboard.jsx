import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("John Doe");

  const [punchStatus, setPunchStatus] = useState(null); // null | "in" | "out"
  const [punchInTime, setPunchInTime] = useState(null);
  const [isPunching, setIsPunching] = useState(false);

  // ⏱ LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 👤 USER NAME
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserName(user.fullName);
  }, []);

  // 📅 DATE + TIME FORMAT
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const formattedDate = `${days[currentTime.getDay()]} ${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  const formattedTime = `${displayHours}:${minutes}:${seconds}`;

  // 🔔 TOAST (TEMP)
  const showToast = (message, type = "info") => {
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  // 🟢 PUNCH IN
  const handlePunchIn = async () => {
    if (punchStatus === "in") return;

    setIsPunching(true);
    try {
      const res = await fetch("/api/attendance/punch-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast(data.error, "error");
        return;
      }

      setPunchStatus("in");
      setPunchInTime(new Date());
      showToast("Punched in successfully", "success");
    } catch {
      // fallback
      setPunchStatus("in");
      setPunchInTime(new Date());
    } finally {
      setIsPunching(false);
    }
  };

  // 🔴 PUNCH OUT
  const handlePunchOut = async () => {
    if (punchStatus !== "in") return;

    setIsPunching(true);
    try {
      const res = await fetch("/api/attendance/punch-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast(data.error, "error");
        return;
      }

      setPunchStatus("out");
      showToast("Punched out successfully", "success");
    } catch {
      setPunchStatus("out");
    } finally {
      setIsPunching(false);
    }
  };

  // ⏱ FORMAT PUNCH TIME
  const punchInTimeStr = punchInTime
    ? `${punchInTime.getHours() % 12 || 12}:${punchInTime
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${punchInTime.getHours() >= 12 ? "PM" : "AM"}`
    : null;

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
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

      {/* PUNCH SECTION */}
      <div className="punch-section">
        <div className="punch-status-bar">
          <div className={`punch-indicator ${
            punchStatus === "in"
              ? "active"
              : punchStatus === "out"
              ? "done"
              : "idle"
          }`}>
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
            PUNCH IN
          </button>

          <button
            className={`btn-punch btn-punch-out ${punchStatus !== "in" ? "disabled" : ""}`}
            onClick={handlePunchOut}
            disabled={isPunching || punchStatus !== "in"}
          >
            PUNCH OUT
          </button>
        </div>
      </div>

      {/* NAVIGATION ACTIONS */}
      <div className="calc-wrap">

        <button
          className="btn-calc"
          onClick={() => navigate("/monthly-ot")}
        >
          CALCULATE MONTHLY OT
        </button>

        <button
          className="btn-calc secondary"
          onClick={() => navigate("/alltime-records")}
        >
          VIEW ALL-TIME RECORDS
        </button>

      </div>

    </div>
  );
}

export default Dashboard;