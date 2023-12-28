const db = require('../config/db');

class SustainabilityScore {
  static getUserScore(userId, callback) {
    const sql = 'SELECT score FROM users WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        const userScore = results.length > 0 ? results[0].score : 0;
        callback(null, { user_id: userId, score: userScore });
      }
    });
  }

  static getTopScores(limit, callback) {
    const sql = 'SELECT username, score FROM users ORDER BY score DESC LIMIT ?';
    db.query(sql, [limit], callback);
  }

  static getLowestScores(limit, callback) {
    const sql = 'SELECT username, score FROM users ORDER BY score ASC LIMIT ?';
    db.query(sql, [limit], callback);
  }
}

module.exports = SustainabilityScore;
