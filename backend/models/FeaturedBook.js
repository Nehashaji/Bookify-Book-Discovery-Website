const mongoose = require("mongoose");

const FeaturedBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model("FeaturedBook", FeaturedBookSchema);