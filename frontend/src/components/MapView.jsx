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
      //add map source form location api endpoint
      map.addSource("locations", {
        type: "geojson",
        data: "http://localhost:3001/locations",
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50,
      });
      map.addLayer({
        id: "locations-layer",
        type: "circle",
        source: "locations",
        paint: {
          "circle-radius": 6,
          "circle-color": "#4d55a0",
        },
      });
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "locations",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#51bbd6",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      // Add a layer for the cluster count numbers
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "locations",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
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
