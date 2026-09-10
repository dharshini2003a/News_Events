import { useState } from "react";
import { newsList as initialNewsList, formatDate } from "../data/newsData";
import AdminSidebar from "../components/AdminSidebar";

const TOTAL_IMAGES = initialNewsList.reduce((sum, n) => sum + n.gallery.length, 0);

export default function AdminDashboard() {
  const [newsList, setNewsList] = useState(initialNewsList);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? newsList : newsList.slice(0, 5);

  function handleDelete(id) {
    if (window.confirm("Delete this news item?")) {
      setNewsList((list) => list.filter((n) => n.id !== id));
    }
  }

  return (
    <div className="admin-shell">
      <AdminSidebar active="dashboard" />
      <div className="admin-main">
        <div className="admin-topbar">
          <span />
          <span className="admin-welcome">
            Welcome, Admin <span className="admin-avatar">👤</span>
          </span>
        </div>

        <h1 className="section-title" style={{ marginTop: 0 }}>Dashboard</h1>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">📰</div>
            <div>
              <div className="lbl">Total News</div>
              <div className="num">{newsList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">✅</div>
            <div>
              <div className="lbl">Published News</div>
              <div className="num">{newsList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-orange">📋</div>
            <div>
              <div className="lbl">Drafts</div>
              <div className="num">0</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">🖼</div>
            <div>
              <div className="lbl">Total Images</div>
              <div className="num">{TOTAL_IMAGES}</div>
            </div>
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--serif)", color: "var(--navy)" }}>Recent News</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((n) => (
              <tr key={n.id}>
                <td>{n.title}</td>
                <td>{formatDate(n.date)}</td>
                <td><span className="status-pill">Published</span></td>
                <td>
                  <div className="admin-row-actions">
                    <button className="row-action edit" title="Edit">✎</button>
                    <button className="row-action view" title="View">👁</button>
                    <button className="row-action delete" title="Delete" onClick={() => handleDelete(n.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!showAll && newsList.length > 5 && (
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <button className="btn-primary" style={{ width: "auto", padding: "10px 22px" }} onClick={() => setShowAll(true)}>
              View All News
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
