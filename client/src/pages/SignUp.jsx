import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none"></div>

      {/* SignUp Card */}
      <div className="relative z-10 bg-[#1e293b]/80 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Create Your Account 🌟
        </h2>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md shadow-blue-600/30 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline transition">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
