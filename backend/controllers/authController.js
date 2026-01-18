const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const generateToken = require("../utils/jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// SIGNUP
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GOOGLE SIGNUP
const googleSignup = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    let user = await User.findOne({ googleId });
    if (!user && email) user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ googleId, email, name, avatar });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const jwtToken = generateToken(user._id);
    res.json({ user, token: jwtToken });
  } catch (err) {
    console.error("Google signup error:", err);
    res.status(400).json({ message: "Google signup failed" });
  }
};

// GOOGLE LOGIN 
const googleLogin = googleSignup;

module.exports = { signup, login, googleSignup, googleLogin };