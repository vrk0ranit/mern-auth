import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationArrow, FaImage, FaSpinner } from "react-icons/fa";

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    latitude: "",
    longitude: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // 🧭 Get location manually when user clicks button
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => alert("⚠️ Location access denied or unavailable")
      );
    } else {
      alert("❌ Geolocation not supported in this browser");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      alert("Please provide your location before submitting.");
      return;
    }

    setLoading(true);

    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    if (image) body.append("image", image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ Issue reported successfully!");
        navigate("/my-issues");
      } else {
        alert("❌ " + (data.message || "Failed to report issue"));
      }
    } catch (err) {
      console.error("Error submitting issue:", err);
      alert("❌ Error submitting issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-16"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1e293b]/70 backdrop-blur-lg shadow-2xl border border-gray-700 rounded-2xl w-full max-w-lg p-8 text-gray-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Report a Community Issue 🏙️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Issue Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              placeholder="Describe the issue clearly..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Road">🚧 Road</option>
              <option value="Lighting">💡 Lighting</option>
              <option value="Garbage">🗑️ Garbage</option>
              <option value="Water">💧 Water</option>
              <option value="Other">🔹 Other</option>
            </select>
          </div>

          {/* Coordinates + Get Location */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-300">Latitude</label>
              <input
                type="number"
                name="latitude"
                step="any"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-300">Longitude</label>
              <input
                type="number"
                name="longitude"
                step="any"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGetLocation}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            <FaLocationArrow /> Get My Location
          </button>

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
              <FaImage className="text-blue-400" /> Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
            {preview && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={preview}
                alt="Preview"
                className="mt-3 rounded-lg max-h-48 w-full object-cover border border-gray-700 hover:scale-[1.02] transition-transform"
              />
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold shadow-md shadow-blue-700/30 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Issue"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReportIssue;
