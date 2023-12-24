const connection = require('../config/db');

class Message {
  static sendMessage({ receiverName, message, userId }, callback) {
    if (!receiverName || !message || !userId) {
      const error = new Error('Missing receiverName, message, or userId');
      return callback(error);
    }

    const validateSenderQuery = 'SELECT user_id FROM users WHERE username = ?';
    const validateSenderValues = [receiverName];

    connection.query(validateSenderQuery, validateSenderValues, (validateErr, senderResult) => {
      if (validateErr) {
        return callback(validateErr);
      }

      if (senderResult.length === 0) {
        const error = new Error('Invalid receiverName');
        return callback(error);
      }

      const sender_id = userId;
      const receiver_id =  senderResult[0].user_id;   

      const sendMessageQuery = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
      const sendMessageValues = [sender_id, receiver_id, message];

      connection.query(sendMessageQuery, sendMessageValues, callback);
    });
  }

  static receiveMessages(userId, callback) {
    if (!userId) {
      const error = new Error('Missing userId');
      return callback(error);
    }

    const validateUserQuery = 'SELECT COUNT(*) AS count FROM users WHERE user_id = ?';
    const validateUserValues = [userId];

    connection.query(validateUserQuery, validateUserValues, (validateErr, userCounts) => {
      if (validateErr) {
        return callback(validateErr);
      }

      if (userCounts[0].count !== 1) {
        const error = new Error('Invalid userId');
        return callback(error);
      }

      const receiveMessagesQuery = 'SELECT * FROM messages WHERE  receiver_id = ?';
      const receiveMessagesValues = [userId, userId];

      connection.query(receiveMessagesQuery, receiveMessagesValues, callback);
    });
  }
}

module.exports = Message;
