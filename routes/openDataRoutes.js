const express = require('express');
const EnvironmentalDataController = require('../controllers/openDataController');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.get('/data', authenticateUser, EnvironmentalDataController.getAllData);
router.get('/data/location/:location', authenticateUser, EnvironmentalDataController.getDataByLocation);
router.get('/data/paginated/:page/:pageSize', authenticateUser, EnvironmentalDataController.getPaginatedData);
router.get('/data/sorted/:sortBy', authenticateUser, EnvironmentalDataController.getSortedData);
router.get('/data/filtered/:filterBy/:filterValue', authenticateUser, EnvironmentalDataController.getFilteredData);
router.get('/data/median/:attribute', authenticateUser, EnvironmentalDataController.getMedianValue);
router.get('/data/mode/:attribute', authenticateUser, EnvironmentalDataController.getMode);
router.get('/data/count', authenticateUser, EnvironmentalDataController.getCount);

module.exports = router;