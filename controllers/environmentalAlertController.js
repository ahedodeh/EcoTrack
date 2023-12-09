const EnvironmentalAlert = require('../models/environmentalAlert');
const EnvironmentalData = require('../models/environmentalData');

const checkAndGenerateAlerts = async () => {
  try {
    // Fetch environmental data from the "environmental_data" table
    const environmentalData = await EnvironmentalData.fetchData();
    console.log(environmentalData);
    environmentalData.forEach((data) => {
      const { source_id, air_quality, temperature, humidity } = data;

      // Example threshold checks
      const userThresholds = {
        airQualityThreshold: 50, // Example threshold value for air quality
        temperatureThreshold: 30, // Example threshold value for temperature
        humidityThreshold: 60, // Example threshold value for humidity
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

      // Add more threshold checks as per your requirements
    });
  } catch (error) {
    // Handle error appropriately
    console.error('Error generating alerts:', error);
  }
};

module.exports = {
  checkAndGenerateAlerts,
};
