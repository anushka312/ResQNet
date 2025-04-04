import { useState } from "react";

const Report = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Crisis Report Submitted Successfully!");

    setFormData({
        crisisType: "",
        location: "",
        description: "",
        image: null,
      });
  };

  return (
    
    <div className="flex h-screen w-screen bg-[url('/src/assets/bg2.jpeg')] bg-cover bg-center bg-fixed m-0 p-0 items-center justify-center">
        <div className="w-[400px] items-center justify-center min-h-[100px] min-w-[100px] overflow-hidden">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center"> Report a Crisis</h2>
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
                <span className="text-gray-700">Location</span>
                <input
                    type="text"
                    name="location"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Enter location or use GPS"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
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
