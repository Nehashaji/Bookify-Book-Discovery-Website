import React, { useState, useEffect } from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import DiscoverGenres from "../components/DiscoverGenres";
import Footer from "../components/Footer"; 
import "../styles/LoginPromptModal.css";

/* LoginPromptModal Component
 * This component displays a modal dialog prompting unauthenticated
 * users to log in or sign up before accessing restricted features
 * such as saving books to favourites.*/
const LoginPromptModal = ({ onClose }) => (
  <div className="login-prompt-overlay">
    <div className="login-prompt-modal">
      {/* Button to close the modal */}
      <button className="close-btn" onClick={onClose}>✕</button>

      {/* Informational content explaining why login is required */}
      <h2>Join Bookify to Save Your Favorites!</h2>
      <p>Sign up or log in to store your favorite books.</p>

      {/* Navigation buttons directing the user to authentication pages */}
      <div className="login-buttons">
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Log In
        </button>
        <button
          className="signup-btn"
          onClick={() => (window.location.href = "/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

/*DiscoverPage Component
 * This page allows users to explore books by genre or search query.
 * It also enforces authentication checks before allowing users to add books to their favourites.*/
const DiscoverPage = ({ onView, onFav, shelfRef, favorites }) => {
  // Stores the current search term entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Tracks whether the current user is authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Controls the visibility of the login prompt modal
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  /* useEffect: Determine authentication status on component mount
   * This effect checks localStorage for existing user data in order
   * to persist login state across page reloads.*/
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  /**
   * handleFavWithLoginCheck
    This function ensures that only authenticated users can
   * add or remove books from their favourites. If the user
   * is not logged in, a login prompt is displayed instead.
   */
  const handleFavWithLoginCheck = (book) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    onFav(book);
  };

  return (
    <>
      {/* Search header component used to capture user input */}
      <DiscoverHeader onSearch={setSearchQuery} />

      {/* Genre-based discovery component with authentication control */}
      <DiscoverGenres
        onView={onView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites} 
        searchQuery={searchQuery}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />

      {/* Footer displayed consistently across the website */}
      <Footer /> 

      {/* Conditional rendering of the login prompt modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </>
  );
};

export default DiscoverPage;