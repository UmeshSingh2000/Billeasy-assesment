const mongoose = require('mongoose');

/**
 * @description Database connection configuration
 * @returns {Promise<void>}
 *  @throws {Error} - Throws an error if the connection fails
 */
const config = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    }
    catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = config;