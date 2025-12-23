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

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, form);

      // ✅ IMPORTANT CHANGE
      login(res.data.token, res.data.user);

      toast.success("Login successful!");
      setForm({ email: "", password: "" });

      navigate("/"); // redirect after login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google-login`, {
        token: credentialResponse.credential,
      });

      // ✅ IMPORTANT CHANGE
      login(res.data.token, res.data.user);

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed");
  };

  return (
    <>
      <ToastContainer />
      <div className="login-wrapper">
        <div className="login-box">
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

          <div className="login-right" data-aos="fade-left">
            <div className="form-container">
              <h2 className="form-title">Login to Your Account</h2>

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

                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>

              <div className="divider">or</div>

              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />

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
      <Footer />
    </>
  );
};

export default LoginPage;
