const express = require("express");
const router = express.Router();
const FeaturedBook = require("../models/FeaturedBook");

// GET all featured books
router.get("/", async (req, res) => {
  try {
    const books = await FeaturedBook.find().sort({ order: 1 });
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new featured book
router.post("/", async (req, res) => {
  try {
    const count = await FeaturedBook.countDocuments();
    const newBook = new FeaturedBook({ ...req.body, order: count });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await FeaturedBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    await FeaturedBook.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;