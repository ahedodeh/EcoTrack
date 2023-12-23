const admin = require('firebase-admin');
const serviceAccount = require('../ecotrack-f6a21-firebase-adminsdk-l4hzg-6791a5d0ce.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecotrack-f6a21-default-rtdb.firebaseio.com/',
});

const db = admin.database();

module.exports = { admin, db };
