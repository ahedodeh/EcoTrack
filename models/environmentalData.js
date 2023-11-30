const db = require('../config/db');

const environmental_data = {
  create: (data, callback) => {
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

    let sql = `
      INSERT INTO environmental_data (source_id, air_quality, temperature, humidity, water_quality, biodiversity_metrics, location_lat, location_lon, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating environmental data record:', err);
        return callback(err, null);
      }
      const insertedId = result.insertId;
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
};

module.exports = environmental_data;