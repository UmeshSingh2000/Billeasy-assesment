const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description Book Schema
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {string} genre - The genre of the book
 * @param {array} Reviews - Array of reviews for the book
 * @param {objectId} userId - The ID of the user who reviewed the book
 * @param {string} review - The review text
 * @param {number} rating - The rating given by the user
 */
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    Reviews: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            review: {
                type: String,
            },
            rating: {
                type: Number,
            }
        }
    ]
}, {
    timestamps: true
})
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;