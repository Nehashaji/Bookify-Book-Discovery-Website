import React, { useState, useEffect, forwardRef } from "react";
import { FaBars, FaTimes, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = forwardRef((props, shelfRef) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Prevent layout shift when modal/menu opens
  useEffect(() => {
    if (menuOpen || modalOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [menuOpen, modalOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleLogin = () => { setMenuOpen(false); navigate("/login"); };
  const handleSignup = () => { setMenuOpen(false); navigate("/signup"); };
  const handleLogout = () => { logout(); setModalOpen(false); navigate("/"); };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src={require("../assets/logo.png")} alt="Bookify Logo" className="logo-img" />
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/favorites" ref={shelfRef}>My Shelf</Link></li>
        <li><Link to="/news">Book Insights</Link></li>
      </ul>

      {/* Auth / Avatar */}
      <div className="nav-auth">
        {!user ? (
          <>
            <button className="login" onClick={handleLogin}>Log in</button>
            <button className="signup" onClick={handleSignup}>Sign up</button>
          </>
        ) : (
          <div className="avatar" onClick={toggleModal}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/discover" onClick={toggleMenu}>Discover</Link></li>
          <li><Link to="/favorites" onClick={toggleMenu}>My Shelf</Link></li>
          <li><Link to="/news" onClick={toggleMenu}>Book Insights</Link></li>
        </ul>
        <div className="mobile-auth">
          {!user ? (
            <>
              <button className="login" onClick={handleLogin}>Log in</button>
              <button className="signup" onClick={handleSignup}>Sign up</button>
            </>
          ) : (
            <div className="avatar" onClick={toggleModal}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {modalOpen && user && (
        <div className="profile-modal-backdrop" onClick={toggleModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>

            {/* Top Section */}
            <div className="profile-header">
              <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div>
                <h3 className="profile-name">{user.name}</h3>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>

            {/* Middle Section */}
            <div className="profile-actions">
              <button onClick={() => navigate("/favorites")}><FaBook /> My Shelf</button>
            </div>

            {/* Bottom Section */}
            <div className="profile-logout">
              <button onClick={handleLogout}>Log out</button>
            </div>

          </div>
        </div>
      )}

    </nav>
  );
});

export default Navbar;
