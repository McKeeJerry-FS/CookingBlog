const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', '../views/layouts/main.ejs');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

try {
    
    app.listen(port, () => {
        console.log(`server is listening on port ${port}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
