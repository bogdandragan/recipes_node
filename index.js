const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const crudTest = require('./routes/crudTest');

const app = express();

require('./config/dbConfig');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, './frontend/')));


// Set api routes
app.use('/api/', api);
app.use('/crudtest/', crudTest);

app.use(function(err, req, res, next) {
    console.log(err);

    if (err.status) {
        res.status(err.status).send(`${err.status} : ${err.statusText} (${err.message})`)
    }  else {
        res.status(500).send(`Internal Server Error : (${err.message})`);
    }
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/index.html'));
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