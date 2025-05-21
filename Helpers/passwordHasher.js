const bcrypt = require('bcrypt');

/**
 * @description Hashes a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

/**
 * @description Compares a password with a hashed password
 * @param {string} password - The password to compare
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing password');
    }
}
module.exports = {
    hashPassword,
    comparePassword
}