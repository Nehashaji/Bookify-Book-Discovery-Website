import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookModal from "./components/BookModal";
import HomePage from "./pages/HomePage";       
import DiscoverPage from "./pages/DiscoverPage";
import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // ✅ Create ref for "My Shelf" link
  const shelfRef = useRef(null);

  const handleView = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  const handleFav = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });

    if (selectedBook && selectedBook.id === book.id) {
      setSelectedBook({ ...book, fav: !favorites.some((b) => b.id === book.id) });
    }
  };

  return (
    <div className="App font-sans">
      {/* ✅ Pass shelfRef as prop */}
      <Navbar ref={shelfRef} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage onView={handleView} onFav={handleFav} shelfRef={shelfRef} />}
          />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </main>

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
