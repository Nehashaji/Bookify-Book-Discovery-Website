import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import PopularBooks from "../components/PopularBooks";
import TrendingGenres from "../components/TrendingGenres";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/FeaturedBooks.css";
import "../styles/LoginPromptModal.css";
import { FaStar } from "react-icons/fa";

/*LoginPromptModal Component*/
const LoginPromptModal = ({ onClose }) => (
  <div className="login-prompt-overlay">
    <div className="login-prompt-modal">
      <button className="close-btn" onClick={onClose}>✕</button>
      <h2>Join Bookify to Save Your Favorites!</h2>
      <p>Sign up or log in to store your favorite books.</p>
      <div className="login-buttons">
        <button className="login-btn" onClick={() => (window.location.href = "/login")}>
          Log In
        </button>
        <button className="signup-btn" onClick={() => (window.location.href = "/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

/**
 * HomePage Component
  Serves as the landing page of the website, showcasing featured and popular books, trending genres etc.
 * Integrates AOS for smooth scrolling animations and manages
 * authentication-based interactions for favoriting books.
 */
const HomePage = ({ onFav, shelfRef, favorites }) => {
  // State to store books marked as featured by the admin
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // State to manage currently selected book for modal view
  const [selectedBook, setSelectedBook] = useState(null);

  // State to control display of login prompt modal
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Tracks whether the user is authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Reference for horizontal scrolling of featured books carousel
  const scrollRef = useRef(null);

  /*useEffect Hook: Initialize AOS and fetch featured books
   * Runs on component mount to enable animations and restore
   * authentication state from local storage.*/
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchFeaturedBooks();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  /*fetchFeaturedBooks
   * fetches featured books from the backend API.
   * Ensures that each book object contains a valid image for display.*/
  const fetchFeaturedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/featured");
      const booksWithImage = res.data.map((b) => ({
        ...b,
        image: b.cover || b.image || b.coverUrl || "",
      }));
      setFeaturedBooks(booksWithImage);
    } catch (err) {
      console.error("Error fetching featured books:", err);
    }
  };

  // Scrolls the featured books carousel to the left by 300px
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });

  // Scrolls the featured books carousel to the right by 300px
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  // Opens modal to view book details
  const handleView = (book) => setSelectedBook(book);

  /*handleFavWithLoginCheck
    Wraps the onFav callback with an authentication check.
   * If the user is not logged in, displays a login prompt modal.
   */
  const handleFavWithLoginCheck = (book) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    onFav(book);
  };

  return (
    <div>
      {/* Hero Section*/}
      <Hero />

      {/* PopularBooks Component: Showcases current bestsellers */}
      <PopularBooks
        onView={handleView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />

      {/* Featured Books Section */}
      <section className="featured-books-section" data-aos="fade-up">
        <div className="featured-header">
          <h2 className="section-title">
            <FaStar className="section-icon" /> Featured Books
          </h2>
        </div>

        {featuredBooks.length > 0 ? (
          <div className="carousel-wrapper">
            {/* Carousel left scroll button */}
            <button className="carousel-btn left" onClick={scrollLeft}>❮</button>

            {/* Carousel container for horizontally scrolling featured books */}
            <div className="carousel-container" ref={scrollRef}>
              {featuredBooks.map((book) => {
                const isFav = favorites.some((f) => f.id === book._id);
                return (
                  <div key={book._id} className="book-card-wrapper" data-aos="fade-up">
                    <BookCard
                      book={{ ...book, fav: isFav, image: book.image }}
                      onView={handleView}
                      onFav={() => handleFavWithLoginCheck(book)}
                      favorites={favorites}
                      shelfRef={shelfRef}
                      isLoggedIn={isLoggedIn}
                      showLoginPrompt={() => setShowLoginPrompt(true)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Carousel right scroll button */}
            <button className="carousel-btn right" onClick={scrollRight}>❯</button>
          </div>
        ) : (
          // Fallback text when no featured books are available
          <p className="no-books-text">No featured books available yet.</p>
        )}
      </section>

      {/* TrendingGenres Component: Displays genre-based book exploration */}
      <TrendingGenres
        onView={handleView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />

      {/* Informational sections */}
      <WhyChooseUs />
      <CTASection />

      {/* Footer Component */}
      <Footer />

      {/* Book Modal: Detailed view for selected book */}
      {selectedBook && (
        <BookModal
          book={{
            ...selectedBook,
            fav: favorites.some(
              (f) => f.id === selectedBook._id || f.id === selectedBook.id
            ),
          }}
          onClose={() => setSelectedBook(null)}
          onFav={() => handleFavWithLoginCheck(selectedBook)}
        />
      )}

      {/* Login Prompt Modal: Displayed if user tries to favourite without login */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
};

export default HomePage;