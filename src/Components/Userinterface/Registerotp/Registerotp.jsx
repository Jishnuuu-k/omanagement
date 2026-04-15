import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Axios/Axio";
import "./registerotp.css";

function Registerotp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer === 0) return;
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setStatus("error");
      setMessage("Enter all 6 digits");
      return;
    }
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      await api.post("/user/verify-otp", {
        userId,
        otp: otpString,
      });
      setStatus("success");
      setMessage("Account verified successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setStatus("error");
      setMessage(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      const userId = localStorage.getItem("userId");
      await api.post("/user/register", { userId });
      setResendTimer(30);
      setOtp(["", "", "", "", "", ""]);
      setStatus(null);
      setMessage("");
    } catch (error) {
      alert("Failed to resend OTP");
    }
  };

  const filledCount = otp.filter(Boolean).length;

  return (
    <div className="otp-root">
      <div className="otp-grid-bg" />
      <div className="otp-glow" />
      <div className="otp-glow otp-glow-2" />

      <div className="otp-wrapper">
        {/* ── LEFT ASIDE ── */}
        <aside className="otp-aside">
          <div className="aside-tag">
            <span className="aside-dot" />
            Verification
          </div>

          <div>
            <h1 className="aside-title">
              OTP<br />
              VER<span className="aside-accent">IFY</span>
            </h1>
          </div>

          <p className="aside-desc">
            A 6-digit code has been sent to your registered email address. Enter it to activate your account.
          </p>

          {/* Progress indicator */}
          <div className="otp-progress-wrap">
            <div className="otp-progress-label">
              <span className="otp-progress-tag">DIGITS ENTERED</span>
              <span className="otp-progress-count">{filledCount} / 6</span>
            </div>
            <div className="otp-progress-bar">
              <div
                className="otp-progress-fill"
                style={{ width: `${(filledCount / 6) * 100}%` }}
              />
            </div>
          </div>

          <div className="aside-note">
            <span className="note-icon">◎</span>
            <span>Check spam if you don't see the email within a minute.</span>
          </div>

          <div className="aside-pulse">
            <div className="pulse-line">
              <div className="pulse-dot" />
            </div>
          </div>
        </aside>

        {/* ── RIGHT CARD ── */}
        <main className="otp-card">
          <div className="card-header-row">
            <div className="card-dots">
              <span className="dot red" />
              <span className="dot amber" />
              <span className="dot green" />
            </div>
            <span className="card-label">VERIFY-OTP.TSX — EMAIL AUTHENTICATION</span>
          </div>

          <div className="otp-card-inner">
            <div className="card-heading">
              <h2 className="form-title">Enter Code</h2>
              <p className="form-subtitle">
                Check your inbox &mdash; <strong>expires in 10 minutes</strong>
              </p>
            </div>

            {/* OTP inputs */}
            <div className="otp-inputs-group">
              <div className="otp-inputs">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    className={`otp-box${digit ? " otp-box-filled" : ""}${status === "error" ? " otp-box-error" : ""}${status === "success" ? " otp-box-success" : ""}`}
                    value={digit}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </div>

              {/* Separator dots between groups of 3 */}
              <div className="otp-sep-row">
                <div className="otp-sep" />
                <span className="otp-sep-dot">· · ·</span>
                <div className="otp-sep" />
              </div>
            </div>

            {/* Status message */}
            {message && (
              <div className={`otp-message otp-message-${status}`}>
                <span className="otp-msg-icon">
                  {status === "success" ? "✓" : "⚠"}
                </span>
                {message}
              </div>
            )}

            {/* Verify button */}
            <button
              className="reg-btn"
              onClick={handleVerify}
              disabled={loading || filledCount < 6}
            >
              {loading ? (
                <span className="btn-spinner" />
              ) : status === "success" ? (
                <>
                  <span>Verified</span>
                  <span>✓</span>
                </>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>

            {/* Resend row */}
            <div className="otp-resend-row">
              <span className="otp-resend-text">Didn't receive the code?</span>
              <button
                className={`otp-resend-btn${resendTimer > 0 ? " otp-resend-disabled" : ""}`}
                onClick={handleResend}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? (
                  <>
                    Resend in{" "}
                    <span className="otp-timer">{String(resendTimer).padStart(2, "0")}s</span>
                  </>
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>

            <p className="form-login-link">
              Wrong account?{" "}
              <a className="link-accent" href="/register">
                Go back
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Registerotp;