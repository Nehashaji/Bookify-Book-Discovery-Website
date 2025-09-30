// --------- TrendingGenres.jsx -----------
// This component shows a horizontal scrollable list of top book genres
// Includes scroll buttons, wave background, and navigation on click

import React, { useEffect, useRef } from "react";
import "../styles/TrendingGenres.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShapes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import placeholder images for genres
import fictionImg from "../assets/fiction.jpeg";
import mysteryImg from "../assets/mystery.jpeg";
import thrillerImg from "../assets/thriller.jpeg";
import scifiImg from "../assets/science.jpeg";
import fantasyImg from "../assets/fantasy.jpeg";
import romanceImg from "../assets/romance.jpeg";
import horrorImg from "../assets/horror.jpeg";
import historicalImg from "../assets/history.jpeg";

// Genre Data
const topGenres = [
  { name: "Fiction", image: fictionImg },
  { name: "Mystery", image: mysteryImg },
  { name: "Thriller", image: thrillerImg },
  { name: "Science Fiction", image: scifiImg },
  { name: "Fantasy", image: fantasyImg },
  { name: "Romance", image: romanceImg },
  { name: "Horror", image: horrorImg },
  { name: "Historical", image: historicalImg },
];

const TrendingGenres = () => {
  const navigate = useNavigate(); // React Router navigation
  const scrollRef = useRef(null); // reference for horizontal scroll container

  // AOS animations 
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Click handler 
  // Navigate to discover page with the selected genre
  const handleGenreClick = (genre) => {
    navigate(`/discover?genre=${genre.name.toLowerCase()}`);
  };

  // Scroll handler
  // Scrolls the container left or right by the visible width
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Render
  return (
    <section className="trending-genres-section">
      {/* wave background */}
      <div className="curvy-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#F5E6CA" 
            fillOpacity="1"
            d="M0,96L60,128C120,160,240,224,360,240C480,256,600,224,720,213.3C840,203,960,213,1080,197.3C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Section title with icon */}
      <h2 className="section-title" data-aos="fade-up">
        <FaShapes className="section-icon" /> Top Categories
      </h2>

      {/* Scroll buttons */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>

      {/* Horizontal scrollable container */}
      <div className="genre-scroll-container" ref={scrollRef} data-aos="fade-up">
        {topGenres.map((genre) => (
          <div
            key={genre.name}
            className="genre-card"
            onClick={() => handleGenreClick(genre)}
          >
            {/* Genre image */}
            <div
              className="genre-image"
              style={{ backgroundImage: `url(${genre.image})` }}
            ></div>

            {/* Genre name */}
            <p className="genre-name">{genre.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingGenres;
