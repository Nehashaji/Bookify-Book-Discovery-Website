import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/discoverGenres.css";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Static list of genres used for filtering books.
 * These genres are displayed as buttons in the UI.
 */
const GENRES = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Horror",
  "Historical",
];

/*
 * DiscoverGenres Component
 * 
 * This component allows users to:
 * - Browse books by genre
 * - Search for books using a query
 * - View book details in a modal
 * - Add or remove books from favorites
 * 
 * It integrates the Google Books API and synchronises
 * favorite status with global application state.
 */
const DiscoverGenres = ({
  onView,            // Function to handle viewing book details
  onFav,             // Function to add/remove favorites 
  shelfRef,          // Reference used for shelf animation
  favorites,         // List of user's favorite books
  searchQuery,       // Search input from navbar
  isLoggedIn,         // Authentication state
  showLoginPrompt,   // Function to prompt login modal
}) => {

  // Stores the list of books currently displayed
  const [books, setBooks] = useState([]);

  // Tracks which genre button is currently active
  const [activeGenre, setActiveGenre] = useState("");

  // Indicates whether books are currently being fetched
  const [loading, setLoading] = useState(false);

  // Stores the selected book for modal display
  const [selectedBook, setSelectedBook] = useState(null);

  const location = useLocation();

  /*
   * Initialises AOS animations once when the component mounts.
   * Animations run only once per scroll for performance reasons.
   */
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /*fetchBooks
   * reusable function to fetch books from the Google Books API.
   * It handles loading state, formatting API data, and syncing favorites.
   */
  const fetchBooks = useCallback(
    async (url, genre = "") => {
      setActiveGenre(genre);
      setBooks([]);
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          const formattedBooks = data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown Title",
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors.join(", ")
              : "Unknown Author",
            image:
              item.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/200x300?text=No+Image",
            fav: favorites.some((b) => b.id === item.id),
            rating: item.volumeInfo.averageRating || "N/A",
            description:
              item.volumeInfo.description || "No description available",
            previewLink: item.volumeInfo.previewLink || null,
          }));

          setBooks(formattedBooks);
        } else {
          setBooks([]);
        }
      } catch (error) {
        // handles API or network errors
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [favorites]
  );

  /* fetchBooksByGenre
   * Builds a Google Books API URL based on a selected genre
   * and delegates the fetching logic to fetchBooks().
   */
  const fetchBooksByGenre = useCallback(
    (genre) => {
      const formattedGenre = encodeURIComponent(genre);
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${formattedGenre}&orderBy=newest&maxResults=12`;
      fetchBooks(url, genre);
    },
    [fetchBooks]
  );

  /*Triggers a book search whenever the search query changes.
   * Ensures empty or whitespace-only queries are ignored.
   */
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchQuery
      )}&orderBy=newest&maxResults=12`;
      fetchBooks(url, "");
    }
  }, [searchQuery, fetchBooks]);

  /* Handles adding/removing a book from favorites.
   * Also updates the local UI state for immediate feedback.
   */
  const handleFavClick = (book) => {
    if (!isLoggedIn) {
      showLoginPrompt();
      return;
    }

    onFav(book);

    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === book.id ? { ...b, fav: !b.fav } : b
      )
    );
  };

  /*Synchronises local book favorite state whenever
   * the global favorites list changes.*/
  useEffect(() => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => ({
        ...b,
        fav: favorites.some((f) => f.id === b.id),
      }))
    );
  }, [favorites]);

  /*Reads genre from URL query parameters.
   * This allows direct linking to genre-filtered views.*/
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreFromURL = params.get("genre");

    if (genreFromURL) {
      const formattedGenre =
        genreFromURL.charAt(0).toUpperCase() + genreFromURL.slice(1);

      if (GENRES.includes(formattedGenre)) {
        fetchBooksByGenre(formattedGenre);
      }
    }
  }, [location.search, fetchBooksByGenre]);

  // Opens the modal with selected book details
  const handleView = (book) => setSelectedBook(book);

  return (
    <section className="genre-section" data-aos="fade-up">
      <h2 className="genre-header">Filter by Genre:</h2>

      {/* Genre filter buttons */}
      <div className="genre-buttons">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${
              activeGenre === genre ? "active" : ""
            }`}
            onClick={() => fetchBooksByGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Conditional rendering based on loading and data state */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading books...
        </div>
      ) : books.length > 0 ? (
        <div className="genre-book-grid">
          {books.map((book) => (
            <div data-aos="fade-up" key={book.id}>
              <BookCard
                book={book}
                onView={() => handleView(book)}
                onFav={() => handleFavClick(book)}
                shelfRef={shelfRef}
                isLoggedIn={isLoggedIn}
                showLoginPrompt={showLoginPrompt}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-books">
          {searchQuery
            ? "No books found for your search."
            : activeGenre
            ? "No books found for this genre."
            : "Select a genre or search to explore books."}
        </p>
      )}

      {/* Book details modal */}
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

export default DiscoverGenres;
