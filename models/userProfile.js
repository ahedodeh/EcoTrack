const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'abcdef';
const blacklistedTokens = [];

class User {

    static getUserByUsername(username, callback) {
        connection.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }

 static createUser(user, callback) {
    const { username, email, location, interests, password } = user;

    if (!username || !email || !password) {
        return callback({ status: 400, message: 'Please provide username, email, and password' });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const passwordEncryptionQuery = 'SELECT PASSWORD(?) AS encryptedPassword';

    connection.query(passwordEncryptionQuery, [password], (err, encryptionResult) => {
        if (err) {
            callback(err);
        } else {
            const encryptedPassword = encryptionResult[0].encryptedPassword;

            connection.query(checkUserQuery, [username, email], (err, results) => {
                if (err) {
                    callback(err);
                } else {
                    if (results.length > 0) {
                        const existingUser = results[0].username === username ? 'Username' : 'Email';
                        callback({ status: 400, message: `${existingUser} already exists` });
                    } else {
                        const normalizedLocation = location || null;
                        const normalizedInterests = interests || null;

                        const insertUserQuery =
                            'INSERT INTO users (username, email, location, interests, password) VALUES (?, ?, ?, ?, ?)';
                        const insertUserValues = [username, email, normalizedLocation, normalizedInterests, encryptedPassword];

                        connection.query(insertUserQuery, insertUserValues, (err, insertResult) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, { status: 201, message: 'User profile created', userId: insertResult.insertId });
                            }
                        });
                    }
                }
            });
        }
    });
}


static getUserById(userId, callback) {
    connection.query('SELECT username, email, location, interests FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            callback(err);
        } else if (results.length === 0) {
            callback({ status: 404, message: 'User not found' });
        } else {
            const user = results[0];
            callback(null, user);
        }
    });
    }
static updateUser(userId, updatedUser, callback) {
    connection.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, userResults) => {
        if (err) {
            return callback(err);
        }

        if (userResults.length === 0) {
            return callback({ status: 404, message: 'User not found' });
        }

        const { username, email, location, interests } = userResults[0];

        const updatedUsername = updatedUser.username || username;
        const updatedEmail = updatedUser.email || email;
        const updatedLocation = updatedUser.location !== undefined ? updatedUser.location : location;
        const updatedInterests = updatedUser.interests !== undefined ? updatedUser.interests : interests;

        connection.query(
            'SELECT * FROM users WHERE (username = ? OR email = ?) AND user_id != ?',
            [updatedUsername, updatedEmail, userId],
            (err, duplicateCheckResults) => {
                if (err) {
                    return callback(err);
                }

                if (duplicateCheckResults.length > 0) {
                    return callback({ status: 400, message: 'Email or username already exists' });
                }

                const updateUserQuery =
                    'UPDATE users SET username = ?, email = ?, location = ?, interests = ? WHERE user_id = ?';
                const updateUserValues = [updatedUsername, updatedEmail, updatedLocation, updatedInterests, userId];
                connection.query(updateUserQuery, updateUserValues, (err) => {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, { message: 'User profile updated successfully' });
                });
            }
        );
    });
}





    static deleteUser(userId, callback) {
        connection.query('DELETE FROM users WHERE user_id = ?', [userId], callback);
    }

   static searchUsers({ interests, location }, callback) {
    let searchUsersQuery = 'SELECT username, email, location, interests FROM users';

    if (interests || location) {
        searchUsersQuery += ' WHERE';

        if (interests) {
            searchUsersQuery += ' interests LIKE ?';
        }

        if (interests && location) {
            searchUsersQuery += ' OR';
        }

        if (location) {
            searchUsersQuery += ' location LIKE ?';
        }
    }

    const searchUsersValues = [];

    if (interests) {
        searchUsersValues.push(`%${interests}%`);
    }

    if (location) {
        searchUsersValues.push(`%${location}%`);
    }

  
       

    connection.query(searchUsersQuery, searchUsersValues, callback);
}


 static loginUser({ username, password }, callback) {
    const getUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(getUserQuery, [username], (err, results) => {
      if (err) {
        callback(err);
      } else if (results.length > 0) {
        const user = results[0];

        const decryptedPassword = connection.query('SELECT PASSWORD(?) AS decryptedPassword', [password], (err, decryptResult) => {
          if (err) {
            callback(err);
          } else {
            if (user.password === decryptResult[0].decryptedPassword) {
              const token = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '1h' });
              callback(null, { status: 200, message: 'Logged in successfully', token });
            } else {
              callback({ status: 401, message: 'Invalid credentials' });
            }
          }
        });
      } else {
        callback({ status: 404, message: 'User not found' });
      }
    });
    }
}

module.exports = User;