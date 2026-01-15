import React from "react";
import "../styles/BookCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

/**
 * BookCard Component
 * Displays individual book information with rating, cover image,
 * view details button, and favorite (heart) functionality.
 */
const BookCard = ({ 
  book,              // Book object containing title, author, image, rating, fav status
  onView,            // Function to open/view book details
  onFav,             // Function to add/remove book from favorites
  shelfRef,          // Reference to the shelf icon (used for animation)
  isLoggedIn,         // Boolean to check if user is logged in
  showLoginPrompt,   // Function to show login popup if user is not logged in
}) => {

  /*Handles click on the favorite (heart) button*/
  const handleFavClick = (e) => {
    e.stopPropagation(); // Prevents triggering card click events

    // If user is not logged in, shows login prompt and stop
    if (!isLoggedIn) {
      showLoginPrompt && showLoginPrompt();
      return;
    }

    // If book is already in favorites, remove it directly
    if (book.fav) {
      onFav(book);
      return;
    }

    // Getting the book cover image element for animation
    const bookEl = e.currentTarget
      .closest(".book-card")
      ?.querySelector("img");

    // If image or shelf reference is missing, add favorite without animation
    if (!bookEl || !shelfRef?.current) {
      onFav(book);
      return;
    }

    // Getting position of book image and shelf for animation movement
    const bookRect = bookEl.getBoundingClientRect();
    const shelfRect = shelfRef.current.getBoundingClientRect();

    // Creating a clone of the book image for animation
    const clone = bookEl.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = `${bookRect.top}px`;
    clone.style.left = `${bookRect.left}px`;
    clone.style.width = `${bookRect.width}px`;
    clone.style.height = `${bookRect.height}px`;
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;

    // Adding animated clone to the DOM
    document.body.appendChild(clone);

    // Animates the clone moving towards the shelf
    requestAnimationFrame(() => {
      clone.style.top = `${shelfRect.top}px`;
      clone.style.left = `${shelfRect.left}px`;
      clone.style.width = "40px";
      clone.style.height = "60px";
      clone.style.opacity = 0.5;
    });

    // Once animation ends:
    clone.addEventListener("transitionend", () => {
      clone.remove();      // Remove animated clone
      onFav(book);         // Add book to favorites

      // Adding glow effect to shelf
      if (shelfRef?.current) {
        shelfRef.current.classList.add("shelf-glow");
        setTimeout(
          () => shelfRef.current.classList.remove("shelf-glow"),
          500
        );
      }
    });
  };

  return (
    <div className="book-card">
      
      {/* Top row containing rating and favorite button */}
      <div className="card-top-row">
        <span className="book-rating">
          <FaStar className="star-icon" /> {book.rating || "N/A"}
        </span>

        {/* Favorite (heart) button */}
        <button
          className={`heart-btn ${book.fav ? "active" : ""}`}
          onClick={handleFavClick}
          aria-label={book.fav ? "Remove from favorites" : "Add to favorites"}
        >
          {book.fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Book cover image - clickable to view details */}
      <div className="cover-wrap" onClick={() => onView && onView(book)}>
        <img
          src={
            book.image ||
            book.cover ||
            "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={book.title}
          className="book-cover"
        />
      </div>

      {/* Book title and author section */}
      <div className="card-info" onClick={() => onView && onView(book)}>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>

      {/* View details button */}
      <div className="card-actions">
        <button className="view-btn" onClick={() => onView && onView(book)}>
          View Details
        </button>
      </div>

    </div>
  );
};

export default BookCard;