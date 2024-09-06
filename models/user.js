const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']  // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Ensure password has a minimum length
    }
});

// No pre-save hook here, passwords will be stored as plain text

module.exports = mongoose.model('User', UserSchema);
