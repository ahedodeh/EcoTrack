const SustainabilityScore = require('../models/sustainabilityScore');

exports.getUserScore = (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(500).json({ error: 'User ID not available' });
  }

  SustainabilityScore.getUserScore(userId, (err, score) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json({ userId, score });
  });
};


exports.getTopThreeScores = (req, res) => {
  SustainabilityScore.getTopScores(3, (err, topScores) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(topScores);
    }
  });
};
