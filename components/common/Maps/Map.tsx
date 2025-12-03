"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import UserLocation from "./UserLocation";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LocationMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Location error:", err);
          alert("Unable to retrieve your location. Using default location.");
          setPosition([-1.286389, 36.817223]);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Using default location.");
      setPosition([-1.286389, 36.817223]);
    }
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    });

    if (!position) return null;

    return (
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          <strong>Selected Location</strong> <br />
          Lat: {position[0].toFixed(6)} <br />
          Lng: {position[1].toFixed(6)}
        </Popup>
      </Marker>
    );
  }

  if (!position) return <p>Loading map…</p>;

  return (
    <div className="rounded-2xl z-0 overflow-hidden" style={{ height: "700px" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Circle
          center={position}
          radius={100}
          pathOptions={{ color: "green", fillOpacity: 0.15 }}
        />

        <UserLocation />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
