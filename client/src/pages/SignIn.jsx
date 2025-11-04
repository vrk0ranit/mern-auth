import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 bg-[#1e293b]/80 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />

            {/* Toggle Eye */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l1.657 1.657A9.98 9.98 0 001 10c.73 2.89 4 7 9 7a8.97 8.97 0 004.636-1.294l1.657 1.657a1 1 0 001.414-1.414L3.707 2.293zM14.12 12.706A4 4 0 017.293 5.88l1.42 1.42a2 2 0 002.987 2.987l1.42 1.42z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md shadow-blue-600/30 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between text-sm mt-6 text-gray-400">
          <Link to="/signup" className="hover:text-blue-400 transition">
            Don’t have an account? <span className="text-blue-400">Sign up</span>
          </Link>
          <Link to="/forgot-password" className="hover:text-blue-400 transition">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
