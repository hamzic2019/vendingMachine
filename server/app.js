const express = require('express');
const hbs = require('hbs');
const path = require('path');

require('./database/mongoose.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './teampltes/views'));
hbs.registerPartials(path.join(__dirname, './teampltes/partials'));

app.listen(PORT, () => {
    console.log(`Application is up and running!`);
});


