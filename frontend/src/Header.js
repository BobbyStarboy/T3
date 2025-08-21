// src/Header.js
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
          <div className="brand-sub">MY ORDER</div>

          <div className="brand-row" aria-label="Orbit IQ">
            {/* คำว่า Orbit โดยให้ "ดาว" เป็นจุดบนตัว i */}
            <span className="brand-orbit">
              Orb
              <span
                className="i-star"
                aria-hidden="true"
                style={{ position: "relative", display: "inline-block", letterSpacing: 0 }}
              >
                {/* dotless i (ไม่มีจุด) */}
                {"\u0131"}
                {/* ดาวทำหน้าที่เป็นจุด */}
                <svg
                  viewBox="0 0 24 24"
                  role="presentation"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "-0.33em",
                    width: "0.36em",
                    height: "0.36em",
                    filter: "drop-shadow(0 2px 4px rgba(79,70,229,.25))",
                    pointerEvents: "none",
                  }}
                >
                  <defs>
                    <linearGradient id="sparkle-g-header" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="60%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="12,2 14.6,9.4 22,12 14.6,14.6 12,22 9.4,14.6 2,12 9.4,9.4"
                    fill="url(#sparkle-g-header)"
                  />
                </svg>
              </span>
              t
            </span>

            <span className="brand-iq">IQ</span>
          </div>
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
