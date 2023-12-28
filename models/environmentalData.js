const db = require('../config/db');
const dataUpload = require('../models/dataUpload');

const incrementUserScore = (userId) => {
  const updateScoreSql = 'UPDATE users SET score = score + 1 WHERE user_id = ?';
  const updateScoreValues = [userId];

  db.query(updateScoreSql, updateScoreValues, (err) => {
    if (err) {
      console.error('Error updating user score:', err);
    }
  });
};
const getSourceIdByName = async (sourceName) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT source_id FROM data_sources WHERE source_name = ?';
    const values = [sourceName];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error fetching source_id:', err);
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results[0].source_id);
        } else {
          reject(new Error(`Source ID not found for source name: ${sourceName}`));
        }
      }
    });
  });
};


const environmentalData = {
  create: async (data, userId, callback) => {
    const {
      source_name,
      air_quality,
      temperature,
      humidity,
      water_quality,
      biodiversity_metrics,
      location_lat,
      location_lon,
      file_url,
    } = data;

    if (!source_name && !file_url) {
      const errorMessage = 'Either source_name or file_url is required.';
      return callback(new Error(errorMessage), null, errorMessage);
    }

    let sourceId;

    if (source_name) {
      try {
        sourceId = await getSourceIdByName(source_name);
      } catch (err) {
        console.error('Invalid source_name.');
        return callback(err, null, 'Invalid source_name');
      }

      if (!sourceId) {
        const errorMessage = 'Invalid source_name.';
        return callback(new Error(errorMessage), null, errorMessage);
      }
    }


    const sql = `
      INSERT INTO environmental_data 
        (source_id, air_quality, temperature, humidity, water_quality, biodiversity_metrics, location_lat, location_lon, file_url, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      sourceId || null,
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
        return callback(err, null, 'Error creating environmental data record');
      }
      const insertedId = result.insertId;
      incrementUserScore(userId);
      callback(null, insertedId, 'Environmental data created successfully');
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

module.exports = environmentalData;
