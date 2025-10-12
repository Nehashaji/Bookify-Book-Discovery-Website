import React, { useState, useEffect, forwardRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = forwardRef((props, shelfRef) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const handleSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/favorites" ref={shelfRef}>My Shelf</Link></li>
        <li><Link to="/news">Book Insights</Link></li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="nav-auth">
        <button className="login" onClick={handleLogin}>Log in</button>
        <button className="signup" onClick={handleSignup}>Sign up</button>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/discover" onClick={() => setMenuOpen(false)}>Discover</Link></li>
          <li><Link to="/favorites" onClick={() => setMenuOpen(false)}>My Shelf</Link></li>
          <li><Link to="/news" onClick={() => setMenuOpen(false)}>Book Insights</Link></li>
        </ul>
        <div className="mobile-auth">
          <button className="login" onClick={handleLogin}>Log in</button>
          <button className="signup" onClick={handleSignup}>Sign up</button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
