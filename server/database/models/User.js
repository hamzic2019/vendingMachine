const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validator = require('validator');


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
        trim: true
    },
    deposit: {
        type: Number,
        required: true
    }
});


const User = model('User', userSchema);


export default User;