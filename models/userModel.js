const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../config').get(process.env.NODE_ENV);

const PASSWORD_SALT = 10;
const TOKEN_EXPIRATION = '24h'; // 1 day

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trime: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            select: false, // do not return by default
        },
        token: {
            type: String,
            select: false, // do not return by default
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Database hook to hash user password if it got changed
 */
userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, PASSWORD_SALT, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

/**
 * Compares user's encrypted password with the given password
 */
userSchema.methods.comparePassword = function (password) {
    const user = this;

    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Generates a new jsonwebtoken for the user.
 */
userSchema.methods.generateToken = function () {
    const user = this;
    user.token = jwt.sign({ id: user._id }, config.JWT_TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
    });
    return user.save();
};

/**
 * Find user by jsonwebtoken.
 */
userSchema.statics.findByToken = function (token) {
    const user = this;

    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.JWT_TOKEN_SECRET, function (err, data) {
            if (err) {
                reject(err);
            }

            user.findOne({ _id: data.id, token: token }, function (err, user) {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        });
    });
};

/**
 * Deletes user's jsonwebtoken.
 */
userSchema.methods.deleteToken = function () {
    const user = this;
    return user.updateOne({ $unset: { token: 1 } });
};

module.exports = mongoose.model('Users', userSchema);
