import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCrisis } from "../CrisisContext"; 


const redMarker = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView({ crisisLocations = [] }) {
  const { removeCrisisLocation } = useCrisis();
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); // India default


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      () => console.warn("Could not fetch location, using default.")
    );
  }, []);

  
  useEffect(() => {
    const container = document.getElementById("map");
    if (!mapRef.current && container) {
      const map = L.map(container).setView(userLocation, 6);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    } else if (mapRef.current) {
      mapRef.current.setView(userLocation, 15);
    }
  }, [userLocation]);

 
  useEffect(() => {
    if (!mapRef.current) return;

  
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

   
    crisisLocations.forEach(({ lat, lng, type }, index) => {
      const marker = L.marker([lat, lng], { icon: redMarker })
        .addTo(mapRef.current)
        .bindPopup(`<strong>${type}</strong>`);
      markersRef.current.push(marker);
    });
  }, [crisisLocations]);

  return (
    <div className="flex items-center justify-center">
      <div id="map" className="w-11/12 h-[80vh] rounded-lg shadow-md" />
    </div>
  );
}
