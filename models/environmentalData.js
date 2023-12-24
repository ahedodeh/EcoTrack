const db = require('../config/db');

const incrementUserScore = (userId) => {
  const updateScoreSql = 'UPDATE users SET score = score + 1 WHERE user_id = ?';
  const updateScoreValues = [userId];

  db.query(updateScoreSql, updateScoreValues, (err) => {
    if (err) {
      console.error('Error updating user score:', err);
    }
  });
};

const environmental_data = {
  create: (data, userId, callback) => {
    const {
      source_id,
      air_quality,
      temperature,
      humidity,
      water_quality,
      biodiversity_metrics,
      location_lat,
      location_lon,
      file_url,
    } = data;

    const sql = `
      INSERT INTO environmental_data 
        (source_id, air_quality, temperature, humidity, water_quality, biodiversity_metrics, location_lat, location_lon, file_url, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      source_id || null,
      air_quality || null,
      temperature || null,
      humidity || null,
      water_quality || null,
      biodiversity_metrics || null,
      location_lat || null,
      location_lon || null,
      file_url || null,
      userId,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating environmental data record:', err);
        return callback(err, null);
      }
      const insertedId = result.insertId;
      // Increment user's score here if needed
      incrementUserScore(userId);
      callback(null, insertedId);
    });
  },
  
  findById: (data_id, callback) => {
    const sql = 'SELECT * FROM environmental_data WHERE data_id = ?';
    const values = [data_id];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error fetching environmental data record:', err);
        return callback(err, null);
      }
      if (results.length > 0) {
        const environmental_data = results[0];
        callback(null, environmental_data);
      } else {
        callback(null, null);
      }
    });
  },

  update: (data_id, newData, callback) => {
    const {
      air_quality,
      temperature,
      humidity,
      water_quality,
      biodiversity_metrics,
      location_lat,
      location_lon,
      file_url,
    } = newData;

    const sql = `
      UPDATE environmental_data
      SET air_quality = ?, temperature = ?, humidity = ?, water_quality = ?, biodiversity_metrics = ?, location_lat = ?, location_lon = ?, file_url = ?
      WHERE data_id = ?
    `;
    const values = [air_quality, temperature, humidity, water_quality, biodiversity_metrics, location_lat, location_lon, file_url, data_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating environmental data record:', err);
        return callback(err, null);
      }
      callback(null, result.affectedRows > 0);
    });
  },

  deleteById: (data_id, callback) => {
    const sql = 'DELETE FROM environmental_data WHERE data_id = ?';
    const values = [data_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error deleting environmental data record:', err);
        return callback(err, null);
      }
      callback(null, result.affectedRows > 0);
    });
  },
    fetchData: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM environmental_data';
      db.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject(new Error('Error executing database query: ' + err.message));
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = environmental_data;
