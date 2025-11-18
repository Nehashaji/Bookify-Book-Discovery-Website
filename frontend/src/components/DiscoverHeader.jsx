import React, { useEffect, useState } from "react";
import "../styles/discoverHeader.css"; 
import "aos/dist/aos.css";
import AOS from "aos";

const DiscoverHeader = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleSearch = () => {
    if (query.trim() === "") return; 
    onSearch(query.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="discover-header">
      <div
        className="discover-bg"
        data-aos="fade-in"
        data-aos-duration="1500"
      ></div>

      <div className="discover-container" data-aos="fade-up">
        <h2 className="discover-title">
          Discover Books That Speak to You
        </h2>
        <p className="discover-subtitle">
          Browse a world of books, from bestselling authors to hidden treasures waiting to be discovered.
        </p>

        {/* Search Bar */}
        <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
          <input
            type="text"
            placeholder="Search for books by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverHeader;
