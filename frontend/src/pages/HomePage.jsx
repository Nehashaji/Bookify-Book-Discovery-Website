import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import PopularBooks from "../components/PopularBooks";
import TrendingGenres from "../components/TrendingGenres";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/FeaturedBooks.css";
import { FaStar } from "react-icons/fa";

const HomePage = ({ onFav, shelfRef, favorites }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/featured");
      const booksWithImage = res.data.map((b) => ({
        ...b,
        image: b.cover || b.image || b.coverUrl || "",
      }));
      setFeaturedBooks(booksWithImage);
    } catch (err) {
      console.error("Error fetching featured books:", err);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleView = (book) => setSelectedBook(book);

  return (
    <div>
      <Hero />

      <PopularBooks
        onView={handleView}
        onFav={onFav}
        shelfRef={shelfRef}
        favorites={favorites}
      />

      <section className="featured-books-section" data-aos="fade-up">
        <div className="featured-header">
          <h2 className="section-title">
            <FaStar className="section-icon" /> Featured Books
          </h2>
        </div>

        {featuredBooks.length > 0 ? (
          <div className="carousel-wrapper">
            <button className="carousel-btn left" onClick={scrollLeft}>
              ❮
            </button>

            <div className="carousel-container" ref={scrollRef}>
              {featuredBooks.map((book) => {
                const isFav = favorites.some((f) => f.id === book._id);
                return (
                  <div
                    key={book._id}
                    className="book-card-wrapper"
                    data-aos="fade-up"
                  >
                    <BookCard
                      book={{
                        ...book,
                        fav: isFav,
                        image: book.image, 
                      }}
                      onView={handleView}
                      onFav={onFav}
                      favorites={favorites}
                      shelfRef={shelfRef}
                    />
                  </div>
                );
              })}
            </div>

            <button className="carousel-btn right" onClick={scrollRight}>
              ❯
            </button>
          </div>
        ) : (
          <p className="no-books-text">No featured books available yet.</p>
        )}
      </section>

      <TrendingGenres onView={handleView} onFav={onFav} />
      <WhyChooseUs />
      <CTASection />
      <Footer />

      {selectedBook && (
        <BookModal
          book={{
            ...selectedBook,
            fav: favorites.some(
              (f) => f.id === selectedBook._id || f.id === selectedBook.id
            ),
          }}
          onClose={() => setSelectedBook(null)}
          onFav={onFav}
        />
      )}
    </div>
  );
};

export default HomePage;
