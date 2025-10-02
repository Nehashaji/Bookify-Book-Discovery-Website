// --------------- WhyChooseUs.jsx ---------------
// Section explaining the benefits of choosing Bookify
// Split layout: text on the left, image on the right

import React from "react";
import '../styles/whychoose.css'; // Import styles 
import whyImage from "../assets/why-choose-us.png"; // image

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-split">
      <div className="container split-container">
        
        {/* Left side: Text content (with AOS fade-right animation) */}
        <div className="why-text" data-aos="fade-right">
          <h2>Why Choose Bookify?</h2>
          <p> 
            Bookify brings thousands of books to your fingertips, making it easy to discover, read, and save your favorite stories. 
            Whether you’re searching for a classic novel, a bestseller, or something new, our platform helps you explore with ease. 
            Enjoy a clean, intuitive interface designed to make your reading experience simple, engaging, and truly enjoyable.
          </p>
        </div>

        {/* Right side: Image (with AOS fade-left animation) */}
        <div className="why-image" data-aos="fade-left">
          <img src={whyImage} alt="Why Choose Bookify" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
