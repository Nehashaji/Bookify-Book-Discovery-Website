import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import BookModal from "./components/BookModal";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import FavoritesPage from "./pages/FavouritesPage";
import BookNewsPage from "./pages/BookNewsPage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const shelfRef = useRef(null);

  const handleView = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  const handleFav = (book) => {
    const exists = favorites.some((b) => b.id === book.id);
    const newFavorites = exists
      ? favorites.filter((b) => b.id !== book.id)
      : [...favorites, book];

    setFavorites(newFavorites);

    if (selectedBook && selectedBook.id === book.id) {
      setSelectedBook({ ...selectedBook, fav: !exists });
    }

    toast.dismiss();
    if (exists) {
      toast.error(`Removed "${book.title}" from your shelf`);
    } else {
      toast.success(`Added "${book.title}" to your shelf`);
    }
  };

  return (
    <div className="App font-sans">
      <Navbar ref={shelfRef} />
      <ScrollToTop />

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
          <Route path="/news" element={<BookNewsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
      </main>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={handleClose} onFav={handleFav} />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#5a3e1b",
            color: "#fffbea",
            padding: "12px 20px",
            fontWeight: 500,
            fontSize: "0.95rem",
          },
          success: { iconTheme: { primary: "#2d8a1a", secondary: "#fffbea" } },
          error: { iconTheme: { primary: "#b81f1f", secondary: "#fffbea" } },
        }}
      />
    </div>
  );
}

export default App;
