import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please sign in to access this feature.");
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 px-6 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-3xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-blue-400">
          Empowering Communities with <br />
          <span className="text-white">CivicConnect</span>
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Report civic issues, track their progress, and collaborate with local authorities — all in one simple platform.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleProtectedNavigation("/report")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition transform hover:-translate-y-1"
          >
            📍 Report an Issue
          </button>

          <button
            onClick={() => handleProtectedNavigation("/my-issues")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition transform hover:-translate-y-1"
          >
            🗂️ View My Issues
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
