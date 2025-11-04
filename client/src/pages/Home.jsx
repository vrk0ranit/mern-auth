import React from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import CommunityStats from "../components/CommunityStats";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <HeroSection />
      <CommunityStats/>
      <Footer />
    </div>
  );
};

export default Home;
