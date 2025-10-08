// ------------- Hero.jsx -----------------
import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Foreground content */}
      <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
        <h1 data-aos="fade-right" data-aos-delay="300">
          Unlock Stories That Stay With You
        </h1>
        <p data-aos="fade-left" data-aos-delay="400">
          From hidden gems to bestsellers, explore books that speak to you.
        </p>

        <div className="search-bar" data-aos="zoom-in" data-aos-delay="500">
          <input
            type="text"
            placeholder="Search for books by title, author, or genre..."
          />
          <button>Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
