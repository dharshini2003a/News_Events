import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { newsList, formatDate } from "../data/newsData";

const PAGE_SIZE = 4;

function Lightbox({ images, title, startIndex, onClose }) {
  const [active, setActive] = useState(startIndex);
  const total = images.length;

  function prev(e) {
    e.stopPropagation();
    setActive((a) => (a === 0 ? total - 1 : a - 1));
  }
  function next(e) {
    e.stopPropagation();
    setActive((a) => (a === total - 1 ? 0 : a + 1));
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setActive((a) => (a === 0 ? total - 1 : a - 1));
      if (e.key === "ArrowRight") setActive((a) => (a === total - 1 ? 0 : a + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {total > 1 && (
        <button className="lightbox-arrow lightbox-prev" onClick={prev} aria-label="Previous photo">
          ←
        </button>
      )}

      <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        <img src={images[active]} alt={`${title} photo ${active + 1}`} />
        <div className="lightbox-caption">
          {title}
          {total > 1 && (
            <span className="lightbox-count"> · {active + 1} / {total}</span>
          )}
        </div>
      </div>

      {total > 1 && (
        <button className="lightbox-arrow lightbox-next" onClick={next} aria-label="Next photo">
          →
        </button>
      )}
    </div>
  );
}

function PhotoCarousel({ images, title }) {
  const [openAt, setOpenAt] = useState(null);
  const [page, setPage] = useState(0);

  if (images.length === 0) return null;

  const pageCount = Math.ceil(images.length / PAGE_SIZE);
  const visible = images.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const startIndex = page * PAGE_SIZE;

  function prevPage() {
    setPage((p) => (p === 0 ? pageCount - 1 : p - 1));
  }
  function nextPage() {
    setPage((p) => (p === pageCount - 1 ? 0 : p + 1));
  }

  return (
    <>
      <div className="gallery-pager">
        {pageCount > 1 && (
          <button className="gallery-arrow gallery-prev" onClick={prevPage} aria-label="Previous photos">
            ←
          </button>
        )}

        <div className="gallery-grid">
          {visible.map((src, i) => (
            <img
              key={startIndex + i}
              src={src}
              alt={`${title} photo ${startIndex + i + 1}`}
              onClick={() => setOpenAt(startIndex + i)}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <button className="gallery-arrow gallery-next" onClick={nextPage} aria-label="Next photos">
            →
          </button>
        )}
      </div>

      {pageCount > 1 && (
        <div className="gallery-dots">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className={`gallery-dot ${i === page ? "active" : ""}`}
              onClick={() => setPage(i)}
              aria-label={`Go to photo set ${i + 1}`}
            />
          ))}
        </div>
      )}

      {openAt !== null && (
        <Lightbox
          images={images}
          title={title}
          startIndex={openAt}
          onClose={() => setOpenAt(null)}
        />
      )}
    </>
  );
}

export default function NewsDetail() {
  const { id } = useParams();
  const news = newsList.find((n) => String(n.id) === id);

  if (!news) {
    return (
      <div className="container page-content">
        <p>News item not found.</p>
        <Link to="/current-news">← Back to Current News</Link>
      </div>
    );
  }

  // A news item might have extra gallery photos besides the thumbnail
  // (which is only used for the news list/card view now — the detail
  // page itself no longer shows a large hero image).
  const additionalPhotos = (news.gallery || []).filter((g) => g !== news.thumbnail);

  return (
    <div className="container page-content">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &nbsp;›&nbsp;
        <Link to="/current-news">Current News</Link> &nbsp;›&nbsp; News Details
      </div>

      <h1 className="detail-title">{news.title}</h1>
      <div className="detail-meta">
        <span>📅 {formatDate(news.date)}</span>
        <span>📍 {news.centre}</span>
        <span>🏷 {news.category}</span>
      </div>

      <div className="detail-body">
        {news.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="detail-keywords">
        <h4>Keywords / Tags</h4>
        {news.keywords.map((k) => (
          <Link
            className="keyword-chip"
            to={`/current-news?tag=${encodeURIComponent(k)}`}
            key={k}
          >
            #{k.replace(/\s+/g, "")}
          </Link>
        ))}
      </div>

      {additionalPhotos.length > 0 && (
        <div className="detail-keywords" style={{ marginTop: 20 }}>
          <h4>Photo Gallery</h4>
          <PhotoCarousel images={additionalPhotos} title={news.title} />
        </div>
      )}

      <p style={{ marginTop: 30 }}>
        <Link to="/current-news">← Back to Current News</Link>
      </p>
    </div>
  );
}