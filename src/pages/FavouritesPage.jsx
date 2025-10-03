import React, { useEffect } from "react";
import "../styles/favourites.css";
import BookCard from "../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";
import libraryImg from "../assets/library.jpeg";

const FavoritesPage = ({ favorites, onFav, onView }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Ensure every book in favorites has fav = true for red heart
  const favoritesWithFlag = favorites.map((book) => ({ ...book, fav: true }));

  return (
    <div className="favorites-page">
      {/* Hero Section */}
      <header
        className="favorites-hero"
        style={{ backgroundImage: `url(${libraryImg})` }}
        data-aos="fade-down"
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>My Book Shelf</h1>
            <p>Your curated collection of favorite reads</p>
          </div>
        </div>
      </header>

      {/* Favorites Grid */}
      {favoritesWithFlag.length > 0 ? (
        <section className="favorites-grid">
          {favoritesWithFlag.map((book) => (
            <div
              className="book-card-wrapper"
              key={book.id}
              data-aos="zoom-in"
            >
              <BookCard
                book={book}
                onView={() => onView(book)}
                onFav={() => onFav(book)}
              />
            </div>
          ))}
        </section>
      ) : (
        <div className="no-books-container" data-aos="fade-up">
          <p className="no-books">No books added to favorites yet!</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
