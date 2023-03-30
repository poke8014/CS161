const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getUser, createUser, deleteUser, updateUser, handleLogin } = require('../controllers/mongoDBController')

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User Login
router.get('/login', handleLogin);

// Getting user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating one user
router.post('/signup', createUser);

// Updating user by ID
router.patch('/:id', getUser, updateUser);

// Deleting user by ID
router.delete('/:id', getUser, deleteUser);

module.exports = router;