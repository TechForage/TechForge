import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

/* Corner circuit trace — lights up ember when its linked field is valid */
function CornerTrace({ position, active }) {
  return (
    <svg
      className={`tf-corner ${position} ${active ? "active" : ""}`}
      viewBox="0 0 34 34"
      aria-hidden="true"
    >
      <path d="M2,34 L2,10 Q2,2 10,2 L34,2" />
      <circle cx="2" cy="2" r="3" />
    </svg>
  );
}

function getStrength(pw) {
  if (!pw) return { level: 0, key: "none", label: "Enter a password" };
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

  if (pw.length >= 10 && hasLetter && hasNumber && hasSpecial) {
    return { level: 4, key: "white-hot", label: "White-hot" };
  }
  if (pw.length >= 8 && hasLetter && hasNumber) {
    return { level: 3, key: "hot", label: "Hot" };
  }
  if (pw.length >= 6) {
    return { level: 2, key: "warm", label: "Warm" };
  }
  return { level: 1, key: "cold", label: "Cold" };
}

export default function Auth() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const { login, register } = useAuth();

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const nameValid = form.name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const strength = useMemo(() => getStrength(form.password), [form.password]);
  const passwordValid = strength.level >= 2;
  const confirmValid = form.confirm.length > 0 && form.confirm === form.password;

  const RegistercircuitComplete =
    nameValid && emailValid && passwordValid && confirmValid && form.agree;
  
  const LogincircuitComplete =
    emailValid && passwordValid;

const handleSubmit = async (e) => {
  e.preventDefault();

  const valid = showLogin
    ? LogincircuitComplete
    : RegistercircuitComplete;

  if (!valid || submitting) return;

  setSubmitError(null);
  setSubmitting(true);

  try {
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    const result = showLogin
      ? await login(payload.email, payload.password)
      : await register(payload);

    if (!result.success) {
      throw new Error(result.error || "Authentication failed");
    }

    setForm({
      name: "",
      email: "",
      password: "",
      confirm: "",
      agree: false,
    });

    navigate("/");
  } catch (error) {
    setSubmitError(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    
    <div className="tf-page">
      {/* ---------------- Left: brand panel ---------------- */}
      <div className="tf-brand">
        <div className="tf-wordmark">
          <span className="dot" />
          TechForge
        </div>

        <div className="tf-brand-copy">
          <p className="tf-eyebrow">Account setup</p>
          <h1 className="tf-headline">
            Every great build starts with an account.
          </h1>
          <p className="tf-subtext">
            Track orders, save your builds, and get restock alerts the
            moment new parts land.
          </p>
        </div>

        <div className="tf-brand-footer">
          <span>© {new Date().getFullYear()} TechForge</span>
          <span>Parts. Builds. People.</span>
        </div>

        <svg className="tf-circuit-art" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
          <path d="M0,120 H180 V260 H420 V60 H600" />
          <path d="M0,420 H120 V560 H340 V680 H600" className="live" />
          <path d="M60,0 V180 H260 V420" />
          <path d="M500,800 V620 H300 V500" />
          <path d="M0,700 H200 V760" className="live" />
          <circle cx="180" cy="120" r="4" />
          <circle cx="420" cy="260" r="4" className="node-live" />
          <circle cx="120" cy="420" r="4" className="node-live" />
          <circle cx="340" cy="560" r="4" />
          <circle cx="260" cy="180" r="4" />
          <circle cx="300" cy="620" r="4" />
        </svg>
      </div>

      {/* ---------------- Right: form panel ---------------- */}
      {!showLogin ? (<div className="tf-form-panel">
        <form className="tf-card" onSubmit={handleSubmit}>
          <CornerTrace position="tl" active={nameValid} />
          <CornerTrace position="tr" active={emailValid} />
          <CornerTrace position="bl" active={passwordValid} />
          <CornerTrace position="br" active={confirmValid} />

          <h2 className="tf-card-heading">Create your account</h2>
          <p className="tf-card-sub">
            Already forging with us? <a className="tf-link" onClick={() => setShowLogin(true)}>Sign in</a>
          </p>

          <div className="tf-field">
            <div className="tf-label">
              <span>Full name</span>
              {nameValid && <span className="tf-status ok">✓ good</span>}
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${nameValid ? "valid" : ""}`}
                type="text"
                placeholder="Ada Lovelace"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="tf-field">
            <div className="tf-label">
              <span>Email address</span>
              {emailValid && <span className="tf-status ok">✓ good</span>}
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${emailValid ? "valid" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="tf-field">
            <div className="tf-label">
              <span>Password</span>
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${passwordValid ? "valid" : ""}`}
                type={showPw ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={update("password")}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="tf-toggle-visibility"
                onClick={() => setShowPw((s) => !s)}
              >
                {showPw ? "hide" : "show"}
              </button>
            </div>
          </div>

          <div className="tf-field">
            <div className="tf-label">
              <span>Confirm password</span>
              {confirmValid && <span className="tf-status ok">✓ match</span>}
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${confirmValid ? "valid" : ""}`}
                type={showPw ? "text" : "password"}
                placeholder="Type it again"
                value={form.confirm}
                onChange={update("confirm")}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="tf-terms">
            <input
              className="tf-checkbox"
              id="tf-agree"
              type="checkbox"
              checked={form.agree}
              onChange={update("agree")}
            />
            <label htmlFor="tf-agree">
              I agree to the <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </label>
          </div>

          {submitError && <p className="tf-error">⚠ {submitError}</p>}

          <button
            className={`tf-submit ${RegistercircuitComplete ? "energized" : ""}`}
            type="submit"
            disabled={!RegistercircuitComplete || submitting}
          >
            {submitting
              ? "Forging…"
              : RegistercircuitComplete
              ? "Forge my account"
              : "Complete the circuit"}
          </button>

          <p className="tf-footer-link">
            Already have an account? <a className="tf-link" onClick = {()=>setShowLogin(true)}>Sign in</a>
          </p>
        </form>
      </div>) 
      
      : 
      
      
      <div className="tf-form-panel">
        <form className="tf-card" onSubmit={handleSubmit}>
          <CornerTrace position="tr" active={emailValid} />
          <CornerTrace position="bl" active={passwordValid} />

          <h2 className="tf-card-heading">Sign in your account</h2>
          <p className="tf-card-sub">
            Don't have an account? <a className="tf-link" onClick={() => setShowLogin(false)}>Sign up</a>
          </p>

          <div className="tf-field">
            <div className="tf-label">
              <span>Email address</span>
              {emailValid && <span className="tf-status ok">✓ good</span>}
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${emailValid ? "valid" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="tf-field">
            <div className="tf-label">
              <span>Password</span>
            </div>
            <div className="tf-input-wrap">
              <input
                className={`tf-input ${passwordValid ? "valid" : ""}`}
                type={showPw ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={update("password")}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="tf-toggle-visibility"
                onClick={() => setShowPw((s) => !s)}
              >
                {showPw ? "hide" : "show"}
              </button>
            </div>
          </div>


          {submitError && <p className="tf-error">⚠ {submitError}</p>}

          <button
            className={`tf-submit ${LogincircuitComplete ? "energized" : ""}`}
            type="submit"
            disabled={!LogincircuitComplete || submitting}
          >
            {submitting
              ? "Forging…"
              : LogincircuitComplete
              ? "Forge my account"
              : "Complete the circuit"}
          </button>

          <p className="tf-footer-link">
            Don't have an account? <a className="tf-link" onClick = {()=>setShowLogin(false)}>Sign up</a>
          </p>
        </form>
      </div>}
      
    </div>
  );
}
