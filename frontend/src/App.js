import React, { useState, useRef, useEffect } from "react";
// Import routing utilities for page navigation
import { Routes, Route } from "react-router-dom";
// Import toast notifications for user feedback
import { Toaster, toast } from "react-hot-toast";
// Import axios for HTTP requests to the backend
import axios from "axios";
// Import shared layout and utility components
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BookModal from "./components/BookModal";
// Import application pages
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import FavoritesPage from "./pages/FavouritesPage";
import BookNewsPage from "./pages/BookNewsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
// Import authentication context to access logged-in user
import { useAuth } from "./context/AuthContext";
// Import styles
import "./App.css";

function App() {
  // Stores the currently selected book for modal display
  const [selectedBook, setSelectedBook] = useState(null);

  // Stores the user's favorite books
  const [favorites, setFavorites] = useState([]);

  // Reference used for scrolling to the shelf section
  const shelfRef = useRef(null);

  // Gets the authenticated user from context
  const { user } = useAuth();

  // Fetch user's favorites whenever the user logs in or changes
  useEffect(() => {
    const fetchFavorites = async () => {
      // Exits if user is not logged in
      if (!user) return;

      try {
        // Retrieve JWT token from local storage
        const token = localStorage.getItem("token");
        if (!token) return;

        // Request favorites from backend API
        const res = await axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Normalize favorites and remove duplicates using Map
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

        // Update favorites state
        setFavorites(formattedFavorites);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  // Opens book modal
  const handleView = (book) => setSelectedBook(book);

  // Closes book modal
  const handleClose = () => setSelectedBook(null);

  // Adds or remove a book from favorites
  const handleFav = async (book) => {
    // Determines book ID format
    const bookId = book.id || book._id;

    // Checks if book already exists in favorites
    const exists = favorites.some((b) => b.id === bookId);

    // Retrieves authentication token
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Removes book from favorites
      if (exists) {
        await axios.delete(`http://localhost:5000/api/favorites/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Updates local favorites state
        setFavorites((prev) => prev.filter((b) => b.id !== bookId));

        // Update modal state if open
        if (selectedBook && (selectedBook.id || selectedBook._id) === bookId) {
          setSelectedBook({ ...selectedBook, fav: false });
        }

        toast.dismiss();
        toast.error(`Removed "${book.title}" from your shelf`);
      } 
      // Adds book to favorites
      else {
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

        // Creates a new favorite object
        const newFav = {
          ...book,
          id: bookId,
          fav: true,
          image: bookImage,
        };

        // Ensures no duplicates are added
        setFavorites((prev) => [
          ...prev.filter((b) => b.id !== bookId),
          newFav,
        ]);

        // Updates modal state if open
        if (selectedBook && (selectedBook.id || selectedBook._id) === bookId) {
          setSelectedBook({ ...selectedBook, fav: true });
        }

        toast.dismiss();
        toast.success(`Added "${book.title}" to your shelf`);
      }
    } catch (err) {
      console.error("Failed to update favorites:", err);

      // Shows error toast for server or network issues
      if (!err.response || err.response.status >= 500) {
        toast.error("Failed to update favorites. Please try again.");
      }
    }
  };

  return (
    <div className="App font-sans">
      {/* Top navigation bar */}
      <Navbar ref={shelfRef} />

      {/* Automatically scroll to top on route change */}
      <ScrollToTop />

      {/* Main application content */}
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

      {/* Book detail modal */}
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

      {/* toast notification*/}
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