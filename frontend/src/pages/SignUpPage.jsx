import React, { useState } from "react";
import "../styles/SignUpPage.css";
import { FiBookOpen, FiHeart, FiGlobe } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/auth";

/* SignUpPage Component
 * Provides the user interface and functional logic for registering new users.
 * Supports email/password registration as well as Google OAuth signup.
 */
const SignUpPage = () => {
  // State object to manage input values for name, email, and password
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Extract login method from AuthContext to update authentication state after signup
  const { login } = useAuth();

  // React Router's navigate function to redirect users after successful signup
  const navigate = useNavigate();

  /* handleChange
   * Dynamically updates the form state as the user types into the input fields
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /** handleSubmit
   * Handles submission of the registration form using email and password.
   * Sends a POST request to the backend signup API endpoint.
   * On success, updates authentication context, shows a success notification,
   * resets the form fields, and redirects the user to the homepage.
   * Displays error notifications if signup fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup`, form);

      // Store authentication token and user data in React context
      // and optionally persist in localStorage for page refresh persistence
      login(res.data.token, res.data.user);

      toast.success("Signed up successfully!");
      setForm({ name: "", email: "", password: "" });

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  /**
   * handleGoogleSignUpSuccess
   * Handles successful user registration via Google OAuth.
   * Sends the Google credential token to the backend for verification and user creation.
   * Updates the authentication context upon successful registration.
   * @param {Object} credentialResponse - Credential response object from Google OAuth
   */
  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google-signup`, {
        token: credentialResponse.credential,
      });

      // Persist authenticated user state after Google signup
      login(res.data.token, res.data.user);

      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google signup failed");
    }
  };

  /*handleGoogleSignUpFailure
   * Displays a notification in case Google OAuth signup fails
   */
  const handleGoogleSignUpFailure = () => {
    toast.error("Google signup failed");
  };

  return (
    <>
      {/* ToastContainer enables real-time notifications to be displayed */}
      <ToastContainer />

      {/* Main wrapper for the signup page */}
      <div className="signup-wrapper">
        <div className="signup-box">

          {/* Left informational panel describing features  */}
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
                <li><FiBookOpen className="icon" /> Explore and search books easily</li>
                <li><FiHeart className="icon" /> Add your favorite reads to your collection</li>
                <li><FiGlobe className="icon" /> Read book news & trending articles</li>
                <li><FaPalette className="icon" /> Filter books by genres you love</li>
              </ul>
            </div>
          </div>

          {/* Right panel containing the signup form */}
          <div className="signup-right">
            <div className="form-container">
              <h2 className="form-title">Create Your Account</h2>

              {/* Email/password signup form */}
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                {/* Submit button triggers handleSubmit */}
                <button type="submit" className="signup-btn">
                  Sign Up
                </button>
              </form>

              {/* Divider for alternative signup methods */}
              <div className="divider">or</div>

              {/* Google OAuth signup button */}
              <GoogleLogin
                onSuccess={handleGoogleSignUpSuccess}
                onError={handleGoogleSignUpFailure}
              />

              {/* Link for users who already have an account */}
              <p className="login-text">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
};

export default SignUpPage;