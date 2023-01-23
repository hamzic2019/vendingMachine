const express = require('express');
const router = express.Router();
const User = require('./../database/models/User');
const auth = require('./../middleware/auth');


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


router.post('/login', async(req, res) => {
    try {
        const options = Object.keys(req.body); // Extract the keys from the request body

        const allowed = ["username", "password"]; // Define the allowed keys

        // Check if every key in options is present in allowed
        const isValid = options.every(item => allowed.includes(item));

        // If not, throw an error
        if(!isValid) throw 'Error: Only "username" and "password" keys are allowed in the request body';
        
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = user.makeToken();
        await user.save(); // saving token from new log in

        res.status(200).send({user, token});

    }catch(e) {
        // Send a 400 response with the error message if an error is caught
        res.status(400).send({e});
    }
});


// Allows logged-in users to log out of their session.
router.post('/logout',auth ,async(req, res) => {
    try {
        // Check if the user is logged in
        if(req.user === undefined) throw 'You are not logged in to take this action'

        // Remove the token from the user's tokens array
        req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token)

        // Save the user's updated tokens array
        await req.user.save();

        // Send a 200 OK response with the updated user object
        res.status(200).send({user: req.user});
        
    }catch(e) {
        // Send a 400 Bad Request response with the error message if an error is caught
        res.status(400).send({e});
    }
})

// Allows logged-in users to log out all sessions.
router.post('/logout/all',auth ,async(req, res) => {
    try {
        if(req.error) throw 'You are not logged in!';

        req.user.tokens = []; // Set the user's tokens array to be empty
        await req.user.save(); // Save the user's updated tokens array

        res.status(200).send({message: 'You have logged out from all active sessions.'})

    }catch(e) {
        // Send a 400 Bad Request response with the error message if an error is caught
        res.status(400).send({e});
    }
})


router.get('/profile',auth ,async(req, res) => {
    try {
        if(req.error) throw 'You are not logged in!';
        res.status(200).send({user: req.user});

    }catch(e) {
        // Send a 400 Bad Request response with the error message if an error is caught
        res.status(400).send({e});
    }
})

router.put('/profile', auth, async(req, res) => {
    try {
        if(req.error) throw 'You are not logged in!';

        const options = Object.keys(req.body); // Extract the keys from the request body

        const allowed = ["username", "password", "deposit"]; // Define the allowed keys

        // Check if every key in options is present in allowed
        const isValid = options.every(item => allowed.includes(item));

        // If not, throw an error
        if(!isValid) throw 'Error: Only "username" and "password" keys are allowed in the request body';
        
        //loop through the options array, and update the user object
        options.forEach(option => {
            req.user[option] = req.body[option];
        })
 
        await req.user.save(); //save the user
    
        res.status(200).send({user: req.user}); // Send a 200 OK response with the updated user object

    }catch(e) {
        // Send a 400 Bad Request response with the error message if an error is caught
        res.status(400).send({e});
    }
})


module.exports = router;