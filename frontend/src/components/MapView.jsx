import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom yellow marker icon
const redMarker = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Optional: user location marker (blue)
const blueMarker = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [userLocation, setUserLocation] = useState(null); // null initially
  const [reports, setReports] = useState([]);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("📍 Your detected coordinates:", pos.coords);
        setUserLocation([latitude, longitude]);
      },
      () => {
        console.warn("Could not fetch location, using default.");
        setUserLocation([20.5937, 78.9629]); // Fallback to India
      },{
        enableHighAccuracy:true,
      }
    );
  }, []);

  // Initialize map AFTER userLocation is set
  useEffect(() => {
    if (!userLocation) return;

    const container = document.getElementById("map");

    if (!mapRef.current && container) {
      const map = L.map(container).setView(userLocation, 15); // zoom in
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Add a marker for user's location
      L.marker(userLocation, { icon: blueMarker })
        .addTo(map)
        .bindPopup("📍 You are here");
    } else if (mapRef.current) {
      mapRef.current.setView(userLocation, 15);
    }
  }, [userLocation]);

  // Fetch reports from backend
  useEffect(() => {
    fetch("https://crisis-api.onrender.com/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  // Render markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    reports.forEach(({ lat, lng, crisis_type, description }) => {
      if (!lat || !lng) return;

      const marker = L.marker([lat, lng], { icon: redMarker })
        .addTo(mapRef.current)
        .bindPopup(`<strong>${crisis_type}</strong><br/>${description}`);

      markersRef.current.push(marker);
    });
  }, [reports]);

  // Show loading screen until location is fetched
  if (!userLocation) {
    return (
      <div className="text-center text-gray-600 mt-10">
        📍 Fetching your location...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        id="map"
        className="w-11/12 h-[80vh] rounded-lg shadow-md border border-gray-300"
      />
    </div>
  );
}
