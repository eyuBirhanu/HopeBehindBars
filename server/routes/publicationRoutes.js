const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { getPublications, getPublicationById, createPublication, updatePublication, deletePublication } = require('../controllers/publicationController');

const upload = multer({ storage });

router.route('/')
  .get(getPublications)
  .post(protect, upload.single('image'), createPublication);

router.route('/:id')
  .get(getPublicationById)
  .put(protect, upload.single('image'), updatePublication)
  .delete(protect, deletePublication);

module.exports = router;