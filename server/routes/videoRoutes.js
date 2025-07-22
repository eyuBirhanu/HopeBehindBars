const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { 
    getVideos, 
    createVideo,
    getVideoById,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController');

router.route('/').get(getVideos);

router.route('/').post(protect, createVideo);

router.route('/:id')
    .get(getVideoById)          
    .put(protect, updateVideo)  
    .delete(protect, deleteVideo);

module.exports = router;