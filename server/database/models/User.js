const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // later to be remove or to validate emails
const dotenv = require('dotenv').config()

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


    // role field is missing!!
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
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
    }]
});

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
}

userSchema.methods.makeToken = function() {
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, `${process.env.jwtSecret}`)

    user.tokens = user.tokens.concat({token});

    return token;
}

userSchema.pre('save', async function(next) { 
    const user = this; 
    if(user.isModified('password')){ 
        user.password = await bcrypt.hash(user.password, 8); 
    } 
    next(); 
});


userSchema.statics.findByCredentials = async function(username, password){
    const user = await User.findOne({username});
    if(user === null) throw 'No user found!';

    const isValidPw = await bcrypt.compare(password, user.password);
    if(!isValidPw) throw 'Wrong password';

    return user;
}


const User = model('User', userSchema);


module.exports = User;