import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  
import "../styles/discoverGenres.css"; 
import BookCard from "./BookCard";     
import AOS from "aos";
import "aos/dist/aos.css";              

const GENRES = [
  "Fiction", "Mystery", "Thriller", "Science Fiction",
  "Fantasy", "Romance", "Horror", "Historical",
];

const DiscoverGenres = ({ onView, onFav, shelfRef, favorites, searchQuery }) => {
  const [books, setBooks] = useState([]);           
  const [activeGenre, setActiveGenre] = useState(""); 
  const [loading, setLoading] = useState(false);   

  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const fetchBooks = async (url, genre = "") => {
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
          image: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/200x300?text=No+Image",
          fav: favorites.some((b) => b.id === item.id),
          rating: item.volumeInfo.averageRating || "N/A",
          description: item.volumeInfo.description || "No description available",
          previewLink: item.volumeInfo.previewLink || null,
        }));

        setBooks(formattedBooks);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch genre books
  const fetchBooksByGenre = (genre) => {
    const formattedGenre = encodeURIComponent(genre);
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${formattedGenre}&orderBy=newest&maxResults=12`;
    fetchBooks(url, genre);
  };

  // Fetch search results
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&orderBy=newest&maxResults=12`;
      fetchBooks(url, ""); // reset active genre
    }
  }, [searchQuery]);

  const handleFavClick = (book) => {
    onFav(book); 
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === book.id ? { ...b, fav: !b.fav } : b))
    );
  };

  useEffect(() => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => ({
        ...b,
        fav: favorites.some((f) => f.id === b.id),
      }))
    );
  }, [favorites]);

  // Auto-fetch genre from URL params on first load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreFromURL = params.get("genre");
    if (genreFromURL) {
      const formattedGenre = genreFromURL.charAt(0).toUpperCase() + genreFromURL.slice(1);
      if (GENRES.includes(formattedGenre)) {
        fetchBooksByGenre(formattedGenre);
      }
    }
  }, [location.search]);

  return (
    <section className="genre-section" data-aos="fade-up">
      <h2 className="genre-header">Filter by Genre:</h2>

      {/* Genre filter buttons */}
      <div className="genre-buttons">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${activeGenre === genre ? "active" : ""}`}
            onClick={() => fetchBooksByGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Show loading spinner */}
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
                onView={() => onView(book)}
                onFav={() => handleFavClick(book)}
                shelfRef={shelfRef}
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
    </section>
  );
};

export default DiscoverGenres;
