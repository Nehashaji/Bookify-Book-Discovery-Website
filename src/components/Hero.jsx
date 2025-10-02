// ------------- Hero.jsx -----------------
// Hero section component for the home page
// Includes a background video, overlay content, heading, subheading, and search bar

import React from "react";
import "../styles/Hero.css"; // Import Hero-specific styles
import HeroVideo from "../assets/BGVIDEO.mp4"; // Background video file

const Hero = () => {
  return (
    <section className="hero" data-aos="fade-up">
      {/* Background Video */}
      {/* Plays automatically, loops, muted for autoplay compatibility */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay*/}
      {/* Dark overlay to make text readable over video */}
      <div className="hero-overlay">
        <div className="hero-content">
          {/* Main heading */}
          <h1 data-aos="fade-right" data-aos-delay="200">
            Unlock Stories That Stay With You
          </h1>

          {/* Subheading / description */}
          <p data-aos="fade-left" data-aos-delay="400">
            From hidden gems to bestsellers, explore books that speak to you.
          </p>

          {/*Search Bar */}
          {/* Input field and button for searching books */}
          <div className="search-bar" data-aos="zoom-in" data-aos-delay="600">
            <input
              type="text"
              placeholder="Search for books by title, author, or genre..."
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
