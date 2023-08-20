const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const { getUser, createUser, deleteUser, updateUser, handleLogin, 
    handleLogout } = require('../controllers/mongoDBController')

// Getting all users
// router.get('/', async (req, res) => {  //testing jwt
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// User Login
router.post('/login', handleLogin);

// Creating one user
router.post('/signup', createUser);

// logout user
router.get("/logout", handleLogout);

// Getting user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Updating user by ID
router.patch('/:id', getUser, updateUser);

// Deleting user by ID
router.delete('/:id', getUser, deleteUser);

module.exports = router;