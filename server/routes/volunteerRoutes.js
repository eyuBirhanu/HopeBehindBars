const express = require('express');
const router = express.Router();
const { 
    submitApplication, 
    getApplications, 
    updateApplicationStatus, 
    deleteApplications 
} = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitApplication);

router.get('/', protect, getApplications);

router.put('/status', protect, updateApplicationStatus);

router.delete('/', protect, deleteApplications);


module.exports = router;