import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center text-center p-6 text-lg">
      {/* Hero Section */}
      <h1 className="text-3xl font-semibold text-gray-800">About Us</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">

        <p className="text-gray-600 mt-4">
          The <span className="font-semibold">ResQNet</span> is a
          real-time emergency response platform that connects people in distress
          with immediate assistance using AI-powered automation.
        </p>
      </div>

      {/* Mission Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mt-4">
          Our mission is to reduce emergency response times and provide immediate
          assistance during crises such as natural disasters, accidents, and other
          critical incidents.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-6">
        {/* Why CrisisHub Works */}
        <div className="max-w-5xl text-center mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-black">Why Choose ResQNet?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-black">
            <div className="bg-gray-200 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Fast & Automated</h3>
              <p>AI-powered detection and instant help — no waiting.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Location-Aware</h3>
              <p>Get connected to the nearest help centers based on your GPS.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Live Crisis Map</h3>
              <p>Crisis appears on the real-time map.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;
