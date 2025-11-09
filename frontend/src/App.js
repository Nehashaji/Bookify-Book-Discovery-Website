import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BookModal from "./components/BookModal";

import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import FavoritesPage from "./pages/FavouritesPage";
import BookNewsPage from "./pages/BookNewsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";

import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const shelfRef = useRef(null);

  // Opens Book Modal
  const handleView = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  // Add/Remove from Favorites
  const handleFav = (book) => {
    const bookId = book.id || book._id; 
    const exists = favorites.some((b) => b.id === bookId);
    const newFavorites = exists
      ? favorites.filter((b) => b.id !== bookId)
      : [...favorites, { ...book, id: bookId }];

    setFavorites(newFavorites);

    if (selectedBook && (selectedBook.id || selectedBook._id) === bookId) {
      setSelectedBook({ ...selectedBook, fav: !exists });
    }

    toast.dismiss();
    toast[exists ? "error" : "success"](
      `${exists ? "Removed" : "Added"} "${book.title}" ${exists ? "from" : "to"} your shelf`
    );
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
          <Route path="/admin" element={<AdminPanel noLayout />} />
        </Routes>
      </main>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}  
          onClose={handleClose}
          onFav={handleFav}
        />
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