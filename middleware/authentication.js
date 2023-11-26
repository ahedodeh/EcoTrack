const jwt = require('jsonwebtoken');
const secretKey = 'abcdef'; 

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Token missing or invalid format' });
  }

  const token = authHeader.substring('Bearer '.length);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};
