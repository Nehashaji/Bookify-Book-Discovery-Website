import React from "react";
import "../styles/SignUpPage.css";
import { FcGoogle } from "react-icons/fc";
import { FiBookOpen, FiHeart, FiGlobe } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import Footer from "../components/Footer";

const SignUpPage = () => {
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-box">
          {/* LEFT — INFO */}
          <div className="signup-left">
            <div className="info-content">
              <h1>
                Welcome to <span>Bookify</span>
              </h1>
              <p>
                Discover new stories, explore your favorite genres, and stay
                updated with the latest in the world of books.
              </p>
              <ul>
                <li>
                  <FiBookOpen className="icon" /> Explore and search books easily
                </li>
                <li>
                  <FiHeart className="icon" /> Add your favorite reads to your collection
                </li>
                <li>
                  <FiGlobe className="icon" /> Read book news & trending articles
                </li>
                <li>
                  <FaPalette className="icon" /> Filter books by genres you love
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="signup-right">
            <div className="form-container">
              <h2 className="form-title">Create Your Account</h2>

              <form className="signup-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Create a password" />
                </div>

                <button type="submit" className="signup-btn">
                  Sign Up
                </button>

                <div className="divider">or</div>

                <button type="button" className="google-btn">
                  <FcGoogle size={22} /> Sign up with Google
                </button>

                <p className="login-text">
                  Already have an account? <a href="/login">Login</a>
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

export default SignUpPage;