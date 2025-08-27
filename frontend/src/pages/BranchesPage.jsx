import { useEffect, useRef, useState } from "react";
import "./BranchesPage.css";

export default function BranchesPage({
  onMenu = () => {},
  onCreate = () => {},
  onOpenRequests = () => {},
  requestCount = 3,
}) {
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);
  const btnRef = useRef(null);

  // ปิดป๊อปอัพเมื่อคลิกรอบนอกหรือกด Esc
  useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (
        popRef.current &&
        !popRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="page">
      {/* แถวหัวข้อ: เมนูซ้าย / ชื่อหน้า / สามจุดขวา */}
      <div className="pagebar">
        <button className="btn btn--soft" onClick={onMenu} aria-label="menu">
          {/* hamburger */}
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h1 className="page-title">จัดการสาขา</h1>

        <div className="kebab-wrap">
          <button
            ref={btnRef}
            className="btn btn--soft"
            aria-label="more"
            onClick={() => setOpen((v) => !v)}
          >
            {/* three dots */}
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="6.5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="17.5" cy="12" r="1.5" fill="currentColor" />
            </svg>

            {/* badge มุมขวาบนของปุ่ม */}
            {requestCount > 0 && <span className="badge">{requestCount}</span>}
          </button>

          {/* Popover menu */}
          {open && (
            <div className="menu-pop" ref={popRef} role="menu">
              <button
                className="menu-pop__item"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onCreate();
                }}
              >
                {/* icon: home/branch */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8z"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span>สร้างสาขา</span>
              </button>

              <button
                className="menu-pop__item"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onOpenRequests();
                }}
              >
                {/* icon: ticket */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 8h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V8z"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span>คำขอสร้าง</span>
                {requestCount > 0 && <span className="badge badge--inline">{requestCount}</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* แถวค้นหา */}
      <div className="search-pill" role="button" tabIndex={0} aria-label="ค้นหา">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="search-text">ค้นหา</span>
      </div>

      {/* เนื้อหาหลัก */}
      <div className="page-section">
        <h2 className="section-title">รายการสาขา:</h2>
        {/* TODO: วางตาราง/ลิสต์สาขาจริงตรงนี้ */}
      </div>
    </section>
  );
}
