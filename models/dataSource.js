// dataSource.js (model)
const db = require('../config/db');

exports.createDataSource = (sourceName, sourceType, callback) => {
  const sql = 'INSERT INTO data_sources (source_name, source_type) VALUES (?, ?)';
  const values = [sourceName, sourceType];

  db.query(sql, values, callback);
};

exports.getDataSource = (sourceID, callback) => {
  const sql = 'SELECT * FROM data_sources WHERE source_id = ?';
  const values = [sourceID];

  db.query(sql, values, callback);
};

exports.updateDataSource = (sourceID, sourceName, sourceType, callback) => {
  const sql = 'UPDATE data_sources SET source_name = ?, source_type = ? WHERE source_id = ?';
  const values = [sourceName, sourceType, sourceID];

  db.query(sql, values, callback);
};

exports.deleteDataSource = (sourceID, callback) => {
  const sql = 'DELETE FROM data_sources WHERE source_id = ?';
  const values = [sourceID];

  db.query(sql, values, callback);
};
