exports.validateUser = (req, res, next) => {
  const { username, email, location, interests, password } = req.body;
  if (!username || !email || !location || !interests || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  next();
};
