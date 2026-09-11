import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { newsList, centres, formatDate } from "../data/newsData";

const PAGE_SIZE = 5;

// Build the list of years present in the data, newest first.
const YEARS = ["All Years", ...Array.from(
  new Set(newsList.map((n) => new Date(n.date).getFullYear()))
).sort((a, b) => b - a)];

// Places dropdown reuses the same "centres" list already defined in
// newsData.js (Madurai, Salem, Aurolab, LAICO, Visitors, etc.)
const PLACES = centres; // first entry is already "All Locations"

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  let start = Math.max(1, Math.min(current, total - 4));
  let end = Math.min(total - 1, start + 4);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function CurrentNews() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [placeFilter, setPlaceFilter] = useState(PLACES[0]); // "All Locations"
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || null);

  const filtered = useMemo(() => {
    let list = newsList.filter((n) => {
      const matchesQuery =
        query.trim() === "" ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()));
      // A tag click can match the centre (#Madurai), the category
      // (#CME, #Events...) or any keyword — whichever the user tapped.
      const matchesTag =
        !activeTag ||
        n.centre.toLowerCase() === activeTag.toLowerCase() ||
        n.category.toLowerCase() === activeTag.toLowerCase() ||
        n.keywords.some((k) => k.toLowerCase() === activeTag.toLowerCase());
      const matchesYear =
        yearFilter === "All Years" || new Date(n.date).getFullYear() === yearFilter;
      const matchesPlace =
        placeFilter === "All Locations" ||
        n.centre.toLowerCase() === placeFilter.toLowerCase();
      return matchesQuery && matchesTag && matchesYear && matchesPlace;
    });
    list = [...list].sort((a, b) =>
      sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [query, sortOrder, activeTag, yearFilter, placeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageNumbers = getPageNumbers(page, totalPages);

  function handleTagClick(tag) {
    setActiveTag((prev) => (prev && prev.toLowerCase() === tag.toLowerCase() ? null : tag));
    setPage(1);
  }

  function handleYearChange(e) {
    const val = e.target.value;
    setYearFilter(val === "All Years" ? "All Years" : Number(val));
    setPage(1);
  }

  function handlePlaceChange(e) {
    setPlaceFilter(e.target.value);
    setPage(1);
  }

  return (
    <div className="container page-content">
      <h1 className="section-title">Current News</h1>

      <div className="news-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="sort-box">
          <span className="sort-label">Sort By :</span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="sort-box">
          <span className="sort-label">Year :</span>
          <select value={yearFilter} onChange={handleYearChange}>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-box">
          <span className="sort-label">Place :</span>
          <select value={placeFilter} onChange={handlePlaceChange}>
            {PLACES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* "All" -> "Current News" (this page, always highlighted since we're on it)
          "This Week" -> "Archives" (navigates to the Archives page).
          The other category buttons (CME, Events, Workshop...) now live as
          keyword tags under each news item below instead of here. */}
      <div className="filter-tabs">
        <Link
          to="/current-news"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "20px",
            marginRight: "10px",
            backgroundColor: "#152642",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Current News
        </Link>
        <Link
          to="/archives"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: "#dce6f4",
            color: "#152642",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Archives
        </Link>
      </div>

      {activeTag && (
        <div className="keyword-filter-status">
          Showing news tagged <strong>#{activeTag.replace(/\s+/g, "")}</strong>
          <button className="clear-keyword" onClick={() => handleTagClick(activeTag)}>
            ✕ Clear
          </button>
        </div>
      )}

      <div className="news-list">
        {pageItems.length === 0 && (
          <p style={{ color: "var(--ink-soft)" }}>No news found for this filter.</p>
        )}
        {pageItems.map((n) => (
          <article className="news-row" key={n.id}>
            <img src={n.thumbnail} alt={n.title} />
            <div className="news-row-body">
              <div className="news-row-heading">
                <h3>
                  <Link to={`/current-news/${n.id}`}>{n.title}</Link>
                </h3>
                <span className="news-row-date">{formatDate(n.date)}</span>
              </div>
              <p>{n.shortDescription}</p>
              <div className="news-hashtags">
                <button
                  type="button"
                  className={
                    "hashtag" +
                    (activeTag && activeTag.toLowerCase() === n.centre.toLowerCase()
                      ? " active"
                      : "")
                  }
                  onClick={() => handleTagClick(n.centre)}
                >
                  #{n.centre.replace(/\s+/g, "")}
                </button>
                <button
                  type="button"
                  className={
                    "hashtag" +
                    (activeTag && activeTag.toLowerCase() === n.category.toLowerCase()
                      ? " active"
                      : "")
                  }
                  onClick={() => handleTagClick(n.category)}
                >
                  #{n.category.replace(/\s+/g, "")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>«</button>
          )}
          {pageNumbers.map((p, i) =>
            p === "…" ? (
              <span className="pagination-ellipsis" key={`e-${i}`}>…</span>
            ) : (
              <button
                key={p}
                className={p === page ? "active" : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            )
          )}
          {page < totalPages && (
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>»</button>
          )}
        </div>
      )}
    </div>
  );
}