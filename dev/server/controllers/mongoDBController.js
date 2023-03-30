const User = require('../models/user');
const bcrypt = require('bcrypt');

// Creating one
async function createUser(req, res) {
    const { email, password } = req.body;

    // Check if email is in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
    }
    
    const user = new User({
        email: email,
        password: password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// login a user
async function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({'message': 'Email and password are required.'});
    try {
        const foundUser = await User.findOne({ email: email }); 

        if (!foundUser) return res.status(401).json({ message: 'Invalid email or password.' });
    
        //evaluate hashed password
        const match = await bcrypt.compare(password, foundUser.password);
        if (match){
            res.json({ success: `User is logged in!` });
        }else{
            res.status(401).json({ message: 'Invalid email or password.' });
        }   
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Updating one
async function updateUser(req, res) {
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

// Deleting one
async function deleteUser(req, res) {
    const id = res.user.id
    try {
        await res.user.remove();
        res.json({ message: `Deleted user ${id}` })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Middleware
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user;
    next();
};

module.exports = { getUser, createUser, deleteUser, updateUser, handleLogin };