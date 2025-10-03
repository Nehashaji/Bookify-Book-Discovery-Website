import React from "react";
import Hero from "../components/Hero";
import PopularBooks from "../components/PopularBooks";
import TrendingGenres from "../components/TrendingGenres";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const HomePage = ({ onView, onFav, shelfRef, favorites }) => {
  return (
    <div>
      <Hero />
      <PopularBooks 
        onView={onView} 
        onFav={onFav} 
        shelfRef={shelfRef} 
        favorites={favorites}  
      />
      <TrendingGenres onView={onView} onFav={onFav} />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
