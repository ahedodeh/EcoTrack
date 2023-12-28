const { admin } = require('../config/firebaseAdmin');

const saveEnvironmentalAlert = async (message) => {
  try {
    const alertRef = admin.database().ref('alerts').push();
    const timestamp = Date.now();

    await alertRef.set({ message, timestamp });
    console.log('Environmental alert saved successfully');
  } catch (error) {
    console.error('Error saving environmental alert:', error);
    throw error;
  }
};

module.exports = {
  saveEnvironmentalAlert,
};
