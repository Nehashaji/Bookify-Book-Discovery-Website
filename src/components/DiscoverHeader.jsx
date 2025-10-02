import React, { useEffect } from "react";
import "../styles/discoverHeader.css"; // Import the CSS we created
import "aos/dist/aos.css";
import AOS from "aos";

const DiscoverHeader = () => {
  // ✅ Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="discover-header">
      {/* Animated Background Layer */}
      <div
        className="discover-bg"
        data-aos="fade-in"       // Animation type
        data-aos-duration="1500" // Animation duration
      ></div>

      {/* Content */}
      <div className="discover-container" data-aos="fade-up">
        {/* Heading */}
        <h2 className="discover-title">
          Discover Books That Speak to You
        </h2>

        {/* Subtitle */}
        <p className="discover-subtitle">
          Browse a world of books, from bestselling authors to hidden treasures waiting to be discovered.
        </p>

        {/* Search Bar */}
        <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
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

export default DiscoverHeader;
