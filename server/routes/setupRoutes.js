const express = require('express');
const router = express.Router();
const { seedAdminUsers } = require('../controllers/setupController');

// This creates the route: GET /api/setup/run-seeder
router.get('/run-seeder', seedAdminUsers);

module.exports = router;