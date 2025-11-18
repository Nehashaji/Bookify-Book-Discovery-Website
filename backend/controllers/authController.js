const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/User");
const generateToken = require("../utils/jwt"); 
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
    if (!user && email) {
      user = await User.findOne({ email });
    }

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
