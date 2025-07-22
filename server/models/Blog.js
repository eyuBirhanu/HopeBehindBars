const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  authorName: { type: String, required: true },
  authorLinkedin: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);