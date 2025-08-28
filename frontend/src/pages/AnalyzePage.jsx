// src/pages/AnalyzePage.jsx
import { Link } from "react-router-dom";
import TopBar from "../Topbar";
import "../App.css";

export default function AnalyzePage() {
  return (
    <div className="app-root">
      <TopBar
        filterCount={0}
        onMenu={() => console.log("Open drawer menu")}
        onSearch={() => console.log("Search on analyze")}
        onFilter={() => console.log("Filter on analyze")}
      />

      <div style={{ padding: 24 }}>
        <h1 style={{ marginBottom: 12 }}>หน้าวิเคราะห์</h1>
        <p>ไม่อยากทำงาน</p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "10px 18px",
            borderRadius: 10,
            background: "#111827",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← กลับหน้าแผนที่
        </Link>
      </div>
    </div>
  );
}
