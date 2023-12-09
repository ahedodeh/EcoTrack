const { admin } = require('../config/firebaseAdmin');

const saveEnvironmentalAlert = async (userId, message) => {
  try {
    const alertRef = admin.database().ref('alerts').push();
    const timestamp = Date.now();

    await alertRef.set({ userId, message, timestamp });
    console.log('Environmental alert saved successfully');
  } catch (error) {
    console.error('Error saving environmental alert:', error);
    throw error;
  }
};

const fetchEnvironmentalAlerts = async (userId) => {
  try {
    const snapshot = await admin.database().ref('alerts').orderByChild('userId').equalTo(userId).once('value');
    const alerts = [];

    snapshot.forEach((childSnapshot) => {
      alerts.push(childSnapshot.val());
    });

    return alerts;
  } catch (error) {
    console.error('Error fetching environmental alerts:', error);
    throw error;
  }
};

module.exports = {
  saveEnvironmentalAlert,
  fetchEnvironmentalAlerts,
};
