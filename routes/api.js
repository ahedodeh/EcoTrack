const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, this is your EcoTrack API!');
});

module.exports = router;
