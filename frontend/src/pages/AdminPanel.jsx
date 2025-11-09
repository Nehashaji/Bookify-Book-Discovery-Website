import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/adminpanel.css";

const API_URL = "http://localhost:5000/api/featured-books";

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    cover: "",
    description: "",
    rating: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data.sort((a, b) => a.order - b.order));
    } catch {
      toast.error("Failed to load featured books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or edit book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        toast.success("Book updated!");
      } else {
        await axios.post(API_URL, form);
        toast.success("Book added!");
      }
      setForm({ title: "", author: "", cover: "", description: "", rating: "" });
      setEditingId(null);
      fetchBooks();
    } catch {
      toast.error("Operation failed. Check inputs.");
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      cover: book.cover,
      description: book.description,
      rating: book.rating || ""
    });
    setEditingId(book._id);
    toast.info("Edit mode enabled.");
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Book deleted!");
      fetchBooks();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="admin-page">
      <ToastContainer />

      {/* Form Section */}
      <div className="form-section">
        <h2>{editingId ? "Edit Featured Book" : "Add New Featured Book"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Book Title" value={form.title} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author Name" value={form.author} onChange={handleChange} required />
          <input type="text" name="cover" placeholder="Cover Image URL" value={form.cover} onChange={handleChange} required />
          <textarea name="description" placeholder="Book Description" value={form.description} onChange={handleChange} required />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0–5)"
            value={form.rating}
            min="0"
            max="5"
            step="0.1"
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update Book" : "Add Book"}</button>
        </form>
      </div>

      {/* Featured Books */}
      <div className="books-section">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.cover} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="desc">{book.description}</p>
                <p className="rating">⭐ {book.rating ? book.rating.toFixed(1) : "N/A"}</p>
              </div>
              <div className="book-actions">
                <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
