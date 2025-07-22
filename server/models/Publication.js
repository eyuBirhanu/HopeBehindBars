const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // This will store the secure URL from Cloudinary for the photo
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  // This automatically adds `createdAt` and `updatedAt` fields
  timestamps: true 
});

module.exports = mongoose.model('Publication', PublicationSchema);