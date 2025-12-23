import React from "react";
import "../styles/BookCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const BookCard = ({
  book,
  onView,
  onFav,
  shelfRef,
  isLoggedIn,
  showLoginPrompt,
}) => {
  const handleFavClick = (e) => {
    e.stopPropagation();

    // Not logged in → show login/signup modal
    if (!isLoggedIn) {
      showLoginPrompt && showLoginPrompt();
      return;
    }

    // Remove from favorites (no animation)
    if (book.fav) {
      onFav(book);
      return;
    }

    // Add to favorites with animation
    const bookEl = e.currentTarget
      .closest(".book-card")
      ?.querySelector("img");

    if (!bookEl || !shelfRef?.current) {
      onFav(book);
      return;
    }

    const bookRect = bookEl.getBoundingClientRect();
    const shelfRect = shelfRef.current.getBoundingClientRect();

    const clone = bookEl.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = `${bookRect.top}px`;
    clone.style.left = `${bookRect.left}px`;
    clone.style.width = `${bookRect.width}px`;
    clone.style.height = `${bookRect.height}px`;
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = `${shelfRect.top}px`;
      clone.style.left = `${shelfRect.left}px`;
      clone.style.width = "40px";
      clone.style.height = "60px";
      clone.style.opacity = 0.5;
    });

    clone.addEventListener("transitionend", () => {
      clone.remove();
      onFav(book);

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
          src={
            book.image ||
            book.cover ||
            "https://via.placeholder.com/200x300?text=No+Image"
          }
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
