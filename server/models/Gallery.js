const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required.'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required.'] 
  },
  category: { 
    type: String, 
    required: [true, 'Category is required.'] 
  },
  imageUrls: [{ 
    type: String, 
    required: true 
  }],
  eventDate: {
    type: Date,
    required: [true, 'Event date is required.']
  },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);