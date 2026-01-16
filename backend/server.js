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
    origin: process.env.FRONTEND_URL, 
    credentials: true, // Allow cookies and auth headers
  })
);

/* Database Connection */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

/* Root Endpoint */
app.get("/", (req, res) => res.send("Bookify API is running..."));

/* Server Startup */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
