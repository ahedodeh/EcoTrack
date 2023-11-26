const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = 'abcdef'; 

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};