import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-t border-gray-700 text-gray-400 text-sm py-10 mt-16 overflow-hidden">
      {/* Decorative radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-6 text-center z-10"
      >
        {/* Logo + tagline */}
        <h2 className="text-2xl font-bold text-blue-400 mb-3">
          CivicConnect
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Bridging citizens and civic authorities — report issues, track progress, and build better communities together.
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-8">
          {[
            { Icon: FaFacebookF, href: "#" },
            { Icon: FaTwitter, href: "#" },
            { Icon: FaLinkedinIn, href: "#" },
            { Icon: FaGithub, href: "#" },
            { Icon: FaEnvelope, href: "mailto:support@civicconnect.com" },
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#60a5fa" }}
              className="text-gray-400 hover:text-blue-400 transition text-lg"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Navigation links */}
        <div className="flex justify-center flex-wrap gap-6 mb-6 text-gray-500">
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg w-64 bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:-translate-y-1">
            Subscribe
          </button>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">CivicConnect</span>. 
          All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
