const jwt = require('jsonwebtoken');
const User = require('./../database/models/User');
const dotenv = require('dotenv').config();

// Middleware function to handle authentication
const auth = async (req, res, next) => {
    // Get the token from the headers
    let token = req.headers["authorization"] //.replace('Bearer ', '');

    
    // Check if the token is undefined
    if(token === undefined){
        req.logged = false;
        next();
    }else {
        // Remove the 'Bearer ' prefix from the token
        token = token.replace('Bearer ', '');

        // Verify the token
        const isValid = jwt.verify(token, `${process.env.jwtSecret}`)
        
        // Find the user with the same id as the token payload
        const user = await User.findOne({_id: isValid._id});

         // Set the user, token, and logged value on the request object
        req.user = user;
        req.token = token; 
        req.logged = true;

        // Call the next middleware function
        next();
    }
}

module.exports = auth;