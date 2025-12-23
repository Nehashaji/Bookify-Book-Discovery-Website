import React, { useState, useEffect } from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import DiscoverGenres from "../components/DiscoverGenres";
import Footer from "../components/Footer"; 
import "../styles/LoginPromptModal.css";

// Login Prompt Modal
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

const DiscoverPage = ({ onView, onFav, shelfRef, favorites }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  // Wrap onFav with login check
  const handleFavWithLoginCheck = (book) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    onFav(book);
  };

  return (
    <>
      <DiscoverHeader onSearch={setSearchQuery} />
      <DiscoverGenres
        onView={onView}
        onFav={handleFavWithLoginCheck}
        shelfRef={shelfRef}
        favorites={favorites} 
        searchQuery={searchQuery}
        isLoggedIn={isLoggedIn}
        showLoginPrompt={() => setShowLoginPrompt(true)}
      />
      <Footer /> 

      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </>
  );
};

export default DiscoverPage;
