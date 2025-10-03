// --------------- Footer.jsx ---------------
// Footer with 3 main sections (About, Support, Follow Us)
// Includes social media icons and copyright

import React from "react";
import '../styles/footer.css'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top container with 3 sections */}
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Bookify is your personal book discovery platform. Explore thousands of books, read online, and save your favorites.
            From classics and bestsellers to hidden gems, Bookify makes finding your next great read simple and enjoyable.
          </p>
        </div>

        {/* Support Section (links) */}
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Social / Follow Section */}
        <div className="footer-section follow">
          <h3>Follow Us</h3>
          <p>Stay connected and discover your next favorite book! Follow Bookify for reading inspiration, book updates, and more.</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        <p>© Copyright 2025 Bookify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
