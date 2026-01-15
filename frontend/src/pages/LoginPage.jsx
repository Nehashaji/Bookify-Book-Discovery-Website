import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineRead, AiOutlineFilter } from "react-icons/ai";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/auth";

/* LoginPage Component
 * Provides the user interface and functionality for user authentication.
 * Supports standard email/password login as well as Google OAuth login.
 * Integrates animations using AOS and real-time notifications using react-toastify.
 */
const LoginPage = () => {
  // State object to manage form inputs for email and password
  const [form, setForm] = useState({ email: "", password: "" });

  // Extract login method from AuthContext to update authentication state
  const { login } = useAuth();

  // React Router navigate function to programmatically redirect users
  const navigate = useNavigate();

  /*useEffect Hook: Initializes AOS library for scroll-based animations
   * Ensures animations are triggered only once per element appearance
   */
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /*handleChange
   * Updates form state dynamically as the user types into input fields*/
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /** handleSubmit
   * Handles submission of login form via email/password.
   * Sends POST request to backend authentication API.
   * On success, updates authentication context and navigates to homepage.
   * Displays toast notifications for both success and error scenarios.*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, form);

      // Store token and user data in context and localStorage
      login(res.data.token, res.data.user);

      toast.success("Login successful!");
      setForm({ email: "", password: "" });

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  /**
   * handleGoogleLoginSuccess
   * Handles authentication when a user successfully logs in via Google OAuth.
   * Sends the Google credential token to the backend for verification.
   * Updates authentication context on successful login.
   * @param {Object} credentialResponse - Credential response from Google OAuth
   */
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google-login`, {
        token: credentialResponse.credential,
      });

      login(res.data.token, res.data.user);

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    }
  };

  /**
   * handleGoogleLoginFailure
   * Displays an error toast notification if Google login fails
   */
  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed");
  };

  return (
    <>
      {/* ToastContainer displays real-time notifications */}
      <ToastContainer />

      {/* Main login wrapper */}
      <div className="login-wrapper">
        <div className="login-box">

          {/* Left informational panel with app features */}
          <div className="login-left">
            <div className="info-content" data-aos="fade-right">
              <h1>
                Welcome Back to <span>Bookify</span>
              </h1>
              <p>Continue your journey of stories, ideas, and imagination.</p>
              <ul>
                <li><AiOutlineSearch size={20} /> Explore and search books easily</li>
                <li><AiOutlineHeart size={20} /> Add your favorite reads to your collection</li>
                <li><AiOutlineRead size={20} /> Read book news & trending articles</li>
                <li><AiOutlineFilter size={20} /> Filter books by genres you love</li>
              </ul>
            </div>
          </div>

          {/* Right panel containing login form */}
          <div className="login-right" data-aos="fade-left">
            <div className="form-container">
              <h2 className="form-title">Login to Your Account</h2>

              {/* email/password login form */}
              <form className="login-form" onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Submit button triggers handleSubmit */}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>

              {/* Divider for alternative login methods */}
              <div className="divider">or</div>

              {/* Google OAuth login button */}
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />

              {/* Link to navigate to signup page */}
              <p className="signup-text">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Sign Up
                </Link>
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

export default LoginPage;