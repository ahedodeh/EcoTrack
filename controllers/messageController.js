const Message = require('../models/message');
const { handleError } = require('../middleware/errHandling');

exports.sendMessages = (req, res) => {
  const { receiverName, message } = req.body;

  const newMessage = {
    receiverName,
    message,
    userId: req.userId, 
  };

  Message.sendMessage(newMessage, (err, result) => {
if (err) {
  return res.status(500).json({ error: err.message });  
}
res.status(201).json({ message: 'Message sent successfully' });  

  });
};

exports.receiveMessages = (req, res) => {
  const userId = req.userId;

  Message.receiveMessages(userId, (err, messages) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json(messages);
  });
};
