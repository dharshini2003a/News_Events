import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    navigate("/admin/dashboard");
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-watermark">👁</div>
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="brand-eye">👁</div>
          <div className="admin-login-brand">ARAVIND EYE CARE SYSTEM</div>
          <div className="admin-login-tagline">
            <span className="tl-news">news</span> <span className="tl-update">update</span>
          </div>
          <h2>Administrator Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-field icon-field" style={{ textAlign: "left" }}>
              <label>User Name</label>
              <div className="icon-input">
                <span className="field-icon">👤</span>
                <input type="text" placeholder="Enter user name" defaultValue="admin" />
              </div>
            </div>
            <div className="form-field icon-field" style={{ textAlign: "left" }}>
              <label>Password</label>
              <div className="icon-input">
                <span className="field-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  defaultValue="demo1234"
                />
                <button
                  type="button"
                  className="field-icon-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <button className="btn-primary" type="submit">
              Login
            </button>
          </form>
          <p className="demo-note">Demo only — any credentials will log you in.</p>
        </div>
      </div>
      <footer className="site-footer admin-login-footer">
        © 2012 👁 ARAVIND EYE CARE SYSTEM
      </footer>
    </div>
  );
}
