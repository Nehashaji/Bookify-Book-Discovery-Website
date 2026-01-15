// BookModal: Displays detailed info for a selected book in a popup/modal

import React from "react";
import "../styles/BookModal.css"; 
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa"; // Icons for favorites and rating

const BookModal = ({ book, onClose, onFav }) => {
  if (!book) return null; 

  const isFav = book.fav; // Determine if book is already in favorites

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Overlay click closes modal */}
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Prevents clicks inside modal from closing it */}
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          {/* Left side: book cover and favorite button */}
          <div className="modal-left">
            <img
              src={book.cover || book.image || "https://via.placeholder.com/200x300?text=No+Image"}
              alt={book.title}
              className="modal-cover"
            />
            <button
              className={`fav-btn ${isFav ? "added" : ""}`}
              onClick={() => onFav(book)}
            >
              {/* Conditional rendering: shows heart icon and text based on favorite status */}
              {isFav ? <><FaHeart /> Added to Favorites</> 
                      : <><FaRegHeart /> Add to Favorites</>}
            </button>
          </div>

          {/* Right side: book details */}
          <div className="modal-right">
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">{book.author}</p>

            {/* Meta info row: ranking, publisher, etc. */}
            <div className="meta-row">
              {book.rank && <span className="meta-item">🏆 Rank: {book.rank}</span>}
              {book.rank_last_week && <span className="meta-item">Last Week: {book.rank_last_week}</span>}
              {book.weeks_on_list && <span className="meta-item">Weeks on List: {book.weeks_on_list}</span>}
              {book.publisher && <span className="meta-item">Publisher: {book.publisher}</span>}
            </div>

            {/* Rating display with star icon */}
            {book.rating && (
              <div className="meta-row">
                <span className="meta-item">
                  <FaStar style={{ color: "#e3b341" }} /> {book.rating}/5
                </span>
              </div>
            )}

            {/* Description section */}
            <div className="modal-description">
              {book.description || "No description available."}
            </div>

            {/* External preview link */}
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