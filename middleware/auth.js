
const User = require('./../models/userModel');

/**
 * Authenticate request using Basic HTTP authentication.
 */
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return res.status(400).json({ msg: 'Invalid Authentication' });
        }

        const user = await User.findByToken(token);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Authentication' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth;
