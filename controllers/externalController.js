const ecoTrackModel = require('../models/external');

const ecoTrackController = {
  getWeather: async (req, res, next) => {
    try {
      const { city, country } = req.query;
      const weatherData = await ecoTrackModel.getWeatherData(city, country);
      res.json(weatherData);
    } catch (error) {
      next(error);
    }
  },

  getOpenWeatherMapData: async (req, res, next) => {
    try {
      const { city, country } = req.query;
      const openWeatherMapData = await ecoTrackModel.getOpenWeatherMapData(city, country);
      res.json(openWeatherMapData);
    } catch (error) {
      next(error);
    }
  },

  getAirQualityDataByZipCode: async (req, res, next) => {
    try {
      const { zipCode } = req.query;
      const airQualityData = await ecoTrackModel.getAirQualityDataByZipCode(zipCode);
      res.json(airQualityData);
    } catch (error) {
      next(error);
    }
  },

  getUVIndexData: async (req, res, next) => {
    try {
      const { latitude, longitude } = req.query;
      const uvIndexData = await ecoTrackModel.getUVIndexData(latitude, longitude);
      res.json(uvIndexData);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ecoTrackController;
