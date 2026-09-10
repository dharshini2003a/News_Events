import { NavLink } from "react-router-dom";

const today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-top">
        <div className="brand">
          <span className="brand-eye">👁</span>
          <span className="brand-name">ARAVIND EYE CARE SYSTEM</span>
          <span className="brand-tagline">
            news <em>update</em>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="header-date">{today}</div>
          <NavLink
            to="/admin"
            style={{
              fontSize: 13,
              color: "var(--navy)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "8px 14px",
            }}
          >
            Admin Login
          </NavLink>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/thingal-udhayam" className={({ isActive }) => (isActive ? "active" : "")}>
              Thingal Udhayam
            </NavLink>
          </li>
          <li>
            <NavLink to="/current-news" className={({ isActive }) => (isActive ? "active" : "")}>
              Current News
            </NavLink>
          </li>
          <li>
            <NavLink to="/archives" className={({ isActive }) => (isActive ? "active" : "")}>
              Archives
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
