const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Use the same Cloudinary storage
const { protect } = require('../middleware/authMiddleware');
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const upload = multer({ storage });

router.route('/')
  .get(getBlogs)
  .post(protect, upload.single('image'), createBlog); 

router.route('/:id')
  .get(getBlogById)
  .put(protect, upload.single('image'), updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;