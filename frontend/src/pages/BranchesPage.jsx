import { useEffect, useMemo, useRef, useState } from "react";
import "./BranchesPage.css";

// ✅ การ์ดแสดงข้อมูลสาขา
function BranchCard({ branch }) {
  const {
    id,
    code,                // เช่น MXP-001
    name,                // ชื่อสาขา
    address,             // ที่อยู่
    zipCode,             // รหัสไปรษณีย์
    parcelCount = 0,     // ยอดพัสดุ
    ownerName = "เจ้าของไม่ระบุ",
    createdAt,           // วันที่สร้าง
    updatedAt,           // อัพเดตล่าสุด
    color = "purple",    // สี badge ยอดพัสดุ: purple|blue|pink|orange
  } = branch || {};

  const fmt = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return `${dt.toLocaleDateString()} @ ${dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <article className="branch-card" role="listitem" aria-label={name}>
      {/* กลุ่มป้ายด้านบน */}
      <div className="branch-card__badges" role="group" aria-label="ตัวบ่งชี้สาขา">
        <span className="badge badge--chip">{code ?? "-"}</span>

        <span className={`chip chip--parcel chip--${color ?? "purple"}`}>
          <span className="chip__dot" aria-hidden="true" />
          <span className="chip__text">
            ยอดพัสดุ: {parcelCount?.toLocaleString?.() ?? 0}
          </span>
        </span>

        <span className="badge badge--soft">รหัสไปรษณีย์: {zipCode ?? "-"}</span>
      </div>

      <h3 className="branch-card__title">{name}</h3>
      <p className="branch-card__address">{address}</p>

      <div className="branch-card__meta">
        <div className="branch-card__owner">
          <img className="avatar" src="https://i.pravatar.cc/40?img=15" alt="" />
          <span>{ownerName}</span>
        </div>
        <div className="branch-card__dates">
          <span>สร้างเมื่อ: {fmt(createdAt)}</span>
          <span>อัพเดตล่าสุด: {fmt(updatedAt)}</span>
        </div>
      </div>
    </article>
  );
}

export default function BranchesPage({
  onMenu = () => {},
  onCreate = () => {},
  onOpenRequests = () => {},
  requestCount = 3,
}) {
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);
  const btnRef = useRef(null);

  // ---------- state สำหรับข้อมูล/ค้นหา/กรอง/เรียง ----------
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("code");   // code | name | parcel | created | updated
  const [sortDir, setSortDir] = useState("asc");  // asc | desc
  const [filterOpen, setFilterOpen] = useState(false);

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

  // ---------- ดึงข้อมูลจาก backend พร้อม fallback ----------
  useEffect(() => {
    let alive = true;
    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/branches");
        const data = await res.json();
        if (!alive) return;
        const list = Array.isArray(data) ? data : data ? [data] : [];
        setBranches(list);
      } catch {
        if (!alive) return;
        setBranches([
          {
            id: 1,
            code: "MXP-001",
            name: "My Express 1",
            address: "169 ถนนลงหาดบางแสน, เมืองชลบุรี, จังหวัดชลบุรี",
            zipCode: "20130",
            parcelCount: 783,
            createdAt: "2024-08-03T15:20:00+07:00",
            updatedAt: "2024-08-04T15:26:00+07:00",
            color: "purple",
          },
          {
            id: 2,
            code: "MXP-002",
            name: "My Express 2",
            address: "115 ถนนลงหาดบางแสน, เมืองชลบุรี, จังหวัดชลบุรี",
            zipCode: "20130",
            parcelCount: 432,
            createdAt: "2024-08-03T15:20:00+07:00",
            updatedAt: "2024-08-04T15:26:00+07:00",
            color: "orange",
          },
          {
            id: 3,
            code: "MXP-003",
            name: "My Express 3",
            address: "119 ถนนลงหาดบางแสน, เมืองชลบุรี, จังหวัดชลบุรี",
            zipCode: "20130",
            parcelCount: 149,
            createdAt: "2024-08-03T15:20:00+07:00",
            updatedAt: "2024-08-04T15:26:00+07:00",
            color: "blue",
          },
          {
            id: 4,
            code: "MXP-004",
            name: "My Express 4",
            address: "129 ถนนลงหาดบางแสน, เมืองชลบุรี, จังหวัดชลบุรี",
            zipCode: "20130",
            parcelCount: 82,
            createdAt: "2024-08-03T15:20:00+07:00",
            updatedAt: "2024-08-04T15:26:00+07:00",
            color: "pink",
          },
        ]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  // ---------- ค้นหา/กรอง/เรียง ----------
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = branches.filter((b) => {
      if (!needle) return true;
      return (
        (b.name ?? "").toLowerCase().includes(needle) ||
        (b.code ?? "").toLowerCase().includes(needle) ||
        (b.address ?? "").toLowerCase().includes(needle) ||
        (b.zipCode ?? "").toString().includes(needle)
      );
    });

    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortBy) {
        case "name":
          return (a.name ?? "").localeCompare(b.name ?? "") * dir;
        case "parcel":
          return ((a.parcelCount ?? 0) - (b.parcelCount ?? 0)) * dir;
        case "created":
          return (
            (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
          );
        case "updated":
          return (
            (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir
          );
        case "code":
        default:
          return (a.code ?? "").localeCompare(b.code ?? "") * dir;
      }
    });

    return list;
  }, [branches, q, sortBy, sortDir]);

  return (
    <section className="page">
      {/* แถวหัวข้อ */}
      <div className="pagebar">
        <button className="btn btn--soft" onClick={onMenu} aria-label="menu">
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
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="6.5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="17.5" cy="12" r="1.5" fill="currentColor" />
            </svg>
            {requestCount > 0 && <span className="badge">{requestCount}</span>}
          </button>

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
      <div className="search-row">
        <div className="search-input">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหา"
            aria-label="ค้นหาสาขา"
          />
        </div>

        {/* ปุ่มกรอง */}
        <button
          className="btn btn--soft btn--icon"
          aria-label="ตัวกรอง"
          onClick={() => setFilterOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* แถวหัวข้อรายการ + เลือกเรียง */}
      <div className="section-head">
        <h2 className="section-title">รายการสาขา:</h2>

        <div className="sort-wrap">
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="เรียงตาม"
          >
            <option value="code">หมายเลขสาขา</option>
            <option value="name">ชื่อสาขา</option>
            <option value="parcel">ยอดพัสดุ</option>
            <option value="created">วันที่สร้าง</option>
            <option value="updated">อัพเดตล่าสุด</option>
          </select>

          <button
            className="btn btn--soft btn--icon"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            aria-label="สลับการเรียง"
            title={sortDir === "asc" ? "เรียงน้อย→มาก" : "เรียงมาก→น้อย"}
          >
            {sortDir === "asc" ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M7 17V7m0 0l-3 3m3-3l3 3M17 7v10m0 0l3-3m-3 3l-3-3"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M7 7v10m0 0l3-3m-3 3l-3-3M17 17V7m0 0l-3 3m3-3l3 3"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* รายการการ์ดสาขา */}
      <div className="page-section" role="list" aria-busy={loading}>
        {loading && <p className="muted">กำลังโหลดข้อมูล…</p>}
        {!loading && filtered.length === 0 && <p className="muted">ไม่พบสาขาตามเงื่อนไข</p>}
        {!loading && filtered.map((b) => <BranchCard key={b.id ?? b.code} branch={b} />)}
      </div>

      {/* Modal ฟิลเตอร์อย่างง่าย */}
      {filterOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="ตัวกรอง">
          <div className="modal__panel">
            <div className="modal__head">
              <h3>ตัวกรอง</h3>
              <button className="btn btn--soft btn--icon" onClick={() => setFilterOpen(false)} aria-label="ปิด">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="modal__body">
              <div className="form-row">
                <label>คำค้นหา</label>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ชื่อ/โค้ด/ที่อยู่/รหัสไปรษณีย์" />
              </div>
              <div className="form-row">
                <label>เรียงตาม</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="code">หมายเลขสาขา</option>
                  <option value="name">ชื่อสาขา</option>
                  <option value="parcel">ยอดพัสดุ</option>
                  <option value="created">วันที่สร้าง</option>
                  <option value="updated">อัพเดตล่าสุด</option>
                </select>
              </div>
              <div className="form-row">
                <label>ทิศทางการเรียง</label>
                <div className="btn-group">
                  <button className={`btn ${sortDir === "asc" ? "btn--primary" : "btn--soft"}`} onClick={() => setSortDir("asc")}>
                    น้อย → มาก
                  </button>
                  <button className={`btn ${sortDir === "desc" ? "btn--primary" : "btn--soft"}`} onClick={() => setSortDir("desc")}>
                    มาก → น้อย
                  </button>
                </div>
              </div>
            </div>

            <div className="modal__foot">
              <button className="btn btn--soft" onClick={() => setFilterOpen(false)}>ปิด</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
