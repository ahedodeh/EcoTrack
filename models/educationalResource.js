const db = require('../config/db');

const EducationalResource = {
  getAllResources: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM educational_resources';
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getResourceById: (resourceId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM educational_resources WHERE resource_id = ?';
      const values = [resourceId];
      db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  createResource: async (title, content, author, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO educational_resources (title, content, author, user_id) VALUES (?, ?, ?, ?)';
      const values = [title, content, author, userId];

      db.query(sql, values, async (err, results) => {
        if (err) {
          reject(err);
        } else {
          await incrementUserScore(userId);
          resolve(results.insertId);
        }
      });
    });
  },

  updateResource: (resourceId, title, content, author) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE educational_resources SET title = ?, content = ?, author = ? WHERE resource_id = ?';
      const values = [title, content, author, resourceId];
      db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteResource: (resourceId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM educational_resources WHERE resource_id = ?';
      const values = [resourceId];
      db.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

async function incrementUserScore(userId) {
  const sql = 'UPDATE users SET score = score + 1 WHERE user_id = ?';
  const values = [userId];

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = EducationalResource;
