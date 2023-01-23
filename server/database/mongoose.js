const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Establishing connection to MongoDB database using Mongoose, 
// using the username and password from the environment variables
let databaseURI = `mongodb+srv://${process.env.username}:${process.env.password}@taxi.6rkptz5.mongodb.net/?retryWrites=true&w=majority`;


// Enabling strict mode for Mongoose to prevent saving 
// documents with different structures than the schema
mongoose.set('strictQuery', true);


// Connecting to MongoDB using Mongoose and logging a message to indicate successful connection
mongoose.connect(databaseURI, () => {
    console.log('Application is Connected to Database');
});


