// src/pages/LoginPage.jsx
import React, { useEffect } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineRead, AiOutlineFilter } from "react-icons/ai";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="login-wrapper">
        <div className="login-box">
          {/* LEFT — INFO */}
          <div className="login-left">
            <div className="info-content" data-aos="fade-right">
              <h1>Welcome Back to <span>Bookify</span></h1>
              <p>Continue your journey of stories, ideas, and imagination.</p>
              <ul>
                <li><AiOutlineSearch size={20} /> Explore and search books easily</li>
                <li><AiOutlineHeart size={20} /> Add your favorite reads to your collection</li>
                <li><AiOutlineRead size={20} /> Read book news & trending articles</li>
                <li><AiOutlineFilter size={20} /> Filter books by genres you love</li>
              </ul>
            </div>
          </div>

          {/* RIGHT — LOGIN FORM */}
          <div className="login-right" data-aos="fade-left">
            <div className="form-container">
              <h2 className="form-title">Login to Your Account</h2>

              <form className="login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" className="login-btn">Login</button>

                <p className="signup-text">
                  Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
