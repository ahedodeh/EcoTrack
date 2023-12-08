const User = require('../models/userProfile');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');


exports.createUser = (req, res) => {
  const newUser = req.body;

  User.createUser(newUser, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(201).json({ message: 'User profile created' });
  });
};



exports.searchUsers = (req, res) => {
    const { interests, location } = req.query;

    User.searchUsers({ interests, location }, (err, results) => {
        if (err) {
            console.error('Error in searchUsers route handler:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Search Users Results:', results);

            if (results.length === 0) {
                console.log('No users found matching the criteria.');
            }

            res.status(200).json(results);
        }
    });
};

exports.getUser = (req, res) => {
  const userIdFromToken = req.userId;

  User.getUserById(userIdFromToken, (err, user) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json(user);
  });
};



exports.updateUser = (req, res) => {
  const userIdFromToken = req.userId;
  const updatedUser = req.body;

  User.updateUser(userIdFromToken, updatedUser, (err) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json({ message: 'User profile updated' });
  });
};



exports.deleteUser = (req, res) => {
  const userIdFromToken = req.userId;

  User.deleteUser(userIdFromToken, (err) => {
    if (err) {
      return handleError(err, req, res);
    }
    res.status(200).json({ message: 'User profile deleted' });
  });
};


exports.login = (req, res) => {
  const { username, password } = req.body;

  User.loginUser({ username, password }, (err, user) => {
    if (err) {
      return handleError(err, req, res);
    } else if (user) {
      res.status(200).json({ message: 'Logged in successfully', token: user.token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};
