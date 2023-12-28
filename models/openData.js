const db = require('../config/db');

class EnvironmentalData {
  static getAll(callback) {
    const sql = 'SELECT * FROM environmental_data';
    db.query(sql, callback);
  }

  static getByLocation(location, callback) {
    const sql = 'SELECT * FROM environmental_data WHERE location = ?';
    const values = [location];
    db.query(sql, values, callback);
  }

  static getPaginatedData(page, pageSize, callback) {
    const offset = (page - 1) * pageSize;
    const sql = 'SELECT * FROM environmental_data LIMIT ? OFFSET ?';
    const values = [parseInt(pageSize), offset];
    db.query(sql, values, callback);
  }

  static getSortedData(sortBy, callback) {
    const sql = `SELECT * FROM environmental_data ORDER BY ${sortBy}`;
    db.query(sql, callback);
  }

  static getFilteredData(filterBy, filterValue, callback) {
    const sql = `SELECT * FROM environmental_data WHERE ${filterBy} = ?`;
    const values = [filterValue];
    db.query(sql, values, callback);
  }

  static getMedianValue(attribute, callback) {
  const sql = `SELECT ${attribute} FROM environmental_data ORDER BY ${attribute} ASC`;
  db.query(sql, (err, rows) => {
    if (err) {
      return callback(err, null);
    }

    const values = rows.map(row => row[attribute]);
    const length = values.length;
    const middle = Math.floor(length / 2);

    if (length % 2 === 0) {
      // even
      const mid1 = values[middle - 1];
      const mid2 = values[middle];
      const median = (mid1 + mid2) / 2;
      callback(null, median);
    } else {
      // odd
      const median = values[middle];
      callback(null, median);
    }
  });
}



  static getMode(attribute, callback) {
    this.getAll((err, data) => {
      if (err) {
        return callback(err, null);
      }

      const valueCounts = data.reduce((counts, record) => {
        const value = record[attribute];
        counts[value] = (counts[value] || 0) + 1;
        return counts;
      }, {});

      const mode = Object.entries(valueCounts).reduce((mode, [value, count]) => {
        if (mode === null || count > mode.count) {
          return { value, count };
        }
        return mode;
      }, null);

      callback(null, mode ? mode.value : null);
    });
  }

  static getCount(callback) {
    const sql = 'SELECT COUNT(*) AS count FROM environmental_data';
    db.query(sql, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0].count);
      }
    });
  }

}

function calculateAverage(data, attribute) {
  const total = data.reduce((sum, record) => sum + record[attribute], 0);
  return total / data.length;
}


module.exports = EnvironmentalData;
