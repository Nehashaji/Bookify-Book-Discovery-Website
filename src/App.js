import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import BookModal from "./components/BookModal";

// Pages
import HomePage from "./pages/HomePage";       
import DiscoverPage from "./pages/DiscoverPage"; 
import FavoritesPage from "./pages/FavouritesPage"; 

import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null); // book for modal
  const [favorites, setFavorites] = useState([]); // favorite books
  const shelfRef = useRef(null); // reference for shelf animation

  // Open modal
  const handleView = (book) => setSelectedBook(book);

  // Close modal
  const handleClose = () => setSelectedBook(null);

  // Add/remove favorite
  const handleFav = (book) => {
    let newFavorites;
    const exists = favorites.some((b) => b.id === book.id);

    if (exists) {
      newFavorites = favorites.filter((b) => b.id !== book.id);
    } else {
      newFavorites = [...favorites, book];
    }

    // Update favorites state
    setFavorites(newFavorites);

    // Update modal favorite status if currently open
    if (selectedBook && selectedBook.id === book.id) {
      setSelectedBook({
        ...selectedBook,
        fav: !exists, 
      });
    }
  };

  return (
    <div className="App font-sans">
      <Navbar ref={shelfRef} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onView={handleView}
                onFav={handleFav}
                shelfRef={shelfRef}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/discover"
            element={
              <DiscoverPage
                onView={handleView}
                onFav={handleFav}
                shelfRef={shelfRef}
                favorites={favorites}
              />
            }
          />
          {/* Favorites page route */}
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onFav={handleFav}
                onView={handleView}
              />
            }
          />
        </Routes>
      </main>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleClose}
          onFav={handleFav}
        />
      )}
    </div>
  );
}

export default App;
