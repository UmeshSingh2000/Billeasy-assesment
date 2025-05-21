const Book = require('../Models/bookSchema');
const idChecker = require('../Helpers/idChecker');

/**
 * @description Adds a new book to the database
 */
const addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        if (!title || !author || !genre) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        // Check if the book already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return res.status(400).json({ message: 'Book already exists with the same title' });
        }
        const newBook = await Book.create({
            title,
            author,
            genre
        });

        // Return the created book
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
}

/**
 * @description Fetches all books from the database
 */
const getBooks = async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const filter = {};
        if (author) {
            filter.author = author;
        }
        if (genre) {
            filter.genre = genre;
        }
        console.log(filter);
        const books = await Book.find(filter)
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const bookCount = books.length;
        res.status(200).json({
            message: `Books fetched successfully ${bookCount}`,
            page: parseInt(page),
            limit: parseInt(limit),
            books,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
}

/**
 * @description Fetches a book by its ID from the database
 */
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit = 10, page = 1 } = req.query;
        // Check if the book ID is valid
        if (!idChecker(id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        const book = await Book.findById(id).select('Reviews').skip();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const skip = (page - 1) * limit;
        const reviews = book.Reviews || [];
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
        const paginatedReviews = reviews.slice(skip, skip + limit);
        res.status(200).json({
            message: 'Book fetched successfully', book: {
                _id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                avgRating,
                page: parseInt(page),
                limit: parseInt(limit),
                Reviewreturned: paginatedReviews.length,
                Reviews: paginatedReviews
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching book', error: err.message });
    }
}

/**
 * @description Adds a review to a book
 */
const addReview = async (req, res) => {
    try {
        const userId = req.user.id; // user id from JWT token
        const bookId = req.params.id;
        // Check if the book ID is valid
        if (!idChecker(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        const { review, rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        if (!review || !rating) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.Reviews.find((r) => r.userId.toString() === userId)) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }
        book.Reviews.push({
            userId,
            review,
            rating
        });
        await book.save();
        res.status(201).json({ message: 'Review added successfully', book });
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding review', error: err.message });
    }
}

/**
 * @description Searches for books by title or author
 */
const searchBook = async (req, res) => {
    try {
        const { title, author } = req.query;
        const filter = {};
        if (title?.trim()) {
            filter.title = { $regex: title.trim(), $options: 'i' };
        }
        if (author?.trim()) {
            filter.author = { $regex: author.trim(), $options: 'i' };
        }
        const books = await Book.find(filter);
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        res.status(200).json({ message: 'Books fetched successfully', books });
    }
    catch (err) {
        res.status(500).json({ message: 'Error searching book', error: err.message });
    }
}

/**
 * @description Deletes a review from a book
 */
const deleteReview = async (req, res) => {
    try {
        const userId = req.user.id; // user id from JWT token
        const { id } = req.params; // Book id
        // Check if the book ID is valid
        if (!idChecker(id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }


        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const originalLength = book.Reviews.length;
        book.Reviews = book.Reviews.filter(
            (review) => review.userId.toString() !== userId
        );
        if (book.Reviews.length === originalLength) {
            return res.status(404).json({ message: 'Review not found for this user' });
        }
        await book.save();
        res.status(200).json({ message: 'Review deleted successfully', book });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
}

/**
 * @description Updates a review for a book
 */
const updateReview = async (req, res) => {
    try {
        const userId = req.user.id; // user id from JWT token
        const bookId = req.params.id;
        // Check if the book ID is valid
        if (!idChecker(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        const { review, rating } = req.body;
        if (!review && !rating) {
            return res.status(400).json({ message: 'Please provide at least one field to update' });
        }
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const reviewToUpdate = book.Reviews.find((r) => r.userId.toString() === userId);
        if (!reviewToUpdate) {
            return res.status(404).json({ message: 'Review not found for this user' });
        }
        if (review) {
            reviewToUpdate.review = review;
        }
        if (rating) {
            reviewToUpdate.rating = rating;
        }
        await book.save();
        res.status(200).json({ message: 'Review updated successfully', book });
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating review', error: err.message });
    }
}


module.exports = {
    addBook,
    getBooks,
    getBookById,
    addReview,
    searchBook,
    deleteReview,
    updateReview
}