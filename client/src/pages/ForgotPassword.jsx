import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ Password reset link sent! Check your email.");
      setEmail("");
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

      <div className="relative z-10 bg-[#1e293b]/80 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Forgot Password 🔒
        </h2>

        {/* Alerts */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-600/20 border border-green-600 text-green-400 px-3 py-2 rounded-md mb-4 text-sm text-center">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md shadow-blue-600/30 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-center mt-6 text-gray-400">
          Remember your password?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline transition">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
