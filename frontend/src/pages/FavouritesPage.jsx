import React, { useEffect, useState } from "react";
import "../styles/favourites.css";
import BookCard from "../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; 

/*FavoritesPage Component
 * This component is for rendering the user's collection
 * of favourite books. It incorporates smooth animations via AOS,
 * displays a message when no books are added, and allows users to
 * remove books from their favourites.*/
const FavoritesPage = ({ favorites, onFav, onView }) => {
  // Tracks the ID of a book currently being removed to apply a fade-out animation
  const [removingBookId, setRemovingBookId] = useState(null);

  // Provides access to the current authenticated user context
  const { user } = useAuth(); 

  /* useEffect: Initialize Animate On Scroll (AOS) library
   * This effect runs once upon mounting to ensure smooth fade-up and fade-down
   * animations for book cards and page header content.*/
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); 
  }, []);

  /* handleFavClick
   * Handles the removal of a book from the user's favourites.
   * A temporary state is used to trigger a fade-out animation
   * before the actual removal logic is executed.
   */
  const handleFavClick = (book) => {
    setRemovingBookId(book.id);

    // Delay removal slightly to allow fade-out animation to complete
    setTimeout(() => {
      onFav(book); 
      setRemovingBookId(null);
    }, 200);
  };

  return (
    <div className="favorites-page">
      {/* Page header with overlay and animated content */}
      <header className="favorites-hero" data-aos="fade-down">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>My Book Shelf</h1>
            <p>Your curated collection of favorite reads</p>
          </div>
        </div>
      </header>

      {/* Conditional rendering based on whether the user has favourite books */}
      {favorites.length > 0 ? (
        <section className="favorites-grid">
          {favorites.map((book, index) => (
            <div
              key={book.id}
              className={`book-card-wrapper ${
                removingBookId === book.id ? "fade-out" : ""
              }`}
              data-aos="fade-up"  // Applys fade-up animation for each card
              data-aos-delay={index * 100}   // Stagger animation
            >
              <BookCard
                book={{ ...book, fav: true }}   // Ensure book is marked as favourite
                onView={() => onView(book)}  // Handler to open book details
                onFav={handleFavClick}  // Handler to remove book from favourites
                isLoggedIn={!!user}  // Pass authentication status to card
              />
            </div>
          ))}
        </section>
      ) : (
        // Displays when no favourite books are available
        <div className="no-books-container" data-aos="fade-up">
          <p className="no-books">No books added to favorites yet!</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FavoritesPage;