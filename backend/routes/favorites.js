const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ favorites: user.favorites || [] });
});

router.post("/", authMiddleware, async (req, res) => {
  const { bookId, title, author, image, previewLink } = req.body;
  if (!bookId) return res.status(400).json({ message: "Book ID is required" });

  const user = await User.findById(req.user._id);
  if (user.favorites.some(f => f.bookId === bookId))
    return res.status(400).json({ message: "Book already in favorites" });

  user.favorites.push({ bookId, title, author, image, previewLink });
  await user.save();
  res.json({ message: "Book added to favorites", favorites: user.favorites });
});

router.delete("/:bookId", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.favorites = user.favorites.filter(f => f.bookId !== req.params.bookId);
  await user.save();
  res.json({ message: "Book removed", favorites: user.favorites });
});

module.exports = router;