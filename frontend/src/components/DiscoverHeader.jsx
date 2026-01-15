import React, { useEffect, useState } from "react";
import "../styles/discoverHeader.css"; 
import "aos/dist/aos.css";
import AOS from "aos";

// This component displays the top section of the Discover page,
// including the background banner and the search bar.
const DiscoverHeader = ({ onSearch }) => {
  
  // Stores whatever the user types into the search box.
  const [query, setQuery] = useState("");

  // Runs only once when the component loads.
  // It activates the AOS library for animations.
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  // Runs when the user clicks the "Search" button.
  // If the search box is empty, nothing happens.
  // Otherwise, it will send the search text back to the parent component.
  const handleSearch = () => {
    if (query.trim() === "") return; 
    onSearch(query.trim());
  };

  // Allows pressing the "Enter" key to search.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="discover-header">
      {/* Background image with fade-in animation */}
      <div
        className="discover-bg"
        data-aos="fade-in"
        data-aos-duration="1500"
      ></div>

      <div className="discover-container" data-aos="fade-up">
        {/* Main title text */}
        <h2 className="discover-title">
          Discover Books That Speak to You
        </h2>

        {/* Short description below the title */}
        <p className="discover-subtitle">
          Browse a world of books, from bestselling authors to hidden treasures waiting to be discovered.
        </p>

        {/* Search bar area */}
        <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
          <input
            type="text"
            placeholder="Search for books by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}  // Updates search text as the user types
            onKeyPress={handleKeyPress}                 // Allows searching by pressing Enter
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverHeader;