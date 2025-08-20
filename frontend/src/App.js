// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";  // ตัวใหม่ที่เพิ่งทำ
import HomePage from "./pages/HomePage";
import TagsPage from "./pages/TagsPage";
import Header from "./Header";
export default function App() {
  const [open, setOpen] = useState(false);

  // (ไม่บังคับ) กำหนดเมนูที่จะไปลิงก์หน้าอื่น
  const menuItems = [
    { to: "/", label: "แผนที่" },
    { to: "/branches", label: "จัดการสาขา" },
    { to: "/settings/tags", label: "จัดการสถานที่" },
    { to: "/settings", label: "ตั้งค่าระบบ" },
  ];

  return (
    <Router>
      {/* เมนูเต็มจอ */}
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}    // กด X/พื้นหลัง -> ปิดเมนู
        items={menuItems}                 // ส่งหรือไม่ส่งก็ได้ (มี default)
      />

      {/* เนื้อหาแต่ละหน้า */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings/tags" element={<TagsPage />} />
        {/* ใส่เส้นทางอื่น ๆ เพิ่มได้ */}
      </Routes>
    </Router>
  );
}
