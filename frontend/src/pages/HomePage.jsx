// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import TopBar from "../Topbar";
import MapView from "../components/MapView";
import "../App.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <TopBar
        onMenu={() => console.log("Open drawer menu")}
        onSearch={() => console.log("Open search")}
        onFilter={() => console.log("Open filter options")}
      />

      <div className="map-wrapper" style={{ position: "relative" }}>
        <MapView center={[100.923, 13.285]} zoom={14} />

        <button
          onClick={() => navigate("/analyze")}
          style={{
            position: "absolute",
            left: "50%",
            bottom: "24px",
            transform: "translateX(-50%)",
            padding: "14px 28px",
            borderRadius: "28px",
            border: "none",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            background: "#3F51B5",
            boxShadow: "0 8px 20px rgba(63,81,181,.35)",
            cursor: "pointer",
          }}
        >
          วิเคราะห์
        </button>
      </div>
    </div>
  );
}
