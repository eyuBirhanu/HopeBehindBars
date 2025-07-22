const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const {
  getPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication
} = require('../controllers/publicationController');

// Configure multer to use Cloudinary storage.
// It will expect a single file from a form field named 'image'.
const upload = multer({ storage });

// Route for getting all publications (public) and creating one (protected)
router.route('/')
  .get(getPublications)
  .post(protect, upload.single('image'), createPublication);

// Routes for a single publication: get, update, and delete (all protected except get)
router.route('/:id')
  .get(getPublicationById) // Useful for pre-filling the edit form
  .put(protect, upload.single('image'), updatePublication)
  .delete(protect, deletePublication);

module.exports = router;