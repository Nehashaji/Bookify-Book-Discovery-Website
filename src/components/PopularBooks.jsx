// ----------- PopularBooks.jsx ----------------
// This component fetches popular books from the NYT API
// Displays them in a horizontal scrollable carousel
// Each book can be favorited and opened in a modal for details

import React, { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import "../styles/PopularBooks.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const PopularBooks = ({ shelfRef }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const scrollRef = useRef(null);
  const NYT_API_KEY = "S4IbmAm97migm3sTmsSkflDQDGyivaeV";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchPopularBooks = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
        );
        const data = await res.json();

        if (data.results && data.results.books) {
          const formattedBooks = data.results.books.map((book) => ({
            id: book.primary_isbn13,
            title: book.title,
            author: book.author,
            image: book.book_image,
            description: book.description,
            rating: (Math.random() * 2 + 3).toFixed(1),
            previewLink: book.amazon_product_url,
            fav: false,
            rank: book.rank,
            rank_last_week: book.rank_last_week,
            weeks_on_list: book.weeks_on_list,
            publisher: book.publisher,
          }));
          setBooks(formattedBooks);
        }
      } catch (err) {
        console.error("Error fetching popular books:", err);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleFav = (bookToUpdate) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookToUpdate.id ? { ...b, fav: !b.fav } : b
      )
    );

    if (selectedBook && selectedBook.id === bookToUpdate.id) {
      setSelectedBook({ ...bookToUpdate, fav: !bookToUpdate.fav });
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="popular-section">
      <h2 className="section-title" data-aos="fade-up">
        <FaStar className="section-icon" /> Top Popular Books
      </h2>

      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>

      <div className="scroll-container" ref={scrollRef}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} data-aos="fade-up" className="book-wrapper">
              <BookCard
                book={book}
                onView={setSelectedBook}
                onFav={handleFav}
                shelfRef={shelfRef} // ✅ Pass shelfRef here
              />
            </div>
          ))
        ) : (
          <p className="loading-text">Loading popular books...</p>
        )}
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onFav={handleFav}
        />
      )}
    </section>
  );
};

export default PopularBooks;
