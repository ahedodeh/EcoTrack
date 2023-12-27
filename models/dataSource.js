const db = require('../config/db');

exports.createDataSource = (sourceName, sourceType, callback) => {
  const checkDuplicateQuery = 'SELECT COUNT(*) AS count FROM data_sources WHERE source_name = ?';
  const checkDuplicateValues = [sourceName];

  db.query(checkDuplicateQuery, checkDuplicateValues, (checkErr, checkResult) => {
    if (checkErr) {
      return callback({ status: 500, message: 'Internal server error' });
    }

    if (checkResult[0].count > 0) {
      return callback({ status: 409, message: 'Source name is already in use' });
    }

    const insertQuery = 'INSERT INTO data_sources (source_name, source_type) VALUES (?, ?)';
    const insertValues = [sourceName, sourceType];

    db.query(insertQuery, insertValues, (insertErr, insertResult) => {
      if (insertErr) {
        return callback({ status: 500, message: 'Internal server error' });
      }

      return callback({ status: 201, message: 'Data source created successfully' });
    });
  });
};

exports.getDataSource = (sourceName, callback) => {
  const sql = 'SELECT * FROM data_sources WHERE source_name = ?';
  const values = [sourceName];

  db.query(sql, values, (err, results) => {
    if (err) {
      return callback({ status: 500, message: 'Internal server error' });
    }

    if (results.length > 0) {
      return callback({ status: 200, message: results[0] });
    } else {
      return callback({ status: 404, message: 'Data Source not found' });
    }
  });
};

exports.deleteDataSource = (sourceName, callback) => {
  const checkExistenceQuery = 'SELECT COUNT(*) AS count FROM data_sources WHERE source_name = ?';
  const checkExistenceValues = [sourceName];

  db.query(checkExistenceQuery, checkExistenceValues, (checkErr, checkResult) => {
    if (checkErr) {
      return callback({ status: 500, message: 'Internal server error' });
    }

    if (checkResult[0].count > 0) {
      const deleteQuery = 'DELETE FROM data_sources WHERE source_name = ?';
      const deleteValues = [sourceName];

      db.query(deleteQuery, deleteValues, (deleteErr, deleteResult) => {
        if (deleteErr) {
          return callback({ status: 500, message: 'Internal server error' });
        }

        return callback({ status: 200, message: 'Data Source deleted successfully' });
      });
    } else {
      return callback({ status: 404, message: 'Data Source not found' });
    }
  });
};


exports.updateDataSource = (sourceID, sourceName, sourceType, callback) => {
  const checkDuplicateQuery = 'SELECT COUNT(*) AS count FROM data_sources WHERE source_name = ? AND source_name != ?';
  const checkDuplicateValues = [sourceName, sourceID];

  db.query(checkDuplicateQuery, checkDuplicateValues, (checkErr, checkResult) => {
    if (checkErr) {
      return callback({ status: 500, message: 'Internal server error' });
    }

    if (checkResult[0].count > 0) {
      return callback({ status: 409, message: 'New source name is already in use' });
    }

    const updateQuery = 'UPDATE data_sources SET source_name = ?, source_type = ? WHERE source_name = ?';
    const updateValues = [sourceName, sourceType, sourceID];

    db.query(updateQuery, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        return callback({ status: 500, message: 'Internal server error' });
      }

      return callback({ status: 200, message: 'Data source updated successfully' });
    });
  });
};

