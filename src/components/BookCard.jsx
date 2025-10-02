// --------------- BookCard.jsx ---------------
// A reusable card component for displaying individual books
// Shows book cover, title, author, rating, favorite button, and a View Details button
// Designed to work with parent component callbacks for favorite and modal view
import React from "react";
import "../styles/BookCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const BookCard = ({ book, onView, onFav, shelfRef }) => {
  const handleFavClick = (e) => {
    if (book.fav) {
      onFav(book);
      return;
    }

    const bookEl = e.currentTarget.closest(".book-card").querySelector("img");
    if (!bookEl || !shelfRef?.current) return;

    const bookRect = bookEl.getBoundingClientRect();
    const shelfRect = shelfRef.current.getBoundingClientRect();

    // Clone the book image
    const clone = bookEl.cloneNode(true);
    clone.style.position = "fixed"; // fly over everything
    clone.style.top = bookRect.top + "px";
    clone.style.left = bookRect.left + "px";
    clone.style.width = bookRect.width + "px";
    clone.style.height = bookRect.height + "px";
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;
    document.body.appendChild(clone);

    // Animate clone to shelf
    requestAnimationFrame(() => {
      clone.style.top = shelfRect.top + "px";
      clone.style.left = shelfRect.left + "px";
      clone.style.width = "40px";
      clone.style.height = "60px";
      clone.style.opacity = 0.5;
    });

    // When animation ends
    clone.addEventListener("transitionend", () => {
      clone.remove();
      onFav(book); // mark favorite

      // Added glow effect to shelf link
      if (shelfRef?.current) {
        shelfRef.current.classList.add("shelf-glow");
        setTimeout(() => {
          shelfRef.current.classList.remove("shelf-glow");
        }, 500); // match animation duration
      }
    });
  };

  return (
    <div className="book-card">
      <div className="card-top-row">
        <span className="book-rating">
          <FaStar className="star-icon" /> {book.rating || "N/A"}
        </span>

        <button
          className={`heart-btn ${book.fav ? "active" : ""}`}
          onClick={handleFavClick}
          aria-label={book.fav ? "Remove from favorites" : "Add to favorites"}
        >
          {book.fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="cover-wrap" onClick={() => onView && onView(book)}>
        <img
          src={book.image || "https://via.placeholder.com/200x300?text=No+Image"}
          alt={book.title}
          className="book-cover"
        />
      </div>

      <div className="card-info" onClick={() => onView && onView(book)}>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>

      <div className="card-actions">
        <button className="view-btn" onClick={() => onView && onView(book)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
