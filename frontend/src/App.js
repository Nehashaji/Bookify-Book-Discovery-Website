import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

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

import { useAuth } from "./context/AuthContext";

import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const shelfRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedFavorites = Array.from(
          new Map(
            res.data.favorites.map((f) => [
              f.bookId,
              {
                ...f,
                id: f.bookId,
                fav: true,
                image: f.image || f.cover || f.coverUrl || "",
              },
            ])
          ).values()
        );

        setFavorites(formattedFavorites);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleView = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  const handleFav = async (book) => {
    const bookId = book.id || book._id;
    const exists = favorites.some((b) => b.id === bookId);

    try {
      const token = localStorage.getItem("token");

      if (exists) {
        await axios.delete(`http://localhost:5000/api/favorites/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites((prev) => prev.filter((b) => b.id !== bookId));

        if (selectedBook && (selectedBook.id || selectedBook._id) === bookId) {
          setSelectedBook({ ...selectedBook, fav: false });
        }

        toast.dismiss();
        toast.error(`Removed "${book.title}" from your shelf`);
      } else {
        const bookImage = book.cover || book.image || book.coverUrl || "";

        await axios.post(
          "http://localhost:5000/api/favorites",
          {
            bookId,
            title: book.title,
            author: book.author,
            image: bookImage,
            previewLink: book.previewLink,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const newFav = {
          ...book,
          id: bookId,
          fav: true,
          image: bookImage,
        };

        setFavorites((prev) => [
          ...prev.filter((b) => b.id !== bookId),
          newFav,
        ]);

        if (selectedBook && (selectedBook.id || selectedBook._id) === bookId) {
          setSelectedBook({ ...selectedBook, fav: true });
        }

        toast.dismiss();
        toast.success(`Added "${book.title}" to your shelf`);
      }
    } catch (err) {
      console.error("Failed to update favorites:", err);
      toast.error("Failed to update favorites.");
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
          <Route path="/admin" element={<AdminPanel noLayout />} />
        </Routes>
      </main>

      {selectedBook && (
        <BookModal
          book={{
            ...selectedBook,
            fav: favorites.some(
              (f) => f.id === selectedBook._id || f.id === selectedBook.id
            ),
          }}
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