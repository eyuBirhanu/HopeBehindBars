const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createMessage, getMessages, updateMessageStatus, deleteMessage } = require('../controllers/messageController');

router.route('/').post(createMessage);

router.route('/admin').get(protect, getMessages);
router.route('/admin/:id').put(protect, updateMessageStatus).delete(protect, deleteMessage);

module.exports = router;