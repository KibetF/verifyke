"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix webpack breaking Leaflet's default marker icon asset resolution
// by pointing directly at the CDN copies instead.
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface PropertyMapProps {
  lat: number;
  lng: number;
  label?: string;
  height?: string;
  zoom?: number;
}

export function PropertyMap({
  lat,
  lng,
  label,
  height = "280px",
  zoom = 15,
}: PropertyMapProps) {
  // Invalidate map size after mount to fix tiles not rendering in hidden containers
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden border border-slate-200">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
