const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getUser, createUser, deleteUser, updateUser } = require('../controllers/mongoDBController')

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating one
router.post('/signup', createUser);

// Updating one
router.patch('/:id', getUser, updateUser);

// Deleting one
router.delete('/:id', getUser, deleteUser);

module.exports = router