import React, { useState, useEffect, forwardRef } from "react";
import { FaBars, FaTimes, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

/*Navbar Component
 * This component represents the main navigation bar of the website.
 * It provides:
 * - Page navigation links
 * - Authentication actions 
 * - Responsive behaviour for mobile and desktop views
 * - Access to the user's profile and bookshelf
 * 
 * forwardRef is used to pass a reference to the "My Shelf" link,
 * enabling animation interactions from other components.
 */
const Navbar = forwardRef((props, shelfRef) => {

  // Controls whether the mobile hamburger menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Controls visibility of the user profile modal
  const [modalOpen, setModalOpen] = useState(false);

  // Enables navigation between routes
  const navigate = useNavigate();

  // Retrieves authenticated user data and logout function
  const { user, logout } = useAuth();

  /*useEffect handles body scroll locking when either
   * the mobile menu or profile modal is open.
   * This improves user experience by preventing background scrolling
   * and avoids layout shift caused by scrollbar removal.*/
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

  // Toggles the mobile navigation menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Toggles the profile modal visibility
  const toggleModal = () => setModalOpen((prev) => !prev);

  /*Navigation handlers ensure menus are closed before redirecting the user.*/
  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const handleSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    setModalOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Application Logo linking back to the homepage */}
      <div className="nav-logo">
        <Link to="/">
          <img
            src={require("../assets/logo.png")}
            alt="Bookify Logo"
            className="logo-img"
          />
        </Link>
      </div>

      {/* Desktop navigation links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/discover">Discover</Link></li>

        {/* Shelf link receives ref for animation usage */}
        <li><Link to="/favorites" ref={shelfRef}>My Shelf</Link></li>

        <li><Link to="/news">Book Insights</Link></li>
      </ul>

      {/* Authentication section */}
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

      {/* Hamburger icon for mobile navigation */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile navigation menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/discover" onClick={toggleMenu}>Discover</Link></li>
          <li><Link to="/favorites" onClick={toggleMenu}>My Shelf</Link></li>
          <li><Link to="/news" onClick={toggleMenu}>Book Insights</Link></li>
        </ul>

        {/* Mobile authentication actions */}
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

      {/* User profile modal */}
      {modalOpen && user && (
        <div
          className="profile-modal-backdrop"
          onClick={toggleModal}
        >
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Profile header displaying user identity */}
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="profile-name">{user.name}</h3>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>

            {/* Quick navigation actions */}
            <div className="profile-actions">
              <button onClick={() => navigate("/favorites")}>
                <FaBook /> My Shelf
              </button>
            </div>

            {/* Logout action */}
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