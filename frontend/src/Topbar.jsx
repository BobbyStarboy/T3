import React from "react";
import "./Topbar.css";

export default function TopBar({
  filterCount = 0,
  onMenu,
  onSearch,
  onFilter,
}) {
  return (
    <header className="topbar">
      {/* Left: Hamburger */}
      <button className="icon-btn" aria-label="Menu" onClick={onMenu}>
        {/* Hamburger SVG */}
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Center: Brand */}
      <div className="brand">
        <span className="brand-top">MY ORDER</span>
        <span className="brand-main">
          Orbit<i className="brand-dot">i</i>
          <span className="brand-q">Q</span>
        </span>
      </div>

      {/* Right: Action group (search + filter with badge) */}
      <div className="action-group">
        <button className="pill-btn" aria-label="Search" onClick={onSearch}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="pill-with-badge">
          <button className="pill-btn" aria-label="Filter" onClick={onFilter}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" fill="currentColor" />
            </svg>
          </button>
          {filterCount > 0 && <span className="badge">{filterCount}</span>}
        </div>
      </div>
    </header>
  );
}
