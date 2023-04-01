const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const foundUser = await User.findOne({ email: email }); 

    if (!foundUser) return res.sendStatus(401);

    //evaluate hashed password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match){
        // JWTs
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
        )
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // Saving refreshToken with current user
        const query = { _id: foundUser._id };
        const update = { refreshToken };
        const options = { new: true };

        const updatedUser = await User.findOneAndUpdate(query, update, options);
        
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
        res.json({ accessToken });
        res.json({ success: 'User is logged in!' });
    }else{
        res.sendStatus(401)
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