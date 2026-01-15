// Load environment variables from .env file
require("dotenv").config();

// Import libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Import database models
const User = require("./models/User");

// Import route handlers
const authRoutes = require("./routes/auth");
const favRoutes = require("./routes/favorites");
const featuredRoutes = require("./routes/featuredBooksRoutes");

// Initialize Express application
const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Parse cookies attached to incoming requests
app.use(cookieParser());

// Enable CORS for frontend communication
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend origin
    credentials: true, // Allow cookies and auth headers
  })
);

/* Database Connection */
// Connect to MongoDB using connection string from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* API Routes */
// Authentication routes (login, signup, Google OAuth)
app.use("/auth", authRoutes);

// User favorites management routes
app.use("/api/favorites", favRoutes);

// Featured books routes for homepage content
app.use("/api/featured", featuredRoutes);

/* Protected User Route */
// Fetch currently authenticated user using JWT
app.get("/api/user/me", async (req, res) => {
  // Extract Authorization header
  const authHeader = req.headers.authorization || "";

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  // Reject request if no token is provided
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Verify token and decode payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Finding user by ID and exclude password field
    const user = await User.findById(payload.id).select("-password");

    // Handle case where user no longer exists
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return authenticated user data
    res.json({ user });
  } catch (err) {
    console.error(err);

    // Handle invalid or expired token
    res.status(401).json({ message: "Invalid token" });
  }
});

/* Root Endpoint */
// Basic API health check route
app.get("/", (req, res) => res.send("Bookify API is running..."));

/* Server Startup */
// Define server port
const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);