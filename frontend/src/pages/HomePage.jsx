// pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import "../App.css";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="map-wrapper" style={{ position: "relative" }}>
      <MapView center={[100.923, 13.285]} zoom={14} />
    </div>
  );
}
