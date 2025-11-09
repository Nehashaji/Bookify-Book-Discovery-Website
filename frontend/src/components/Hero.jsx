import React, { useEffect } from "react";
import "../styles/Hero.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; 

const Hero = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleExploreClick = () => {
    navigate("/discover");
  };

  return (
    <section className="hero">
      <div className="hero-content" data-aos="fade-up">
        <h1>
          Unlock Stories <span>That Stay With You</span>
        </h1>
        <p>
          From hidden gems to bestsellers, explore books that speak to you.
          Dive into your next adventure with Bookify.
        </p>
        <button className="hero-btn" onClick={handleExploreClick}>
          Explore Books
        </button>
      </div>
    </section>
  );
};

export default Hero;
