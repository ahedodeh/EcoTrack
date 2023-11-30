
const express = require('express');
const router = express.Router();
const environmentalDataController = require('../controllers/environmentalDataContoller');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');

router.post('/environmental',authenticateUser, environmentalDataController.createEnvironmentalData);

router.get('/environmental/:data_id',authenticateUser, environmentalDataController.getEnvironmentalDataById);

router.put('/environmental/:data_id',authenticateUser, environmentalDataController.updateEnvironmentalData);

router.delete('/environmental/:data_id',authenticateUser, environmentalDataController.deleteEnvironmentalData);

module.exports = router;
