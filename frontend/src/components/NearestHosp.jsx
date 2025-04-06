import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const ORS_API_KEY = import.meta.env.VITE_ORS_KEY;

const NearestHosp = () => {
    const [userCoords, setUserCoords] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = [pos.coords.latitude, pos.coords.longitude];
            setUserCoords(coords);
        });
    }, []);

    useEffect(() => {
        if (userCoords) {
            fetchHospitalsNearby(userCoords);
        }
    }, [userCoords]);

    const getETAFromORS = async (source, destination) => {
        try {
            const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
                method: 'POST',
                headers: {
                    'Authorization': ORS_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    coordinates: [
                        [source[1], source[0]],
                        [destination[1], destination[0]],
                    ],
                }),
            });
            const data = await res.json();
            const seconds = data.routes?.[0]?.summary?.duration || 0;
            return Math.ceil(seconds / 60);
        } catch (err) {
            console.error('ETA fetch error:', err);
            return null;
        }
    };

    const fetchHospitalsNearby = async ([lat, lon]) => {
        const radius = 1500;
        const query = `
        [out:json];
        (
            node["amenity"="hospital"](around:${radius},${lat},${lon});
            way["amenity"="hospital"](around:${radius},${lat},${lon});
            relation["amenity"="hospital"](around:${radius},${lat},${lon});
        );
        out center;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
        });

        const data = await response.json();

        const hospitalsRaw = data.elements
            .map((el) => {
                const hospLat = el.lat || el.center?.lat;
                const hospLon = el.lon || el.center?.lon;
                return {
                    name: el.tags.name || 'Unnamed Hospital',
                    lat: hospLat,
                    lon: hospLon,
                };
            })
            .filter((h) => h.lat && h.lon)
            .slice(0, 20);

        const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
            const toRad = (deg) => deg * (Math.PI / 180);
            const R = 6371e3;
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) *
                Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const enriched = await Promise.all(
            hospitalsRaw.map(async (hospital) => {
                const eta = await getETAFromORS([lat, lon], [hospital.lat, hospital.lon]);
                const distance = haversineDistance([lat, lon], [hospital.lat, hospital.lon]);
                return { ...hospital, eta, distance };
            })
        );

        const adjustedHospitals = enriched.map(hospital => ({
            ...hospital,
            eta: hospital.eta ? hospital.eta + 5 : null,
        }));

        const totalEta = adjustedHospitals.reduce((acc, hospital) => acc + (hospital.eta || 0), 0);
        const avgEta = totalEta / adjustedHospitals.length;

        const sorted = adjustedHospitals
            .sort((a, b) => {
                if (a.eta && b.eta) return a.eta - b.eta;
                if (a.eta && !b.eta) return -1;
                if (!a.eta && b.eta) return 1;
                return a.distance - b.distance;
            })
            .slice(0, 3);

        setHospitals(sorted);
        console.log('Average ETA (with +5 minutes):', avgEta + 5);
    };

    return (
        <div className="text-center pb-10">
            <h1 className="text-green-600 text-3xl font-bold mt-6">You're Safe Now</h1>
            <p className="text-gray-700 mt-2 mb-4">
                Help is on the way. We're connecting you to nearby hospitals.
            </p>

            {userCoords ? (
                <MapContainer
                    center={userCoords}
                    zoom={14}
                    style={{
                        height: '400px',
                        width: '90%',
                        margin: '0 auto',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={userCoords}>
                        <Popup>You are here</Popup>
                    </Marker>

                    {hospitals.map((hospital, idx) => (
                        <Marker
                            key={idx}
                            position={[hospital.lat, hospital.lon]}
                            icon={L.icon({
                                iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
                                iconSize: [35, 35],
                            })}
                        >
                            <Popup>
                                <strong>{hospital.name}</strong>
                                <p>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&origin=${userCoords[0]},${userCoords[1]}&destination=${hospital.lat},${hospital.lon}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        Get Directions
                                    </a>
                                </p>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            ) : (
                <p className="text-gray-500 mt-6">📍 Detecting your location...</p>
            )}

            <div className="mt-10 px-6 md:px-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧾 Nearest Hospitals</h2>
                <div className="grid gap-5">
                    {hospitals.map((hospital, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl p-5 shadow-md border transition duration-200 ${
                                idx === 0 ? 'bg-green-100 border-green-400' : 'bg-white'
                            }`}
                        >
                            <p className="text-xl font-semibold text-gray-800 mb-2">
                                🏥 {hospital.name}
                            </p>
                            <p className="text-gray-600">
                                ETA: <span className="font-medium">{hospital.eta} min</span>
                            </p>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&origin=${userCoords?.[0]},${userCoords?.[1]}&destination=${hospital.lat},${hospital.lon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Get Directions
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 px-6 md:px-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    📞 Emergency Contacts
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[{
                        label: 'Ambulance', number: '102', icon: '🚑'
                    }, {
                        label: 'Police', number: '100', icon: '🚓'
                    }, {
                        label: 'Disaster Helpline', number: '108', icon: '📟'
                    }, {
                        label: 'Women Helpline', number: '1091', icon: '🧕'
                    }].map(({ label, number, icon }) => (
                        <a
                            key={label}
                            href={`tel:${number}`}
                            className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 border hover:shadow-lg transition cursor-pointer hover:bg-gray-50"
                        >
                            <div className="text-3xl">{icon}</div>
                            <div>
                                <p className="text-gray-700 font-medium">{label}</p>
                                <p className="text-lg font-bold text-red-600">{number}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NearestHosp;
