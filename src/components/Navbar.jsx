// ------------- Navbar.jsx --------------
// Responsive navigation bar component for Bookify
// Includes logo, links, auth buttons, and mobile hamburger menu
import React, { useState, useEffect, forwardRef } from "react";
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

// Forward ref to pass shelf link reference to parent
const Navbar = forwardRef((props, shelfRef) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogin = () => console.log("Log in clicked");
  const handleSignup = () => console.log("Sign up clicked");

  return (
    <nav className="navbar" data-aos="fade-down">
      {/* Logo */}
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
        {/* Attached the forwarded ref to My Shelf */}
        <li><a href="#" ref={shelfRef}>My Shelf</a></li>
        <li><a href="#">Profile</a></li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="nav-auth">
        <button className="login" onClick={handleLogin}>Log in</button>
        <button className="signup" onClick={handleSignup}>Sign up</button>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Discover</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Favorites</a></li>
          <li><a href="#" onClick={() => setMenuOpen(false)}>Profile</a></li>
        </ul>
        <div className="mobile-auth">
          <button
            className="login"
            onClick={() => { handleLogin(); setMenuOpen(false); }}
          >
            Log in
          </button>
          <button
            className="signup"
            onClick={() => { handleSignup(); setMenuOpen(false); }}
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
