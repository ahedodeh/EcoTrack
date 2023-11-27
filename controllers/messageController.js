const Message = require('../models/message');
const { handleError } = require('../middleware/errHandling');

exports.sendMessages = (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  const newMessage = {
    sender_id: req.userId,
    receiver_id,
    message,
  };

  Message.sendMessage(newMessage, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(201).json({ message: 'Message sent successfully' });
  });
};

exports.receiveMessages = (req, res) => {
  const user_id = req.userId;

  Message.receiveMessages(user_id, (err, messages) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json(messages);
  });
};
