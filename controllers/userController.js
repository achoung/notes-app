const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

/**
 * TODO
 * - Add ability to reset User password
 */

async function createUser(req, res) {
    try {
        const { email, password } = req.body;

        // verify if the user's email already exists 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const newUser = new User({ email, password });
        const savedNewUser = await newUser.save();

        // omit "password" property from being returned in response
        const { password: omitPassword, ...result } = savedNewUser.toObject();

        res.json(result);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Password is incorrect" });
        }

        const loggedInUser = await user.generateToken();
        
        // omit "password" property from being returned in response
        const { password: omitPassword, ...result } = loggedInUser.toObject();

        res.json(result);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

async function logoutUser(req, res) {
    try {
        if (!req.user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        await req.user.deleteToken(req.token);
        res.sendStatus(200);
    } catch(err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
};
