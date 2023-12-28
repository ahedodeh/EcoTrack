const express = require('express');
const EnvironmentalAlertController = require('../controllers/environmentalAlertController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();


router.post('/notificate',authenticateUser, EnvironmentalAlertController.checkAndGenerateAlerts);

module.exports = router;