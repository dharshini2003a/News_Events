import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { newsList, categories, formatDate } from "../data/newsData";
import { featuredIds } from "../data/Featurednews";

const PAGE_SIZE = 5;
const QUICK_FILTERS = ["All", "This Week", ...categories.filter((c) => c !== "All")];

function isWithinLastWeek(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  return d >= weekAgo && d <= now;
}

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
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || null);

  const filtered = useMemo(() => {
    let list = newsList.filter((n) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "This Week" ? isWithinLastWeek(n.date) : n.category === filter);
      const matchesQuery =
        query.trim() === "" ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()));
      const matchesTag =
        !activeTag ||
        n.centre.toLowerCase() === activeTag.toLowerCase() ||
        n.keywords.some((k) => k.toLowerCase() === activeTag.toLowerCase());
      return matchesFilter && matchesQuery && matchesTag;
    });
    list = [...list].sort((a, b) =>
      sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );

    // Featured/pinned news always float to the top, in the order set in
    // featuredNews.js — everything else keeps the normal date sort below it.
    const featured = featuredIds
      .map((id) => list.find((n) => n.id === id))
      .filter(Boolean);
    const rest = list.filter((n) => !featuredIds.includes(n.id));
    return [...featured, ...rest];
  }, [query, filter, sortOrder, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageNumbers = getPageNumbers(page, totalPages);

  function handleFilter(f) {
    setFilter(f);
    setPage(1);
  }

  function handleTagClick(tag) {
    setActiveTag((prev) => (prev && prev.toLowerCase() === tag.toLowerCase() ? null : tag));
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
      </div>

      <div className="filter-tabs">
        {QUICK_FILTERS.map((c) => (
          <button
            key={c}
            className={filter === c ? "active" : ""}
            onClick={() => handleFilter(c)}
          >
            {c}
          </button>
        ))}
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