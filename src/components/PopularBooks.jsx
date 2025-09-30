// ----------- PopularBooks.jsx ----------------
// This component fetches popular books from the NYT API
// Displays them in a horizontal scrollable carousel
// Each book can be favorited and opened in a modal for details

import React, { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard"; // Reusable card component for each book
import BookModal from "./BookModal"; // Modal component to show book details
import "../styles/PopularBooks.css"; // Styles for this section
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"; // icons 

const PopularBooks = () => {
  // States 
  const [books, setBooks] = useState([]); // Store list of popular books
  const [selectedBook, setSelectedBook] = useState(null); // Store currently selected book for modal
  const scrollRef = useRef(null); // Reference for horizontal scrolling container
  const NYT_API_KEY = "S4IbmAm97migm3sTmsSkflDQDGyivaeV"; // NYT API key

  // Fetch Popular Books 
  useEffect(() => {
    // Initialize AOS animation
    AOS.init({ duration: 800, once: true });

    // Function to fetch books from NYT API
    const fetchPopularBooks = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
        );
        const data = await res.json();

        // Checks if data exists
        if (data.results && data.results.books) {
          // Format the books for our app
          const formattedBooks = data.results.books.map((book) => ({
            id: book.primary_isbn13,
            title: book.title,
            author: book.author,
            image: book.book_image,
            description: book.description,
            rating: (Math.random() * 2 + 3).toFixed(1), // Random rating 3-5 
            previewLink: book.amazon_product_url,
            fav: false, 
            rank: book.rank,
            rank_last_week: book.rank_last_week,
            weeks_on_list: book.weeks_on_list,
            publisher: book.publisher,
          }));
          setBooks(formattedBooks); // Update state
        }
      } catch (err) {
        console.error("Error fetching popular books:", err);
      }
    };

    fetchPopularBooks();
  }, []);

  // Toggle Favorite
  const handleFav = (bookToUpdate) => {
    // Update book list with toggled favorite
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookToUpdate.id ? { ...b, fav: !b.fav } : b
      )
    );

    // If modal is open for this book, update its favorite state too
    if (selectedBook && selectedBook.id === bookToUpdate.id) {
      setSelectedBook({ ...bookToUpdate, fav: !bookToUpdate.fav });
    }
  };

  // Horizontal Scroll
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
    <section className="popular-section">
      {/* Section title */}
      <h2 className="section-title" data-aos="fade-up">
        <FaStar className="section-icon" /> Top Popular Books
      </h2>

      {/* Left/Right scroll buttons */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>

      {/* Scrollable container for books */}
      <div className="scroll-container" ref={scrollRef}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} data-aos="fade-up" className="book-wrapper">
              <BookCard
                book={book}
                onView={setSelectedBook} // Opens modal card on click
                onFav={handleFav} // Toggle favorite
              />
            </div>
          ))
        ) : (
          <p className="loading-text">Loading popular books...</p>
        )}
      </div>

      {/* Modal for selected book */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)} // Close modal
          onFav={handleFav} // Favorite toggle inside modal
        />
      )}
    </section>
  );
};

export default PopularBooks;
