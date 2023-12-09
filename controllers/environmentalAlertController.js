const EnvironmentalAlert = require('../models/environmentalAlert');
const EnvironmentalData = require('../models/environmentalData');

const checkAndGenerateAlerts = async () => {
  try {
    const environmentalData = await EnvironmentalData.fetchData();
    console.log(environmentalData);
    environmentalData.forEach((data) => {
      const { source_id, air_quality, temperature, humidity } = data;

      const userThresholds = {
        airQualityThreshold: 50, 
        temperatureThreshold: 30, 
        humidityThreshold: 60, 
      };

      if (air_quality > userThresholds.airQualityThreshold) {
        EnvironmentalAlert.saveEnvironmentalAlert(source_id, 'High air quality detected');
      }

      if (temperature > userThresholds.temperatureThreshold) {
        EnvironmentalAlert.saveEnvironmentalAlert(source_id, 'High temperature detected');
      }

      if (humidity > userThresholds.humidityThreshold) {
        EnvironmentalAlert.saveEnvironmentalAlert(source_id, 'High humidity detected');
      }

    });
  } catch (error) {
    // Handle error appropriately
    console.error('Error generating alerts:', error);
  }
};

module.exports = {
  checkAndGenerateAlerts,
};
