// PopularBooks
// This component fetches popular books from the NYT API
// Displays them in a horizontal scrollable carousel
// Each book can be favorited and opened in a modal for more details
import React, { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import "../styles/PopularBooks.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const PopularBooks = ({
  shelfRef,
  onFav,
  onView,
  favorites,
  isLoggedIn,
  showLoginPrompt,
}) => {

  // Stores the list of popular books fetched from the API
  const [books, setBooks] = useState([]);

  // Tracks the currently selected book for modal display
  const [selectedBook, setSelectedBook] = useState(null);

  // Reference used to control horizontal scrolling behaviour
  const scrollRef = useRef(null);

  // API key for accessing the New York Times Books API
  const NYT_API_KEY = "S4IbmAm97migm3sTmsSkflDQDGyivaeV";

  /* useEffect initialises animations and fetches
   * the list of popular books when the component mounts
   * or when the favourites list changes.*/
  useEffect(() => {
    // Initialise AOS animations for smooth UI transitions
    AOS.init({ duration: 800, once: true });

    /*Fetches current bestseller books from the NYT API,
     * formats the response into a structure suitable
     * for the BookCard component, and updates state.*/
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
            // Rating is simulated for visual consistency
            rating: (Math.random() * 2 + 3).toFixed(1),
            previewLink: book.amazon_product_url,
            // Determines if the book is already in the user's favourites
            fav: favorites.some((f) => f.id === book.primary_isbn13),
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
  }, [favorites]);

  /*Handles smooth horizontal scrolling when the
   * left or right navigation buttons are clicked.*/
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /*Handles adding or removing a book from favourites.
   * Authentication is verified before allowing the action.*/
  const handleFavClick = (book) => {
    if (!isLoggedIn) {
      showLoginPrompt();
      return;
    }

    onFav(book);

    // Optimistically update UI state for immediate feedback
    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === book.id ? { ...b, fav: !b.fav } : b
      )
    );
  };

  return (
    <section className="popular-section">

      {/* Section heading with visual emphasis */}
      <h2 className="section-title" data-aos="fade-up">
        <FaStar className="section-icon" /> Bestsellers Books
      </h2>

      {/* Horizontal scroll controls */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>

      {/* Scrollable container holding book cards */}
      <div className="scroll-container" ref={scrollRef}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} data-aos="fade-up" className="book-wrapper">
              <BookCard
                book={book}
                onView={() => {
                  setSelectedBook(book);
                  onView(book);
                }}
                onFav={() => handleFavClick(book)}
                shelfRef={shelfRef}
                isLoggedIn={isLoggedIn}
                showLoginPrompt={showLoginPrompt}
              />
            </div>
          ))
        ) : (
          // Loading state shown while data is being fetched
          <p className="loading-text">Loading popular books...</p>
        )}
      </div>

      {/* Modal for displaying detailed book information */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onFav={() => handleFavClick(selectedBook)}
        />
      )}
    </section>
  );
};

export default PopularBooks;