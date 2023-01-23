const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validator = require('validator'); // later to be remove or to validate emails

let passwordValidator = require('password-validator');
let passwordSchema = new passwordValidator();

    passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', '123456789']); // More to be added to list


console.log(passwordSchema.validate('haris253Sgdhf*'))

const userSchema = new Schema({
    username :{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: (password) => {
            return passwordSchema.validate(password)
        }
    },
    deposit: {
        type: Number
    }
});


const User = model('User', userSchema);


module.exports = User;