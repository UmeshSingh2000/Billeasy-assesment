const express = require('express');
const { signup, login } = require('../Controllers/accountsController');
const router = express.Router();

router.post('/signup',signup) // POST request to create a new user
router.post('/login',login) // POST request to login a user

module.exports = router;