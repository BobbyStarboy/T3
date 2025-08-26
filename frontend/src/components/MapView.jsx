// src/components/MapView.jsx
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function MapView({ center = [100.923, 13.285], zoom = 14 }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ❌ อย่าเช็ค if (mapRef.current) return; เพราะ StrictMode จะ cleanup แล้ว init ใหม่
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
      attributionControl: true,
    });
    mapRef.current = map;

    map.on("load", () => {
      console.log("✅ map loaded");
      map.resize();
    });

    map.on("error", (e) => {
      console.error("🛑 map error:", e?.error || e);
    });

    map.addControl(new mapboxgl.NavigationControl(), "right");

    // cleanup จะวิ่งครั้งที่ 1 (จาก StrictMode) และครั้งสุดท้ายตอน unmount จริง
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom]);

  return (
    <div
      ref={containerRef}
      className="map-container"
      style={{ width: "100%", height: "calc(100vh - 80px)" }}
    />
  );
}
