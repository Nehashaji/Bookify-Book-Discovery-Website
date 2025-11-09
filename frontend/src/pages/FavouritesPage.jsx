import React, { useEffect, useState } from "react";
import "../styles/favourites.css";
import BookCard from "../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

const FavoritesPage = ({ favorites, onFav, onView }) => {
  const [favBooks, setFavBooks] = useState([]);
  const [removingBookId, setRemovingBookId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    setFavBooks(favorites.map((book) => ({ ...book, fav: true })));
  }, [favorites]);

  const handleRemoveFav = (book) => {
    setRemovingBookId(book.id);

    setTimeout(() => {
      setFavBooks((prev) => prev.filter((b) => b.id !== book.id));
      onFav(book);
      setRemovingBookId(null);
    }, 1000);
  };

  return (
    <div className="favorites-page">
      {/* Hero Section */}
      <header className="favorites-hero" data-aos="fade-down">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>My Book Shelf</h1>
            <p>Your curated collection of favorite reads</p>
          </div>
        </div>
      </header>

      {/* Favorites Grid */}
      {favBooks.length > 0 ? (
        <section className="favorites-grid">
          {favBooks.map((book) => (
            <div
              className={`book-card-wrapper ${
                removingBookId === book.id ? "fade-out" : ""
              }`}
              key={book.id}
              data-aos={removingBookId === book.id ? "" : "zoom-in"}
            >
              <BookCard
                book={book}
                onView={() => onView(book)}
                onFav={() => handleRemoveFav(book)}
              />
            </div>
          ))}
        </section>
      ) : (
        <div className="no-books-container" data-aos="fade-up">
          <p className="no-books">No books added to favorites yet!</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FavoritesPage;