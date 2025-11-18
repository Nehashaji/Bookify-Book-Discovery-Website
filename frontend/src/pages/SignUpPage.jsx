import React, { useState } from "react";
import "../styles/SignUpPage.css";
import { FcGoogle } from "react-icons/fc";
import { FiBookOpen, FiHeart, FiGlobe } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = "http://localhost:5000/auth";

const SignUpPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup`, form);
      toast.success(res.data.message);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google-signup`, { token: credentialResponse.credential });
      toast.success("Signed up with Google!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      toast.error(err.response?.data?.error || "Google signup failed");
    }
  };

  const handleGoogleSignUpFailure = () => {
    toast.error("Google signup failed");
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-wrapper">
        <div className="signup-box">
          <div className="signup-left">
            <div className="info-content">
              <h1>Welcome to <span>Bookify</span></h1>
              <p>Discover new stories, explore your favorite genres, and stay updated with the latest in the world of books.</p>
              <ul>
                <li><FiBookOpen className="icon" /> Explore and search books easily</li>
                <li><FiHeart className="icon" /> Add your favorite reads to your collection</li>
                <li><FiGlobe className="icon" /> Read book news & trending articles</li>
                <li><FaPalette className="icon" /> Filter books by genres you love</li>
              </ul>
            </div>
          </div>

          <div className="signup-right">
            <div className="form-container">
              <h2 className="form-title">Create Your Account</h2>
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" required />
                </div>
                <button type="submit" className="signup-btn">Sign Up</button>
              </form>

              <div className="divider">or</div>
              <GoogleLogin
                onSuccess={handleGoogleSignUpSuccess}
                onError={handleGoogleSignUpFailure}
              />

              <p className="login-text">Already have an account? <a href="/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;