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

// Login Prompt Modal Component
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

const HomePage = ({ onFav, shelfRef, favorites }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchFeaturedBooks();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

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

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  const handleView = (book) => setSelectedBook(book);

  const handleFavWithLoginCheck = (book) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    onFav(book);
  };

  return (
    <div>
      <Hero />

      <PopularBooks
        onView={handleView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />

      <section className="featured-books-section" data-aos="fade-up">
        <div className="featured-header">
          <h2 className="section-title">
            <FaStar className="section-icon" /> Featured Books
          </h2>
        </div>

        {featuredBooks.length > 0 ? (
          <div className="carousel-wrapper">
            <button className="carousel-btn left" onClick={scrollLeft}>❮</button>

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

            <button className="carousel-btn right" onClick={scrollRight}>❯</button>
          </div>
        ) : (
          <p className="no-books-text">No featured books available yet.</p>
        )}
      </section>

      <TrendingGenres
        onView={handleView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />

      <WhyChooseUs />
      <CTASection />
      <Footer />

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

      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
};

export default HomePage;