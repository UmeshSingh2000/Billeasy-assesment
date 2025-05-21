const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description User schema for MongoDB
 * @type {Schema}
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps:true
})
const User = mongoose.model('User',userSchema);
module.exports = User;