const express = require('express');
const SustainabilityScoreController = require('../controllers/sustainabilityScoreController');
const { authenticateUser } = require('../middleware/authentication');  

const router = express.Router();

router.get('/user-score', authenticateUser, SustainabilityScoreController.getUserScore);
router.get('/top-three-scores', SustainabilityScoreController.getTopThreeScores);

module.exports = router;
