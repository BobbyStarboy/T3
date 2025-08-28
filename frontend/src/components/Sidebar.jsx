import { useEffect } from "react";
import "./Sidebar.css";

/**
 * เมนูเต็มจอแบบ Overlay
 * - เปิด/ปิดด้วย prop open, onClose
 * - ปรับรายการได้ผ่าน props.items (optional)
 */
export default function Sidebar({
  open,
  onClose,
  items,
  notifyCount = 1,
  avatarUrl = "https://i.pravatar.cc/100"
}) {
  // รายการเมนูดีฟอลต์ตามภาพ
  const defaultItems = [
    { to: "/",            label: "แผนที่",          icon: MapIcon },
    { to: "/branches",    label: "จัดการสาขา",      icon: StoreIcon },
    { to: "/settings/tags", label: "จัดการสถานที่", icon: PinIcon },
    { to: "/settings",    label: "ตั้งค่าระบบ",      icon: CogIcon },
  ];
  const menu = items && items.length ? items : defaultItems;

  // ล็อก body เวลาเปิดเมนู
  useEffect(() => {
    document.body.classList.toggle("menu-lock", open);
    return () => document.body.classList.remove("menu-lock");
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="menu-backdrop" onClick={onClose} />

      <aside className="menu-sheet" role="dialog" aria-modal="true">
        {/* แถวบน */}
        <div className="menu-top">
          <button className="btn-square" onClick={onClose} aria-label="Close">
            <XIcon />
          </button>

          <div className="brand">
            <div className="brand-sub">MY ORDER</div>
            <div className="brand-row">
              <span className="brand-orbit">Orbit</span>
              <span className="brand-star">✦</span>
              <span className="brand-iq">IQ</span>
            </div>
          </div>

          <div className="top-right">
            <div className="btn-square bell">
              <BellIcon />
              {notifyCount > 0 && <span className="badge">{notifyCount}</span>}
            </div>
            <img className="avatar" src={avatarUrl} alt="profile" />
          </div>
        </div>

        {/* รายการเมนู */}
        <nav className="menu-list">
          {menu.map((m) => {
            const Icon = m.icon || DotIcon;
            return (
              <a key={m.to} href={m.to} className="menu-item" onClick={onClose}>
                <span className="mi-ico"><Icon /></span>
                <span className="mi-label">{m.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/* ---------------- Icons (SVG inline) ---------------- */
function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6L6 18"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M15 17H9m9-1V11a6 6 0 10-12 0v5l-2 2h16l-2-2Z"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"
        fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M4 10h16l-1-4H5l-1 4Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 10v8h12v-8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M12 21s7-6.1 7-11.2A7 7 0 105 9.8C5 14.9 12 21 12 21Z"
        fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M19.4 15a7.9 7.9 0 000-6l-2.2.5a6 6 0 00-1.5-1.5L16 5a8 8 0 00-8 0l.3 2.2a6 6 0 00-1.5 1.5L5 9a8 8 0 000 6l1.8-.3a6 6 0 001.5 1.5L8 19a8 8 0 008 0l-.3-1.8a6 6 0 001.5-1.5L19.4 15Z"
        fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function DotIcon() { return <svg width="8" height="8"><circle cx="4" cy="4" r="4" /></svg>; }
