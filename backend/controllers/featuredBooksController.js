//  Controller for Featured Books 
import FeaturedBook from "../models/FeaturedBook.js";

// GET all books
// Fetches all featured books from the database, sorted by 'order' ascending
export const getBooks = async (req, res) => {
  try {
    const books = await FeaturedBook.find().sort({ order: 1 });
    res.json(books); // Return the books as JSON
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// POST a new book
// Adds a new featured book to the database
export const addBook = async (req, res) => {
  try {
    // Determine order based on existing number of books
    const count = await FeaturedBook.countDocuments();

    // Create new book document, including order
    const newBook = new FeaturedBook({ ...req.body, order: count });

    // Save to database
    const savedBook = await newBook.save();

    // Respond with created book
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// PUT update book
// Updates an existing featured book by its ID
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await FeaturedBook.findByIdAndUpdate(
      req.params.id, // book ID from route
      req.body,      // new data from request body
      { new: true }  // return the updated document
    );

    res.json(updatedBook); // Respond with updated book
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE a book
// Removes a featured book by ID
export const deleteBook = async (req, res) => {
  try {
    await FeaturedBook.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Server Error" });
  }
};