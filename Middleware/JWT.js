const jwt = require('jsonwebtoken');

/**
 * @description Generates a JWT token for the user
 * @param {string} userId - The ID of the user
 * @returns {string} - The generated JWT token
 */
const generateToken = (userId) => {
    const payload = {
        id: userId
    }
    const options = {
        expiresIn: '1h' // Token expiration time
    }
    const secretKey = process.env.JWT
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

/**
 * @description Middleware to authenticate JWT token
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @return {void}
 */
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };