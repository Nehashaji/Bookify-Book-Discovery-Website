import React, { useEffect, useState } from "react";
import "../styles/favourites.css";
import BookCard from "../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

const FavoritesPage = ({ favorites, onFav, onView }) => {
  const [removingBookId, setRemovingBookId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleRemoveFav = (book) => {
    setRemovingBookId(book.id);

    setTimeout(() => {
      onFav(book);
      setRemovingBookId(null);
    }, 500);
  };

  return (
    <div className="favorites-page">
      <header className="favorites-hero" data-aos="fade-down">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>My Book Shelf</h1>
            <p>Your curated collection of favorite reads</p>
          </div>
        </div>
      </header>

      {favorites.length > 0 ? (
        <section className="favorites-grid">
          {favorites.map((book) => (
            <div
              className={`book-card-wrapper ${
                removingBookId === book.id ? "fade-out" : ""
              }`}
              key={book.id}
              data-aos={removingBookId === book.id ? "" : "zoom-in"}
            >
              <BookCard
                book={{
                  ...book,
                  fav: true,
                  image: book.image || "", 
                }}
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