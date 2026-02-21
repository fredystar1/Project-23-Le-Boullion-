"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState<"yes" | "no" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember: remember === "yes" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed. Please try again.");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-root">
      <div className="wine-card">
        {/* Decorative top bar */}
        <div className="card-accent" />

        <div className="card-inner">
          <div className="brand-header">
            <div className="wine-icon">🍷</div>
            <h1 className="brand-name">Howard Street</h1>
            <p className="brand-sub">Wine Merchant</p>
          </div>

          <h2 className="page-title">LOGIN</h2>

          {error && <p className="error-msg">{error}</p>}

          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Your Email:
            </label>
            <input
              id="email"
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="remember-row">
            <span className="field-label">Remember You?</span>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={remember === "yes"}
                onChange={() => setRemember(remember === "yes" ? null : "yes")}
              />
              Yes
            </label>
            <span className="or-text">Or</span>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={remember === "no"}
                onChange={() => setRemember(remember === "no" ? null : "no")}
              />
              No
            </label>
          </div>

          <button
            className="continue-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>

          <Link href="/" className="forgot-btn">
            Forgot Password
          </Link>

          <div className="divider">
            <span className="divider-line" />
            <span className="divider-or">OR</span>
            <span className="divider-line" />
          </div>

          <p className="signup-prompt">
            Do not have an account? Please click to{" "}
            <Link href="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap");

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a0a0a;
          background-image: radial-gradient(ellipse at 20% 50%, #2d0f0f 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, #1e0b1e 0%, transparent 50%);
          font-family: "Lato", sans-serif;
          padding: 2rem;
        }

        .wine-card {
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }

        .card-accent {
          height: 6px;
          background: linear-gradient(90deg, #8b1a1a, #c0392b, #8b1a1a);
        }

        .card-inner {
          padding: 2.5rem 3rem 3rem;
        }

        .brand-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .wine-icon {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }

        .brand-name {
          font-family: "Playfair Display", serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #8b1a1a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }

        .brand-sub {
          font-size: 0.7rem;
          color: #999;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0.15rem 0 0;
        }

        .page-title {
          font-family: "Playfair Display", serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin: 0 0 1.8rem;
          letter-spacing: 0.05em;
        }

        .error-msg {
          background: #fff0f0;
          border-left: 3px solid #c0392b;
          color: #c0392b;
          padding: 0.6rem 0.9rem;
          font-size: 0.85rem;
          margin-bottom: 1.2rem;
          border-radius: 2px;
        }

        .field-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.1rem;
        }

        .field-label {
          font-size: 0.95rem;
          color: #333;
          font-weight: 400;
          white-space: nowrap;
          min-width: 100px;
          text-align: right;
        }

        .field-input {
          flex: 1;
          height: 38px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 0 0.75rem;
          font-size: 0.9rem;
          font-family: "Lato", sans-serif;
          background: #f5f5f5;
          color: #222;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }

        .field-input:focus {
          border-color: #8b1a1a;
          background: #fff;
        }

        .remember-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.9rem;
          color: #333;
          cursor: pointer;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          accent-color: #8b1a1a;
          cursor: pointer;
        }

        .or-text {
          font-size: 0.85rem;
          color: #888;
        }

        .continue-btn {
          display: block;
          width: 60%;
          margin: 0 auto 1.2rem;
          padding: 0.75rem;
          background: #2d7a2d;
          color: #fff;
          border: none;
          border-radius: 3px;
          font-size: 1.05rem;
          font-family: "Lato", sans-serif;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .continue-btn:hover:not(:disabled) {
          background: #245c24;
          transform: translateY(-1px);
        }

        .continue-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .forgot-btn {
          display: inline-block;
          background: #e09c1a;
          color: #222;
          padding: 0.4rem 0.9rem;
          border-radius: 3px;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s;
        }

        .forgot-btn:hover {
          background: #c8861a;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #ccc;
        }

        .divider-or {
          font-size: 0.8rem;
          color: #888;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .signup-prompt {
          text-align: center;
          font-size: 0.9rem;
          color: #444;
          margin: 0;
        }

        .signup-link {
          color: #c026d3;
          font-weight: 700;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .signup-link:hover {
          color: #a01ab0;
        }
      `}</style>
    </main>
  );
}
