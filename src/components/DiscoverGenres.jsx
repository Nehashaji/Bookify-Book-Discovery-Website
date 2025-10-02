import React, { useState, useEffect } from "react";
import "../styles/discoverGenres.css"; 
import BookCard from "./BookCard";     
import AOS from "aos";                  // Animate On Scroll library
import "aos/dist/aos.css";              

// List of genres available for filtering books
const GENRES = [
  "Fantasy",
  "Mystery",
  "Romance",
  "Science Fiction",
  "History",
  "Self-Help",
];

const DiscoverGenres = ({ onView, onFav, shelfRef, favorites }) => {
  const [books, setBooks] = useState([]);           // Stores currently displayed books for the selected genre
  const [activeGenre, setActiveGenre] = useState(""); // Tracks which genre button is currently active
  const [loading, setLoading] = useState(false);   // Loading state for spinner while fetching books

  // Initialize AOS animations on component mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Function to fetch books from Google Books API based on selected genre
  const fetchBooksByGenre = async (genre) => {
    setActiveGenre(genre); // Set active genre for button highlight
    setBooks([]);          // Clear current books while fetching new ones
    setLoading(true);      // Show loading spinner

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=12`
      );
      const data = await response.json();

      if (data.items) {
        // Format API data to match BookCard props
        const formattedBooks = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "Unknown Title",
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown Author",
          image:
            item.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/200x300?text=No+Image",
          fav: favorites.some((b) => b.id === item.id), // Checks if this book is already in favorites
          rating: item.volumeInfo.averageRating || "N/A",
          description: item.volumeInfo.description || "No description available",
          previewLink: item.volumeInfo.previewLink || null,
        }));

        setBooks(formattedBooks); // Updates state with formatted books
      } else {
        setBooks([]); // No books returned for this genre
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // Handles API errors gracefully
    } finally {
      setLoading(false); // Stops loading spinner once fetch is complete
    }
  };

  // Handle favorite toggle when user clicks heart in BookCard or BookModal
  const handleFavClick = (book) => {
    onFav(book); // Updates favorites in parent (App.js)

    // Updates local books state to immediately reflect heart toggle on BookCard
    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === book.id ? { ...b, fav: !b.fav } : b
      )
    );
  };

  // Keep local books' favorite status synced with global favorites from App.js
  useEffect(() => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => ({
        ...b,
        fav: favorites.some((f) => f.id === b.id), // Mark as favorite if in global favorites
      }))
    );
  }, [favorites]);

  return (
    <section className="genre-section" data-aos="fade-up">
      <h2 className="genre-header">Filter by Genre:</h2>

      {/* Genre filter buttons */}
      <div className="genre-buttons">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${activeGenre === genre ? "active" : ""}`} // Highlight active genre
            onClick={() => fetchBooksByGenre(genre)} // Fetch books for clicked genre
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Loading spinner */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading books...
        </div>
      ) : books.length > 0 ? (
        // Display fetched books using BookCard component
        <div className="genre-book-grid">
          {books.map((book) => (
            <div data-aos="fade-up" key={book.id}>
              <BookCard
                book={book}
                onView={() => onView(book)} // Open modal on book click
                onFav={() => handleFavClick(book)} // Sync favorite click
                shelfRef={shelfRef} // Reference for shelf animation
              />
            </div>
          ))}
        </div>
      ) : (
        // Message if no books are found or genre not selected
        <p className="no-books">
          {activeGenre
            ? "No books found for this genre."
            : "Select a genre to explore books."}
        </p>
      )}
    </section>
  );
};

export default DiscoverGenres;
