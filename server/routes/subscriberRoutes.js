const express = require('express');
const router = express.Router();
const { addSubscriber, getSubscribers, deleteSubscribers } = require('../controllers/subscriberController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', addSubscriber); // Public
router.get('/', protect, getSubscribers); // Protected
router.delete('/', protect, deleteSubscribers); // Protected

module.exports = router;