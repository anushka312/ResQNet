import { useState } from "react";
import LocationPicker from "../LocationPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCrisis } from "../../CrisisContext.jsx";

const Report = () => {
  const { addCrisisLocation } = useCrisis();

  const [formData, setFormData] = useState({
    crisisType: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("https://crisis-api.onrender.com/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: formData.description }),
      });

      const result = await response.json();

      if (result.verified) {
        addCrisisLocation(formData.location, formData.crisisType);
        toast.success("✅ Crisis report submitted!");
      }else{
        toast.warn("❌ Couldn't Submit your report!");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("❌ Error submitting report. Please try again.");
    }

    setFormData({ crisisType: "", location: "", description: "", image: null });
  };


  return (
    <div className="flex h-screen w-auto bg-[url('/src/assets/bg2.jpeg')] bg-cover bg-center bg-fixed m-0 p-0 items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-[400px] items-center justify-center min-h-[100px] min-w-[100px] overflow-hidden">
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
                  setFormData({ ...formData, location: `${coords.lat}, ${coords.lng}` })
                }
              />
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.location || "No location selected yet"}
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

            {/* Image Upload */}
            <label className="block">
              <span className="text-gray-700">Upload Image (Optional)</span>
              <input type="file" name="image" className="mt-1 block w-full" onChange={handleImageUpload} />
            </label>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#000000] text-white py-2 rounded-lg hover:bg-[#0c1526] transition">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
