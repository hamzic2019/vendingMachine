const express = require('express'); // requiring express library
const hbs = require('hbs'); // requiring hbs (handlebars) library
const path = require('path'); // requiring path library for working with file paths

require('./database/mongoose.js'); // requiring mongoose for database connection

const app = express(); // creating an express application
const PORT = process.env.PORT || 3000; // setting the port for the application, either from the environment or defaulting to 3000

// serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

// parsing json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// setting the view engine to handlebars and the views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './templates/views'));

// registering handlebars partials
hbs.registerPartials(path.join(__dirname, './templates/partials'));

// starting the server and logging a message on success
app.listen(PORT, () => {
    console.log(`Application is up and running on port ${PORT}!`);
});
