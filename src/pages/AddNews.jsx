import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/newsData";
import AdminSidebar from "../components/AdminSidebar";

export default function AddNews() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [shortDesc, setShortDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Salem", "CME", "Aurolab"]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("Published");
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const categoryOptions = categories.filter((c) => c !== "All");

  function addTag(e) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/,$/, "");
      if (clean && !tags.includes(clean)) setTags((t) => [...t, clean]);
      setTagInput("");
    }
  }

  function removeTag(tag) {
    setTags((t) => t.filter((x) => x !== tag));
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const previews = files.map((f) => ({
      id: `${f.name}-${f.lastModified}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setImages((prev) => [...prev, ...previews]);
  }

  function removeImage(id) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function handleSubmit(status) {
    if (!title.trim()) {
      alert("Please enter a news title.");
      return;
    }
    alert(
      `${status === "Draft" ? "Saved as draft" : "Published"}: "${title}"\n(This is a demo — nothing is sent to a server.)`
    );
    navigate("/admin/dashboard");
  }

  return (
    <div className="admin-shell">
      <AdminSidebar active="add-news" />
      <div className="admin-main">
        <div className="admin-topbar">
          <span />
          <span className="admin-welcome">
            Welcome, Admin <span className="admin-avatar">👤</span>
          </span>
        </div>

        <h1 className="section-title" style={{ marginTop: 0 }}>Add News</h1>

        <div className="add-news-grid">
          <div className="add-news-form">
            <div className="form-field">
              <label>News Title *</label>
              <input
                type="text"
                placeholder="Enter news title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Category / Type *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>News Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Short Description</label>
              <input
                type="text"
                placeholder="Enter short description"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Keywords / Tags</label>
              <div className="tag-input-box">
                {tags.map((t) => (
                  <span className="tag-chip" key={t}>
                    {t} <button type="button" onClick={() => removeTag(t)}>✕</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type and press enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
            </div>

            <div className="form-field">
              <label>News Details *</label>
              <div className="rich-toolbar">
                <button type="button"><b>B</b></button>
                <button type="button"><i>I</i></button>
                <button type="button"><u>U</u></button>
                <button type="button">☰</button>
                <button type="button">≣</button>
                <button type="button">⬛</button>
                <button type="button">🔗</button>
                <button type="button">🖼</button>
                <button type="button">📎</button>
                <button type="button">✎</button>
                <button type="button">🔍</button>
              </div>
              <textarea
                rows={5}
                placeholder="Write full news details here..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <div className="form-field" style={{ maxWidth: 220 }}>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>

            <div className="add-news-actions">
              <button type="button" className="btn-secondary" onClick={() => handleSubmit("Draft")}>
                Save as Draft
              </button>
              <button type="button" className="btn-primary" style={{ width: "auto", padding: "11px 26px" }} onClick={() => handleSubmit("Published")}>
                Publish News
              </button>
            </div>
          </div>

          <div className="add-news-gallery">
            <label>Upload Images (Gallery)</label>
            <div
              className={`dropzone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <p>Drag &amp; Drop images here</p>
              <p className="dz-or">or</p>
              <button type="button" className="btn-primary" style={{ width: "auto", padding: "9px 20px" }} onClick={() => fileInputRef.current?.click()}>
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                hidden
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
              <p className="dz-hint">(JPG, PNG, WEBP · Max 10 MB each)</p>
            </div>

            {images.length > 0 && (
              <div className="dz-preview-grid">
                {images.map((img) => (
                  <div className="dz-preview" key={img.id}>
                    <img src={img.url} alt={img.name} />
                    <button type="button" onClick={() => removeImage(img.id)} aria-label="Remove image">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
