require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// Models
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/auth");
const favRoutes = require("./routes/favorites");
const featuredRoutes = require("./routes/featuredBooksRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Passport Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id }) || await User.findOne({ email: profile.emails[0].value });
      if (!user) user = await User.create({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName, avatar: profile.photos[0].value });
      if (!user.googleId) { user.googleId = profile.id; await user.save(); }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }
));

// Routes
app.use("/auth", authRoutes);
app.use("/api/favorites", favRoutes);
app.use("/api/featured", featuredRoutes);

// JWT-Protected endpoint
app.get("/api/user/me", async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
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

// Root
app.get("/", (req, res) => res.send("Bookify API is running with Google OAuth..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));