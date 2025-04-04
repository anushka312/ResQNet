import React from "react";

const emergencyNumbers = [
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "Fire Brigade", number: "101" },
  { name: "Disaster Management", number: "108" },
  { name: "Women Helpline", number: "1091" },
];

const safetyTips = [
  "Stay calm and avoid panic.",
  "Move to a safe location away from danger.",
  "Call emergency services immediately.",
  "Help others only if it's safe to do so.",
  "Keep a small emergency kit handy.",
];

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">🚨 Emergency Services</h1>

      {/* Emergency Numbers */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">📞 Emergency Contact Numbers</h2>
        <ul className="space-y-3">
          {emergencyNumbers.map((service) => (
            <li
              key={service.name}
              className="flex justify-between items-center bg-red-50 p-4 rounded-md shadow-sm"
            >
              <span className="font-medium">{service.name}</span>
              <span className="text-lg font-semibold text-red-600">{service.number}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Safety Tips */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">🛡️ General Safety Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          {safetyTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
