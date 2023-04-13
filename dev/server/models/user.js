const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // songLibrary: {}
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    const user = this;

    // If the password hasn't been changed, move on to the next middleware function
    if (!user.isModified('password')){
        return next();
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Update the user's password with the hashed version
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

module.exports = mongoose.model('users', userSchema);