// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const http = require('http');
const config = require('./configs/config');

//Connect to DB
mongoose.connect(config.mongo.uri);
//mongoose.connect('mongodb://localhost:27017/mean-app');

//On successful connection
mongoose.connection.on('connected', ()=> {
    console.log("Connected to DB: " + config.mongo.uri);
  });

//On error
mongoose.connection.on('error', (err)=> {
    console.log("Database Error: " + err);
});

// Get our API routes
const users = require('./routes/users');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//CORS middleware
// Cross Origin middleware
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

// Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./configs/passport')(passport);

// Set our api routes
app.use('/', users);


// Get port from environment and store in Express.
const port = process.env.PORT || '3000';

app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));