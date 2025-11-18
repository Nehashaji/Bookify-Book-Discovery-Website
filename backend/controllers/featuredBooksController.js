const FeaturedBook = require("../models/FeaturedBook");

// GET all books
const getBooks = async (req, res) => {
  try {
    const books = await FeaturedBook.find().sort({ order: 1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// POST new book
const addBook = async (req, res) => {
  try {
    const count = await FeaturedBook.countDocuments();
    const newBook = new FeaturedBook({ ...req.body, order: count });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// PUT update book
const updateBook = async (req, res) => {
  try {
    const updatedBook = await FeaturedBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    await FeaturedBook.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getBooks, addBook, updateBook, deleteBook };