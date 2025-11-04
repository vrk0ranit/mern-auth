import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const CommunityStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/stats`;
      console.log("📡 Fetching stats from:", apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log("📊 Stats Response:", data);

      if (data.success) {
        setStats(data.data);
        setError("");
      } else {
        throw new Error(data.message || "Failed to load stats");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load community statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // 🕒 Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <FaUsers className="text-blue-400 text-4xl mb-2" />,
    },
    {
      title: "Total Issues",
      value: stats?.totalIssues ?? 0,
      icon: <FaClipboardList className="text-yellow-400 text-4xl mb-2" />,
    },
    {
      title: "Resolved Issues",
      value: stats?.resolvedIssues ?? 0,
      icon: <FaCheckCircle className="text-green-400 text-4xl mb-2" />,
    },
    {
      title: "In Progress",
      value: stats?.inProgressIssues ?? 0,
      icon: <FaSpinner className="text-purple-400 text-4xl mb-2 animate-spin-slow" />,
    },
  ];

  return (
    <section className="bg-[#0f172a] py-16 text-gray-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none"></div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-blue-400 mb-12"
      >
        Community Insights 🌍
      </motion.h2>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="text-blue-400 text-4xl animate-spin" />
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-10 text-red-400 flex flex-col items-center">
          <FaExclamationTriangle className="text-4xl mb-3" />
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#1e293b] rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center">
                {card.icon}
                <h3 className="text-lg font-semibold text-gray-300 mb-2">{card.title}</h3>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommunityStats;
