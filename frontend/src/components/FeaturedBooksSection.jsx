// FeaturedBooks Section
// This component renders the "Featured Books" section on the homepage
// It fetches featured books from the backend and displays them in a horizontal carousel
// Users can favorite books or open a modal to view details
// Includes scroll buttons and AOS fade-up animations for a polished UX

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import { FaStar } from "react-icons/fa";
import "../styles/FeaturedBooks.css";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedBooksSection = ({ onFav, shelfRef, favorites }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]); // holds list of featured books
  const [selectedBook, setSelectedBook] = useState(null); // currently selected book for modal
  const scrollRef = useRef(null); // ref for carousel scroll container

  // Initialize AOS and fetch featured books
  useEffect(() => {
    AOS.init({ duration: 1200, once: true }); // fade up animation, triggers once
    fetchFeaturedBooks();
  }, []);

  // Fetching featured books from backend API
  const fetchFeaturedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/featured-books");
      console.log("Featured books from backend:", res.data); // debug log
      setFeaturedBooks(res.data);
    } catch (err) {
      console.error("Error fetching featured books:", err);
    }
  };

  // Scroll carousel left/right
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Open modal for selected book
  const handleView = (book) => setSelectedBook(book);

  // Render
  return (
    <section className="featured-books-section" data-aos="fade-up">
      {/* Section header with star icon */}
      <div className="featured-header">
        <h2 className="section-title">
          <FaStar className="section-icon" /> Featured Books
        </h2>
      </div>

      {/* Carousel */}
      {featuredBooks.length > 0 ? (
        <div className="carousel-wrapper">
          {/* Scroll left button */}
          <button className="carousel-btn left" onClick={scrollLeft}>
            ❮
          </button>

          {/* Scrollable container */}
          <div className="carousel-container" ref={scrollRef}>
            {featuredBooks.map((book) => {
              const isFav = favorites.some(
                (f) => f.id === book._id || f.id === book.id
              ); // checks if book is in favorites

              return (
                <div key={book._id} className="book-card-wrapper">
                  <BookCard
                    book={{
                      id: book._id,
                      title: book.title,
                      author: book.author,
                      coverImage: book.cover, // map backend 'cover' to BookCard prop
                      description: book.description,
                      fav: isFav,
                    }}
                    onView={handleView} // open modal
                    onFav={onFav} // toggle favorite
                    shelfRef={shelfRef}
                    favorites={favorites}
                  />
                </div>
              );
            })}
          </div>

          {/* Scroll right button */}
          <button className="carousel-btn right" onClick={scrollRight}>
            ❯
          </button>
        </div>
      ) : (
        <p className="no-books-text">No featured books available yet.</p>
      )}

      {/* Modal for selected book */}
      {selectedBook && (
        <BookModal
          book={{
            ...selectedBook,
            fav: favorites.some(
              (f) => f.id === selectedBook._id || f.id === selectedBook.id
            ),
            coverImage: selectedBook.cover, // map backend 'cover' for modal
          }}
          onClose={() => setSelectedBook(null)}
          onFav={onFav}
          favorites={favorites}
        />
      )}
    </section>
  );
};

export default FeaturedBooksSection;