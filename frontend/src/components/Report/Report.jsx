import { useState } from "react";
import LocationPicker from "../LocationPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCrisis } from "../../CrisisContext.jsx";
import { useNavigate } from "react-router-dom";

// ✅ NEW import to get user ID (logged in or anon)
import { getUserId } from "../../utils/anonId";

const Report = () => {
  const { addCrisisLocation } = useCrisis();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    crisisType: "",
    location: null,
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = getUserId(); // ✅ get auth or anon ID
      const { lat, lng } = formData.location || {};

      if (!lat || !lng) {
        toast.error("❌ Location not selected.");
        return;
      }

      // Step 1: Verify with ML
      const verifyRes = await fetch("https://crisis-api.onrender.com/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formData.description,
          user_id: userId, // ✅ send user_id
          lat,
          lng,
          location: "Submitted via app", // optional field
        }),
      });

      const result = await verifyRes.json();

      if (result.verified) {
        toast.success("✅ Crisis report submitted!");
        setTimeout(() => navigate("/help"), 3000);
      } else {
        toast.warn("❌ Couldn't verify your report!");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("❌ Something went wrong. Try again.");
    }

    // Reset form
    setFormData({
      crisisType: "",
      location: null,
      description: "",
      image: null,
    });
  };

  return (
    <div className="flex h-screen w-auto bg-[url('/src/assets/bg2.jpeg')] bg-cover bg-center bg-fixed m-0 p-0 items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-[400px] min-h-[100px] min-w-[100px]">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Report a Crisis</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Crisis Type Dropdown */}
            <label className="block">
              <span className="text-gray-700">Crisis Type</span>
              <select
                name="crisisType"
                className="mt-1 block w-full p-2 border rounded-md"
                value={formData.crisisType}
                onChange={handleChange}
                required
              >
                <option value="">Select Crisis Type</option>
                <option value="fire">🔥 Fire</option>
                <option value="earthquake">🌍 Earthquake</option>
                <option value="flood">🌊 Flood</option>
                <option value="accident">🚗 Accident</option>
                <option value="other">⚠️ Other</option>
              </select>
            </label>

            {/* Location Input */}
            <label className="block">
              <span className="text-gray-700">Select Location on Map</span>
              <LocationPicker
                onLocationSelect={(coords) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { lat: coords.lat, lng: coords.lng },
                  }))
                }
              />
              <p className="text-sm text-gray-500 mt-2">
                Selected:{" "}
                {formData.location
                  ? `Lat: ${formData.location.lat}, Lng: ${formData.location.lng}`
                  : "No location selected yet"}
              </p>
            </label>

            {/* Description */}
            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                name="description"
                className="mt-1 block w-full p-2 border rounded-md"
                rows="3"
                placeholder="Describe the crisis"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            {/* Image Upload (optional) */}
            <label className="block">
              <span className="text-gray-700">Upload Image (Optional)</span>
              <input
                type="file"
                name="image"
                className="mt-1 block w-full"
                onChange={handleImageUpload}
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#000000] text-white py-2 rounded-lg hover:bg-[#0c1526] transition"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
