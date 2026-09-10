import { useState } from "react";
import { NavLink } from "react-router-dom";

const icon = {
  dashboard: "🏠",
  news: "📰",
  cat: "🏷",
  events: "📅",
  gallery: "🖼",
  users: "👥",
  settings: "⚙️",
  logout: "↩",
};

export default function AdminSidebar({ active }) {
  const newsSection = ["news", "add-news", "all-news", "drafts"].includes(active);
  // Start open automatically if we're already inside the News section.
  const [newsOpen, setNewsOpen] = useState(newsSection);

  return (
    <aside className="admin-sidebar">
      <div className="as-title">Admin Panel</div>

      <NavLink to="/admin/dashboard" className={`as-link ${active === "dashboard" ? "active" : ""}`}>
        <span className="as-icon">{icon.dashboard}</span> Dashboard
      </NavLink>

      <button
        type="button"
        className={`as-link as-parent ${newsOpen ? "open" : ""}`}
        onClick={() => setNewsOpen((open) => !open)}
      >
        <span className="as-icon">{icon.news}</span> News
        <span className="as-chevron">{newsOpen ? "⌃" : "⌄"}</span>
      </button>

      {newsOpen && (
        <div className="as-submenu">
          <NavLink to="/admin/add-news" className={`as-sublink ${active === "add-news" ? "active" : ""}`}>
            Add News
          </NavLink>
          <NavLink to="/admin/dashboard" className={`as-sublink ${active === "all-news" ? "active" : ""}`}>
            All News
          </NavLink>
          <span className={`as-sublink ${active === "drafts" ? "active" : ""}`}>Drafts</span>
        </div>
      )}

      <span className="as-link">
        <span className="as-icon">{icon.cat}</span> Categories / Keywords
      </span>
      <span className="as-link">
        <span className="as-icon">{icon.events}</span> Common Events
      </span>
      <span className="as-link">
        <span className="as-icon">{icon.gallery}</span> Gallery
      </span>
      <span className="as-link">
        <span className="as-icon">{icon.users}</span> Users
      </span>
      <span className="as-link">
        <span className="as-icon">{icon.settings}</span> Settings
      </span>
      <NavLink to="/admin" className="as-link">
        <span className="as-icon">{icon.logout}</span> Logout
      </NavLink>
    </aside>
  );
}   