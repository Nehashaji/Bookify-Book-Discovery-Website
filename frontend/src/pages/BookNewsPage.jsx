import React, { useState, useEffect } from "react";
import "../styles/bookNews.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer"; 
const BookNewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GUARDIAN_API_KEY = "b8e6d908-f1ad-4983-8f49-21013a7a4c6b";

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchBookNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const safeQuery = "children OR literature OR novels OR authors";
        const res = await fetch(
          `https://content.guardianapis.com/search?section=books&q=${encodeURIComponent(
            safeQuery
          )}&show-fields=trailText,byline,thumbnail,shortUrl&order-by=newest&page-size=12&api-key=${GUARDIAN_API_KEY}`
        );
        const data = await res.json();

        if (!data.response || !data.response.results) {
          setArticles([]);
          return;
        }

        const formattedArticles = data.response.results.map((item) => ({
          id: item.id,
          title: item.webTitle,
          link: item.webUrl,
          description: item.fields?.trailText || "No description available",
          author: item.fields?.byline || "Unknown Author",
          image: item.fields?.thumbnail || "https://via.placeholder.com/300x200?text=Book",
        }));

        setArticles(formattedArticles);
      } catch (err) {
        console.error("Error fetching book news:", err);
        setError("Failed to fetch book news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookNews();
  }, []);

  return (
    <div className="book-news-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>Book News & Blogs</h1>
          <p>Stay updated with the latest articles, reviews, and insights from the world of literature.</p>
        </div>
      </section>

      {/* News/Articles Section */}
      <section className="book-news-section">
        {loading && <p className="loading-text">Loading book news...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && articles.length === 0 && (
          <p className="no-articles">No book articles found.</p>
        )}

        <div className="news-grid">
          {articles.map((article) => (
            <div key={article.id} className="news-card" data-aos="fade-up">
              <img src={article.image} alt={article.title} className="news-thumbnail" />
              <h3 className="news-title">{article.title}</h3>
              <p className="news-author">{article.author}</p>
              <p
                className="news-description"
                dangerouslySetInnerHTML={{ __html: article.description }}
              ></p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookNewsPage;
