const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'abcdef';

class User {

    static getUserByUsername(username, callback) {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            callback(err);
        } else {
            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback({ message: 'User not found' });
            }
        }
    });
}


   static createUser(user, callback) {
    const { username, email, location, interests, password } = user;

    // Check if username, email, and password are provided
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
                        // User with this username or email already exists
                        callback({ status: 400, message: 'User with this username or email already exists' });
                    } else {
                        // Check if location and interests are provided, if not, set them to null
                        const normalizedLocation = location || null;
                        const normalizedInterests = interests || null;

                        const insertUserQuery =
                            'INSERT INTO users (username, email, location, interests, password) VALUES (?, ?, ?, ?, ?)';
                        const insertUserValues = [username, email, normalizedLocation, normalizedInterests, encryptedPassword];
                        
                        connection.query(insertUserQuery, insertUserValues, (err, insertResult) => {
                            if (err) {
                                callback(err);
                            } else {
                                // User profile created successfully
                                callback(null, { message: 'User profile created', userId: insertResult.insertId });
                            }
                        });
                    }
                }
            });
        }
    });
}



    static getUserById(userId, callback) {
        connection.query('SELECT * FROM users WHERE user_id = ?', [userId], callback);
    }

    static updateUser(userId, updatedUser, callback) {
        const { username, email, location, interests } = updatedUser;
        const updateUserQuery =
            'UPDATE users SET username = ?, email = ?, location = ?, interests = ? WHERE user_id = ?';
        const updateUserValues = [username, email, location, interests, userId];
        connection.query(updateUserQuery, updateUserValues, callback);
    }

    static deleteUser(userId, callback) {
        connection.query('DELETE FROM users WHERE user_id = ?', [userId], callback);
    }

   static searchUsers({ interests, location }, callback) {
        let searchUsersQuery = 'SELECT * FROM users';

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
       
       console.log('Generated SQL Query:', searchUsersQuery);
       console.log('Generated SQL Values:', searchUsersValues);


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
                        callback(null, { message: 'Logged in successfully', token });
                    } else {
                        callback({ message: 'Invalid credentials' });
                    }
                }
            });
        } else {
            callback({ message: 'User not found' });
        }
    });
}

}

module.exports = User;
