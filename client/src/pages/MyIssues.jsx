import React, { useEffect, useState } from "react";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setIssues(data.data);
      } catch (err) {
        console.error("❌ Error fetching issues:", err);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
        My Reported Issues 📝
      </h2>

      {issues.length === 0 ? (
        <p className="text-center text-gray-400">No issues reported yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {issues.map((i) => (
            <div
              key={i._id}
              className="bg-[#1e293b] border border-gray-700 rounded-xl shadow-md hover:shadow-blue-500/20 transition p-4"
            >
              {i.image && (
                <img
                  src={
                    i.image.startsWith("http")
                      ? i.image
                      : `${import.meta.env.VITE_API_URL.replace("/api", "")}${i.image}`
                  }
                  alt={i.title}
                  className="rounded-lg w-full h-48 object-cover mb-3"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />
              )}


              <h3 className="text-xl font-semibold text-blue-400 mb-1">
                {i.title}
              </h3>
              <p className="text-gray-300 text-sm mb-2">{i.description}</p>
              <p className="text-sm text-gray-400">
                Category: <span className="font-semibold">{i.category}</span>
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${i.status === "Resolved"
                    ? "bg-green-600 text-white"
                    : i.status === "In Progress"
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {i.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(i.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
