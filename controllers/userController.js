const User = require('../models/userProfile');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

exports.createUser = (req, res) => {
  const newUser = req.body;

  User.createUser(newUser, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    } else if (result.status === 201) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  });
};


exports.searchUsers = (req, res) => {
    const { interests, location } = req.query;

    User.searchUsers({ interests, location }, (err, results) => {
        if (err) {
            if (err.status && err.message) {
                return res.status(err.status).json({ error: err.message });
            } else {
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
        const sanitizedResults = results.map(user => {
            return {
                username: user.username,
                email: user.email,
                location: user.location,
                interests: user.interests
            };
        });

        res.status(200).json(sanitizedResults);
    });
};


exports.getUser = (req, res) => {
  const userId = req.userId;
  User.getUserById(userId, (err, user) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  const userId = req.userId;
  const updatedUserData = req.body;
  User.updateUser(userId, updatedUserData, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    }

    if (result.status) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(200).json({ message: result.message });
    }
  });
};


exports.deleteUser = (req, res) => {
  const userId = req.userId;

  User.deleteUser(userId, (err) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json({ message: 'User profile deleted' });
  });
};


exports.login = (req, res) => {
  const { username, password } = req.body;

  User.loginUser({ username, password }, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    } else if (result.status === 200) {
      res.status(200).json({ message: result.message, token: result.token });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  });
};

