const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import our configured storage
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ storage });

const {
    createGalleryItem,
    getGalleryItems,
    getGalleryItemById,
    updateGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');

router.route('/')
    .get(getGalleryItems)
    .post(protect, upload.array('images', 10), createGalleryItem);

router.route('/:id')
    .get(getGalleryItemById)
    .put(protect, upload.array('images', 10), updateGalleryItem)
    .delete(protect, deleteGalleryItem);

module.exports = router;