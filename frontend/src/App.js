// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import TagsPage from "./pages/TagsPage";
import BranchesPage from "./pages/BranchesPage";
import Header from "./Header";
import BranchCreatePage from "./pages/BranchCreatePage";
import BranchEditPage from "./pages/BranchEditPage";

/* ----- เพจชั่วคราวกันลิงก์พัง (ลบเมื่อมีเพจจริง) ----- */
function BookmarksPage() { return <div style={{ padding: 16 }}>หน้ารายการบุ๊กมาร์ก (ตัวอย่าง)</div>; }
function SettingsPage()  { return <div style={{ padding: 16 }}>หน้าตั้งค่าระบบ (ตัวอย่าง)</div>; }
function BranchRequestsPage() { return <div style={{ padding: 16 }}>คำขอสร้างสาขา (ตัวอย่าง)</div>; }
/* ------------------------------------------------------ */

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(2);

  const menuItems = [
    { to: "/", label: "แผนที่" },
    { to: "/branches", label: "จัดการสาขา" },
    { to: "/settings/tags", label: "จัดการสถานที่" },
    { to: "/settings", label: "ตั้งค่าระบบ" },
  ];

  // ซ่อน Header ใหญ่บนทุกเส้นทางที่ขึ้นต้นด้วย /branches
  const hideGlobalHeader = location.pathname.startsWith("/branches");

  return (
    <>
      {!hideGlobalHeader && (
        <Header
          filterCount={filterCount}
          onMenu={() => setOpen(true)}
          onFilter={() => navigate("/settings/tags")}
          onBookmark={() => navigate("/bookmarks")}
        />
      )}

      <Sidebar open={open} onClose={() => setOpen(false)} items={menuItems} />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<HomePage onFilterCountChange={setFilterCount} />}
          />

          {/* จัดการสาขา (มี header ภายในหน้าเอง) */}
          <Route
            path="/branches"
            element={
              <BranchesPage
                onMenu={() => setOpen(true)}
                onCreate={() => navigate("/branches/new")}
                onOpenRequests={() => navigate("/branches/requests")}
                requestCount={3}
              />
            }
          />
          <Route path="/branches/new" element={<BranchCreatePage />} />
          <Route path="/branches/requests" element={<BranchRequestsPage />} />
          <Route path="/branches/edit" element={<BranchEditPage />} />

          {/* การตั้งค่า/แท็ก */}
          <Route path="/settings/tags" element={<TagsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* อื่น ๆ */}
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<div style={{ padding: 16 }}>ไม่พบหน้า</div>} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
