const connection = require('../config/db');

class Message {
  static sendMessage({ sender_id, receiver_id, message }, callback) {
    if (!sender_id || !receiver_id || !message) {
      const error = new Error('Missing sender_id, receiver_id, or message');
      return callback(error);
    }

    const validateUsersQuery = 'SELECT COUNT(*) AS count FROM users WHERE user_id IN (?, ?)';
    const validateUsersValues = [sender_id, receiver_id];
``
    connection.query(validateUsersQuery, validateUsersValues, (validateErr, userCounts) => {
      if (validateErr) {
        return callback(validateErr);
      }

      if (userCounts[0].count !== 2) {
        const error = new Error('Invalid sender_id or receiver_id');
        return callback(error);
      }

      const sendMessageQuery = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
      const sendMessageValues = [sender_id, receiver_id, message];

      connection.query(sendMessageQuery, sendMessageValues, callback);
    });
  }

  static receiveMessages(user_id, callback) {
    if (!user_id) {
      const error = new Error('Missing user_id');
      return callback(error);
    }

    const validateUserQuery = 'SELECT COUNT(*) AS count FROM users WHERE user_id = ?';
    const validateUserValues = [user_id];

    connection.query(validateUserQuery, validateUserValues, (validateErr, userCounts) => {
      if (validateErr) {
        return callback(validateErr);
      }

      if (userCounts[0].count !== 1) {
        const error = new Error('Invalid user_id');
        return callback(error);
      }

      const receiveMessagesQuery = 'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?';
      const receiveMessagesValues = [user_id, user_id];

      connection.query(receiveMessagesQuery, receiveMessagesValues, callback);
    });
  }
}

module.exports = Message;
