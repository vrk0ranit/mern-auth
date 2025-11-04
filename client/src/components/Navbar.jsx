import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setToken(localStorage.getItem("token"));
    setMenuOpen(false); // close menu when navigating
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-[#0f172a] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-blue-400 hover:text-blue-300 transition-colors"
        >
          CivicConnect
        </Link>

        {/* Hamburger Icon (Mobile only) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5">
          {token ? (
            <>
              <Link to="/report" className="hover:text-blue-400 transition-colors">
                Report Issue
              </Link>
              <Link to="/my-issues" className="hover:text-blue-400 transition-colors">
                My Issues
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-md hover:bg-yellow-300 transition-colors"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/profile"
                className="bg-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-400 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-blue-400 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-gray-700 px-6 pb-4 space-y-3 animate-fadeInDown">
          {token ? (
            <>
              <Link
                to="/report"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-400 transition"
              >
                Report Issue
              </Link>
              <Link
                to="/my-issues"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-400 transition"
              >
                My Issues
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-md hover:bg-yellow-300 transition-colors"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block bg-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-400 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-400 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
