import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookModal from "./components/BookModal";
import HomePage from "./pages/HomePage";       // Home page
import DiscoverPage from "./pages/DiscoverPage";
import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // --- Handlers ---
  const handleView = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  // Toggle favorite
  const handleFav = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });

    // Update modal state if currently open
    if (selectedBook && selectedBook.id === book.id) {
      setSelectedBook({ ...book, fav: !favorites.some((b) => b.id === book.id) });
    }
  };

  return (
    <div className="App font-sans">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={<HomePage onView={handleView} onFav={handleFav} />}
          />

          {/* Discover Page */}
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </main>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleClose}
          onFav={handleFav}
          favorites={favorites}
        />
      )}
    </div>
  );
}

export default App;
