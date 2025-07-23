const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicationDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Publication', PublicationSchema);