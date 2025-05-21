const mongoose = require('mongoose');

/**
 * Function to check if a given ID is a valid MongoDB ObjectId
 * @param {string} id - The ID to check
 * @returns {boolean} - Returns true if the ID is valid, false otherwise
 */
const idChecker = (id)=>{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
}

module.exports = idChecker;