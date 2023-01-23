const express = require('express');
const router = express.Router();
const User = require('./../database/models/User');


router.post('/', async(req, res) => {
    try {
        const options = Object.keys(req.body); // Extract the keys from the request body

        const allowed = ["username", "password"]; // Define the allowed keys

        // Check if every key in options is present in allowed
        const isValid = options.every(item => allowed.includes(item));

        // If not, throw an error
        if(!isValid) throw 'Error: Only "username" and "password" keys are allowed in the request body';
        

        const user = new User(req.body); // Create a new User object with the request body
        const token = user.makeToken();  // Generating JWT for AUTH
        await user.save(); // Save the User object to the database


        res.status(201).send({user, token}); // Send a 201 response with the new user object
    }catch(e) {
        // Send a 400 response with the error message if an error is caught
        res.status(400).send({e});
    } 
});




module.exports = router;