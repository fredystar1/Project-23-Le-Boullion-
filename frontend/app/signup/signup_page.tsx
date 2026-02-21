"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    streetAddress: "",
    city: "",
    dateOfBirth: "",
    phoneNumber: "",
  });

  const [isOver21, setIsOver21] = useState<"yes" | "no" | null>(null);
  const [receiveNotifications, setReceiveNotifications] = useState<"yes" | "no" | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validatePassword = (pw: string): string | null => {
    if (!pw) return "Password is required.";
    if (pw.length < 10) return "Password must be at least 10 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must include at least one uppercase letter.";
    if (!/[0-9]/.test(pw)) return "Password must include at least one number.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw))
      return "Password must include at least one special character (e.g. ! @ # $ %).";
    return null;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName) newErrors.firstName = "First name is required.";
    if (!form.lastName) newErrors.lastName = "Last name is required.";
    if (!form.email) newErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email address.";
    if (!form.confirmEmail) newErrors.confirmEmail = "Please confirm your email.";
    else if (form.email !== form.confirmEmail) newErrors.confirmEmail = "Email addresses do not match.";
    const passwordError = validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!form.streetAddress) newErrors.streetAddress = "Street address is required.";
    if (!form.city) newErrors.city = "City is required.";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (isOver21 !== "yes") newErrors.isOver21 = "⚠️ You must confirm you are 21 or older to create an account.";
    if (!agreedToTerms) newErrors.terms = "⚠️ You must agree to the Terms and Conditions to continue.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          isOver21: isOver21 === "yes",
          receiveNotifications: receiveNotifications === "yes",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ general: data.message || "Sign up failed. Please try again." });
      } else {
        window.location.href = "/login";
      }
    } catch {
      setErrors({ general: "Unable to connect. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    id,
    label,
    type = "text",
    placeholder,
  }: {
    id: keyof typeof form;
    label: string;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="field-wrap">
      <input
        id={id}
        type={type}
        className={`field-input ${errors[id] ? "field-error" : ""}`}
        placeholder={placeholder || label}
        value={form[id]}
        onChange={(e) => update(id, e.target.value)}
      />
      {errors[id] && <span className="error-inline">{errors[id]}</span>}
    </div>
  );

  return (
    <main className="signup-root">
      <div className="signup-card">
        <div className="card-accent" />

        <div className="card-inner">
          <div className="brand-header">
            <div className="wine-icon">🍷</div>
            <p className="brand-name">Howard Street Wine Merchant</p>
          </div>

          <h1 className="page-title">Sign-Up</h1>

          {errors.general && <p className="error-msg">{errors.general}</p>}

          <Field id="firstName" label="First Name" />
          <Field id="lastName" label="Last Name" />
          <Field id="email" label="Email Address" type="email" />
          <Field id="confirmEmail" label="Confirm Email Address" type="email" />
          <Field id="password" label="Password" type="password" />
          <div className="password-hint">
            Password must be at least 10 characters and include an uppercase letter, a number, and a special character (e.g. ! @ # $).
          </div>
          <Field id="confirmPassword" label="Confirm Password" type="password" />
          <Field id="streetAddress" label="Street Address" />
          <Field id="city" label="City" />
          <Field id="dateOfBirth" label="date of birth" type="date" />

          {/* Age Confirmation */}
          <div className="check-row">
            <span className="check-question">
              Do you confirm you are 21 years of age or older?
            </span>
            <label className="check-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={isOver21 === "yes"}
                onChange={() => setIsOver21(isOver21 === "yes" ? null : "yes")}
              />
              Yes
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={isOver21 === "no"}
                onChange={() => setIsOver21(isOver21 === "no" ? null : "no")}
              />
              No
            </label>
          </div>
          {errors.isOver21 && <p className="error-inline">{errors.isOver21}</p>}

          <Field id="phoneNumber" label="Phone Number" type="tel" />

          {/* Notifications */}
          <div className="check-row">
            <span className="check-question">
              Would you like to receive email notifications and text messages about promotions?
            </span>
            <label className="check-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={receiveNotifications === "yes"}
                onChange={() =>
                  setReceiveNotifications(receiveNotifications === "yes" ? null : "yes")
                }
              />
              Yes
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={receiveNotifications === "no"}
                onChange={() =>
                  setReceiveNotifications(receiveNotifications === "no" ? null : "no")
                }
              />
              No
            </label>
          </div>

          {/* Terms */}
          <div className="terms-row">
            <label className="terms-label">
              <input
                type="checkbox"
                className="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span style={{ color: "#c0392b", fontSize: "1rem", flexShrink: 0, marginTop: "-2px" , alignSelf: "center" }}>●</span>
              <span>
                I have read and agree to the Wine Website{" "}
                <Link href="/terms" className="terms-link">
                  Terms and Conditions
                </Link>
              </span>
            </label>
            {errors.terms && <span className="error-inline">{errors.terms}</span>}
          </div>

          {/* Buttons */}
          <div className="btn-row">
            <button className="continue-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating Account..." : "Continue"}
            </button>
            <Link href="/" className="cancel-btn">
              Cancel
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap");

        .signup-root {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: #f7f4f0;
          background-image: radial-gradient(ellipse at 100% 0%, #f0e8e0 0%, transparent 50%);
          font-family: "Lato", sans-serif;
          padding: 2rem 1rem;
        }

        .signup-card {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          margin: 1rem 0;
        }

        .card-accent {
          height: 5px;
          background: linear-gradient(90deg, #8b1a1a, #c0392b, #8b1a1a);
        }

        .card-inner {
          padding: 2rem 2.5rem 2.5rem;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          justify-content: center;
        }

        .wine-icon {
          font-size: 1.2rem;
        }

        .brand-name {
          font-family: "Playfair Display", serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #8b1a1a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
        }

        .page-title {
          font-family: "Playfair Display", serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin: 0 0 1.5rem;
        }

        .error-msg {
          background: #fff0f0;
          border-left: 3px solid #c0392b;
          color: #c0392b;
          padding: 0.6rem 0.9rem;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          border-radius: 2px;
        }

        .field-wrap {
          margin-bottom: 0.7rem;
        }

        .field-input {
          display: block;
          width: 100%;
          height: 38px;
          border: 1px solid #bbb;
          border-radius: 3px;
          padding: 0 0.75rem;
          font-size: 0.9rem;
          font-family: "Lato", sans-serif;
          color: #222;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .field-input:focus {
          border-color: #8b1a1a;
        }

        .field-input.field-error {
          border-color: #c0392b;
          background: #fff8f8;
        }

        .password-hint {
          font-size: 0.75rem;
          color: #777;
          background: #f9f9f9;
          border-left: 3px solid #c0392b;
          padding: 0.4rem 0.6rem;
          margin: -0.3rem 0 0.7rem;
          line-height: 1.4;
        }

        .error-inline {
          display: block;
          font-size: 0.75rem;
          color: #c0392b;
          margin-top: 0.2rem;
          padding-left: 0.25rem;
        }

        .check-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0.9rem 0 0.4rem;
        }

        .check-question {
          font-size: 0.88rem;
          color: #333;
          flex: 1 1 100%;
          line-height: 1.4;
        }

        .check-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
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

        .terms-row {
          margin: 1rem 0 1.5rem;
        }

        .terms-label {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #333;
          cursor: pointer;
          line-height: 1.5;
        }

        .terms-label .checkbox {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .terms-link {
          color: #1a1a8b;
          text-decoration: underline;
          font-weight: 700;
        }

        .terms-link:hover {
          color: #0d0d6e;
        }

        .btn-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .continue-btn {
          padding: 0.7rem 2.2rem;
          background: #2980d9;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-family: "Lato", sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .continue-btn:hover:not(:disabled) {
          background: #1f6ab5;
          transform: translateY(-1px);
        }

        .continue-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-btn {
          display: inline-block;
          padding: 0.7rem 2.2rem;
          background: #e09c1a;
          color: #222;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, transform 0.1s;
        }

        .cancel-btn:hover {
          background: #c8861a;
          transform: translateY(-1px);
        }
      `}</style>
    </main>
  );
}
