// --------------- BookModal.jsx ---------------
// Modal component to show detailed information about a book
// Fully controlled by parent props: book data, close function, and favorite toggle
// Designed to be reusable and responsive

import React from "react";
import "../styles/BookModal.css"; // Import modal-specific styles
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa"; // Icons for favorite & rating

// Props:
// - book: object containing book details (title, author, image, rating, etc.)
// - onClose: function to close the modal
// - onFav: function to toggle favorite state in parent component
const BookModal = ({ book, onClose, onFav }) => {
  // If no book data is provided, it don't render anything
  if (!book) return null;

  // show if the book is favorited
  const isFav = book.fav || false;

  // function to handle favorite button click
  const handleFavClick = () => {
    onFav(book); // Call parent's function to toggle favorite state
  };

  return (
    // Overlay behind the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal container, stop propagation to prevent closing when clicking inside */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Modal main content */}
        <div className="modal-content">

          {/*Left Side: Book Cover + Favorite Button*/}
          <div className="modal-left">
            {/* Book cover image */}
            <img
              src={book.image || "https://via.placeholder.com/200x300"}
              alt={book.title}
              className="modal-cover"
            />

            {/* Favorite toggle button */}
            <button
              className={`fav-btn ${isFav ? "added" : ""}`} // "added" class if already favorited
              onClick={handleFavClick}
            >
              {isFav 
                ? <><FaHeart /> Added to Favorites</> 
                : <><FaRegHeart /> Add to Favorites</>}
            </button>
          </div>

          {/*  Right Side: Book Details */}
          <div className="modal-right">
            {/* Title and author */}
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">{book.author}</p>

            {/* Metadata (rank, publisher, weeks on list, etc.) */}
            <div className="meta-row">
              {book.rank && <span className="meta-item">🏆 Rank: {book.rank}</span>}
              {book.rank_last_week && <span className="meta-item">Last Week: {book.rank_last_week}</span>}
              {book.weeks_on_list && <span className="meta-item">Weeks on List: {book.weeks_on_list}</span>}
              {book.publisher && <span className="meta-item">Publisher: {book.publisher}</span>}
            </div>

            {/* Rating */}
            {book.rating && (
              <div className="meta-row">
                <span className="meta-item">
                  <FaStar style={{ color: "#e3b341" }} /> {book.rating}/5
                </span>
              </div>
            )}

            {/* Book description */}
            <div className="modal-description">
              {book.description || "No description available."}
            </div>

            {/* Preview link */}
            {book.previewLink && (
              <a
                href={book.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
              >
                📖 Preview Book
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
