const EnvironmentalAlert = require('../models/environmentalAlert');
const EnvironmentalData = require('../models/environmentalData');

const checkAndGenerateAlerts = async (req, res) => {
  try {
    const environmentalData = await EnvironmentalData.fetchData();
    const alerts = [];

    environmentalData.forEach((data) => {
      const { data_id, air_quality, temperature, humidity } = data;

      const userThresholds = {
        airQualityThreshold: 50,
        temperatureThreshold: 30,
        humidityThreshold: 60,
      };

      if (air_quality > userThresholds.airQualityThreshold) {
        const message = `High air quality detected: ${air_quality}`;
        EnvironmentalAlert.saveEnvironmentalAlert(data_id, message);
        alerts.push({ data_id, message });
      }

      if (temperature > userThresholds.temperatureThreshold) {
        const message = `High temperature detected: ${temperature}`;
        EnvironmentalAlert.saveEnvironmentalAlert(data_id, message);
        alerts.push({ data_id, message });
      }

      if (humidity > userThresholds.humidityThreshold) {
        const message = `High humidity detected: ${humidity}`;
        EnvironmentalAlert.saveEnvironmentalAlert(data_id, message);
        alerts.push({ data_id, message });
      }
    });

    console.log('Alerts generated:');
    alerts.forEach((alert) => {
      console.log(`Data ID: ${alert.data_id}, Message: ${alert.message}`);
    });

    res.status(200).json({ message: 'Alerts generated successfully', alerts });
  } catch (error) {
    console.error('Error generating alerts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkAndGenerateAlerts,
};
