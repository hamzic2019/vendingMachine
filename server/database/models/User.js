const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validator = require('validator');


const userSchema = new mongoose.Schema({

});


const User = mongoose.model('User', userSchema);


export default User;