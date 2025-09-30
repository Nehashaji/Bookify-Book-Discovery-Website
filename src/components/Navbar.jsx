// ------------- Navbar.jsx --------------
// Responsive navigation bar component for Bookify
// Includes logo, links, auth buttons, and mobile hamburger menu

import React, { useState, useEffect } from "react";
import "../styles/Navbar.css"; // Navbar styles
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons

const Navbar = () => {
  // State to track if mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open 
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Toggle menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Placeholder login/signup functions
  const handleLogin = () => console.log("Log in clicked");
  const handleSignup = () => console.log("Sign up clicked");

  return (
    <nav className="navbar" data-aos="fade-down">
      {/* Logo*/}
      <div className="nav-logo">
        <img 
          src={require("../assets/logo.png")} 
          alt="Bookify Logo" 
          className="logo-img" 
        />
      </div>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Discover</a></li>
        <li><a href="#">Favorites</a></li>
        <li><a href="#">Profile</a></li>
      </ul>

      {/*Desktop Auth Buttons  */}
      <div className="nav-auth">
        <button className="login" onClick={handleLogin}>Log in</button>
        <button className="signup" onClick={handleSignup}>Sign up</button>
      </div>

      {/*  Hamburger Menu Icon (Mobile) */}
      <div className="hamburger" onClick={toggleMenu}>
        {/* Show close icon if menu is open, else hamburger */}
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu*/}
      {/* Sliding menu that appears on mobile when hamburger is clicked */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* Mobile navigation links */}
        <ul>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Discover</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Favorites</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Profile</a></li>
        </ul>

        {/* Mobile auth buttons */}
        <div className="mobile-auth">
          <button
            className="login"
            onClick={() => { handleLogin(); setMenuOpen(false); }} // Close menu on click
          >
            Log in
          </button>
          <button
            className="signup"
            onClick={() => { handleSignup(); setMenuOpen(false); }} // Close menu on click
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
