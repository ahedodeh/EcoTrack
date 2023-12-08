const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/externalController');

router.get('/weather', weatherController.getWeather);
router.get('/openweathermap', weatherController.getOpenWeatherMapData);

router.get('/airquality/zipcode/:zipCode', weatherController.getAirQualityDataByZipCode);
//http://localhost:3000/api/external/airquality/zipcode/20002

router.get('/uvindex', weatherController.getUVIndexData);


module.exports = router;