import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center transition-all">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user.name}! 👋
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You are logged in as{" "}
          <span className="font-medium">{user.email}</span>
        </p>

        {/* If user is admin, show Admin Panel access */}
        {user.role === "admin" && (
          <div className="mb-6">
            <p className="text-yellow-500 font-semibold mb-2">You have Admin privileges.</p>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              🔑 Go to Admin Panel
            </button>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
