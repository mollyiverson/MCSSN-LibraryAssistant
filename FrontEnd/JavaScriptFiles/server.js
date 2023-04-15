//This file establishes a connection with the database using node js and sends queries to html using the express server.

//Make sure you have installed:
// 'npm install'
// 'npm install express'
// 'npm install path'
// 'npm install pg'

//To run the code type in the terminal:
// 'node JavaScriptFiles/server.js'

const express = require('express');
const path = require('path');
const { Client } = require('pg');

//Sets the port as 3000:
const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Setting up the server connection
const client = new Client({
    user: 'caitlingraves',
    password: 'Duke2023',
    host: 'library.postgres.database.azure.com',
    port: 5432,
    database: 'postgres',
    ssl: true,
    authentication: {
        type: 'default'
    },
    set: { sslmode: 'require' },
});

//Connects the server:
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Failed to connect to PostgreSQL database:', err);
    });

// app.get example: this does not work rn, but will change later as we add more code
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/s.html'));
});

// app.post for wishlist.html: 
// *--Returns the wishlist table--*
app.post('/runScript', (req, res) => {
    // Gets query from the database:
    client.query('SELECT * FROM wishlist')
        //Returns the query:
        .then(result => {
            console.log('Query result:', result.rows);
            // Send the query result as JSON response
            res.json(result.rows);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        });
});

// Starts up the express server with the port:
app.listen(port);
console.log('Server started at http://localhost:' + port);