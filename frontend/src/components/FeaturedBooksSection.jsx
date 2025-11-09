import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import { FaStar } from "react-icons/fa";
import "../styles/FeaturedBooks.css";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedBooksSection = ({ onFav, shelfRef, favorites }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    fetchFeaturedBooks();
  }, []);

  // Fetch featured books from backend
  const fetchFeaturedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/featured-books");
      console.log("Featured books from backend:", res.data); // debug
      setFeaturedBooks(res.data);
    } catch (err) {
      console.error("Error fetching featured books:", err);
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Open modal
  const handleView = (book) => setSelectedBook(book);

  return (
    <section className="featured-books-section" data-aos="fade-up">
      <div className="featured-header">
        <h2 className="section-title">
          <FaStar className="section-icon" /> Featured Books
        </h2>
      </div>

      {featuredBooks.length > 0 ? (
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={scrollLeft}>
            ❮
          </button>

          <div className="carousel-container" ref={scrollRef}>
            {featuredBooks.map((book) => {
              const isFav = favorites.some(
                (f) => f.id === book._id || f.id === book.id
              );

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
                    onView={handleView}
                    onFav={onFav}
                    shelfRef={shelfRef}
                    favorites={favorites}
                  />
                </div>
              );
            })}
          </div>

          <button className="carousel-btn right" onClick={scrollRight}>
            ❯
          </button>
        </div>
      ) : (
        <p className="no-books-text">No featured books available yet.</p>
      )}

      {selectedBook && (
        <BookModal
          book={{
            ...selectedBook,
            fav: favorites.some(
              (f) => f.id === selectedBook._id || f.id === selectedBook.id
            ),
            coverImage: selectedBook.cover, // map for modal too
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
