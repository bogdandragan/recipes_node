const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
//const RateLimit = require('express-rate-limit');

const api = require('./routes/api');
const crudTest = require('./routes/crudTest');

const app = express();

require('./config/dbConfig');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, './app/dist')));

//var apiLimiter = new RateLimit({
//    windowMs: 30*1000, // 30 seconds
//    max: 1, // limit each IP to 1 requests per windowMs
//    delayMs: 0 // disable delaying - full speed until the max limit is reached
//});

// Set api routes
app.use('/api/', /*apiLimiter, */api);
app.use('/crudtest/', /*apiLimiter, */crudTest);

app.use(function(err, req, res, next) {
    console.log(err);

    console.log(err.stack);
    res.status(500).send('Something broke!');
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './app/dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Application running on localhost:${port}`));