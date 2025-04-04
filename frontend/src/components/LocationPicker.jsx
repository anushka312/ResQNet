import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Fix Leaflet's missing marker icons


const customMarker = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});



const LocationMarker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(coords);
      onSelect(coords);
    },
    locationfound(e) {
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(coords);
      onSelect(coords);
      map.setView([coords.lat, coords.lng], 15); // Zoom to user location
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position ? (
    <Marker
      position={position}
      icon={customMarker}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const coords = marker.getLatLng();
          onSelect({ lat: coords.lat, lng: coords.lng });
        },
      }}
    />
  ) : null;
};

const LocationPicker = ({ onLocationSelect }) => {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // fallback center
  const [zoomLevel, setZoomLevel] = useState(5); // default wide zoom

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setMapCenter([latitude, longitude]);
          setZoomLevel(15); // zoom in to user's area
        },
        (err) => {
          console.warn("Geolocation not allowed or failed:", err);
        }
      );
    }
  }, []);

  return (
    <div className="mt-2 rounded-md overflow-hidden border-2 border-gray-300">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker onSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
