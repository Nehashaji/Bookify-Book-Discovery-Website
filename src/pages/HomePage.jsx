// HomePage.jsx
import React from "react";
import Hero from "../components/Hero";
import PopularBooks from "../components/PopularBooks";
import TrendingGenres from "../components/TrendingGenres";

/**
 * HomePage - Displays Hero section, Popular Books, and Trending Genres
 * Props:
 *   onView(book) - callback to open modal for a book
 *   onFav(book)  - callback to toggle favorites
 */
const HomePage = ({ onView, onFav }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Popular Books Section */}
      <PopularBooks onView={onView} onFav={onFav} />

      {/* Trending Genres Section */}
      <TrendingGenres onView={onView} onFav={onFav} />
    </div>
  );
};

export default HomePage;
