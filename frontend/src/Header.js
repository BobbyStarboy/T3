// src/Header.js
import { Grid } from "lucide-react";
import "./Header.css";

export default function Header({
  filterCount = 2,
  onMenu = () => {},
  onFilter = () => {},
  onBookmark = () => {},
  onSearch = () => {},
}) {
  return (
    <header className="hdr">
      <div className="hdr-wrap">
        {/* โลโก้กลาง */}
        <div className="brand">
          <img src="/OrbitIQ.png" alt="logo" className="brand-logo" style={{ width: "136px", height: "auto", marginTop: "24px" }} />
        </div>

        {/* แถวปุ่ม + ค้นหา */}
        <div className="hdr-row">
          <button className="btn btn--menu" onClick={onMenu} aria-label="menu">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            className="search-pill"
            role="button"
            tabIndex={0}
            aria-label="ค้นหา"
            onClick={onSearch}
            onKeyDown={(e) => (e.key === "Enter" ? onSearch() : null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="search-text">ค้นหา</span>
          </div>

          <button className="btn btn--filter" onClick={onFilter} aria-label="filter">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M4 6h16l-6 7v4l-4 2v-6L4 6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {filterCount > 0 && <span className="badge">{filterCount}</span>}
          </button>

          <button className="btn" onClick={onBookmark} aria-label="bookmark">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M7 4h10v16l-5-3-5 3V4z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
