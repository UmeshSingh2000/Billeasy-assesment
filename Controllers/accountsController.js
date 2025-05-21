const User = require('../Models/UserSchema');
const { hashPassword, comparePassword } = require('../Helpers/passwordHasher');
const { generateToken } = require('../Middleware/JWT');

/**
 * @description Handles user signup
 */
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        await User.create({
            name,
            email,
            password: await hashPassword(password)
        })
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
}

/**
 * @description Handles user login
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist with this email' });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        const token = generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', // Adjust as needed
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({ message: 'Login successful' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
}


module.exports = {
    signup,
    login
}