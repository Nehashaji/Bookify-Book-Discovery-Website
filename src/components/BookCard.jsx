// --------------- BookCard.jsx ---------------
// A reusable card component for displaying individual books
// Shows book cover, title, author, rating, favorite button, and a View Details button
// Designed to work with parent component callbacks for favorite and modal view

import React from "react";
import "../styles/BookCard.css"; // Import CSS for styling the card
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa"; // Icons for rating & favorite

// Props: 
// - book: object containing book details (title, author, image, rating, fav)
// - onView: function to open book details modal
// - onFav: function to toggle favorite state
const BookCard = ({ book, onView, onFav }) => {
  return (
    <div className="book-card">
      
      {/* Top Row: Rating & Favorite */}
      <div className="card-top-row">
        
        {/* Display book rating */}
        <span className="book-rating">
          <FaStar className="star-icon" /> {book.rating || "N/A"} 
          {/* If no rating is provided, show 'N/A' */}
        </span>

        {/* Favorite button */}
        <button
          className={`heart-btn ${book.fav ? "active" : ""}`} // Active class if book is favorited
          onClick={() => onFav(book)} // Calls parent function to toggle favorite
          aria-label={book.fav ? "Remove from favorites" : "Add to favorites"} // Accessibility
        >
          {book.fav ? <FaHeart /> : <FaRegHeart />}
          {/* Filled heart if favorite, outlined heart if not */}
        </button>
      </div>

      {/* Book Cover  */}
      <div 
        className="cover-wrap" 
        onClick={() => onView && onView(book)} // Open modal when cover clicked
      >
        <img
          src={book.image || "https://via.placeholder.com/200x300?text=No+Image"} 
          alt={book.title} 
          className="book-cover"
        />
        {/* Display book image, fallback placeholder if no image */}
      </div>

      {/* Book Info */}
      <div 
        className="card-info" 
        onClick={() => onView && onView(book)} // Open modal when info clicked
      >
        <h3 className="book-title">{book.title}</h3> 
        {/* Book title */}
        <p className="book-author">{book.author}</p> 
        {/* Author name */}
      </div>

      {/* Actions  */}
      <div className="card-actions">
        <button
          className="view-btn"
          onClick={() => onView && onView(book)} // Open modal when button clicked
        >
          View Details
        </button>
      </div>

    </div>
  );
};

export default BookCard;
