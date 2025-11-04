import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center transition-all">
        <h2 className="text-3xl font-bold mb-4">Your Profile 👤</h2>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p className="mb-2">
            <strong className="text-gray-900 dark:text-gray-100">Name:</strong>{" "}
            {user.name}
          </p>
          <p className="mb-2">
            <strong className="text-gray-900 dark:text-gray-100">Email:</strong>{" "}
            {user.email}
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-100">Role:</strong>{" "}
            <span
              className={`font-semibold ${
                user.role === "admin"
                  ? "text-yellow-400"
                  : "text-blue-500"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            🏠 Back to Home
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/signin");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
