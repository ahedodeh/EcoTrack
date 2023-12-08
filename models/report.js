const db = require('../config/db');

const CommunityReport = {
  create: (reportData) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO community_reports SET ?';
      db.query(sql, reportData, (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Error executing database query: ' + err.message));
        } else {
          // Assuming the user ID is part of the reportData
          const userId = reportData.user_id;

          const scoreSql = 'UPDATE users SET score = score + 1 WHERE user_id = ?';
          db.query(scoreSql, [userId], (err) => {
            if (err) {
              console.error(err);
              reject(new Error('Error updating user score: ' + err.message));
            } else {
              console.log('User score updated successfully.');
              resolve(result.insertId);
            }
          });
        }
      });
    });
  },

  findById: (reportId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM community_reports WHERE report_id = ?';
      db.query(sql, [reportId], (err, results) => {
        if (err) {
          console.error(err);
          reject(new Error('Error executing database query: ' + err.message));
        } else {
          if (results.length === 0) {
            resolve(null); 
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  },

  update: (reportId, reportData) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE community_reports SET ? WHERE report_id = ?';
      db.query(sql, [reportData, reportId], (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Error executing database query: ' + err.message));
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (reportId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM community_reports WHERE report_id = ?';
      db.query(sql, [reportId], (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Error executing database query: ' + err.message));
        } else {
          resolve(result);
        }
      });
    });
  },

findByUserId: (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM community_reports WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        reject(new Error('Error executing database query: ' + err.message));
      } else {
        resolve(results);
      }
    });
  });
},

  findAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM community_reports';
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

module.exports = CommunityReport;