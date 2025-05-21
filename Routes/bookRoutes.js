const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/JWT');
const {
    addBook,
    getBooks,
    getBookById,
    addReview,
    searchBook,
    deleteReview,
    updateReview
} = require('../Controllers/booksController');


router.get('/search', authenticateToken, searchBook) // Search for books
router.post('/books', authenticateToken, addBook); // Add a new book
router.get('/books', authenticateToken, getBooks) // Get all books with optional filters
router.get('/books/:id', authenticateToken, getBookById) // Get a specific book by ID
router.post('/books/:id/reviews',authenticateToken,addReview) // Add a review to a specific book
router.delete('/reviews/:id',authenticateToken,deleteReview) // Delete a review from a specific book
router.put('/reviews/:id',authenticateToken,updateReview) // Update a review from a specific book

module.exports = router;