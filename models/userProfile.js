const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'abcdef'; 

class User {

    static getUserByUsername(username, callback) {
        connection.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }

    static createUser(user, callback) {
    const { username, email, location, interests, password } = user;

    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const passwordEncryptionQuery = 'SELECT PASSWORD(?) AS encryptedPassword';

        connection.query(passwordEncryptionQuery, [password], (err, encryptionResult) => {
            if (err) {
                callback(err);
            } else {
                const encryptedPassword = encryptionResult[0].encryptedPassword;

                connection.query(checkUserQuery, [email], (err, results) => {
                    if (err) {
                        callback(err);
                    } else if (results.length > 0) {
                        callback({ status: 400, message: 'User with this email already exists' });
                    } else {
                        const insertUserQuery =
                            'INSERT INTO users (username, email, location, interests, password) VALUES (?, ?, ?, ?, ?)';
                        const insertUserValues = [username, email, location, interests, encryptedPassword];
                        connection.query(insertUserQuery, insertUserValues, callback);
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
            searchUsersQuery += ' AND';
        }

        if (location) {
            searchUsersQuery += ' location LIKE ?';
        }
    }

    const searchUsersValues = [`%${interests || ''}%`, `%${location || ''}%`];

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
                        const token = jwt.sign({ userId: user.user_id }, secretKey);
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
