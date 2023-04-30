//This file establishes a connection with the database using node js and sends queries to html using the express server.

//Make sure you have installed:
// 'npm install'
// 'npm install express'
// 'npm install path'
// 'npm install pg'

//To run the code type in the terminal:
// 'node JavaScriptFiles/server.js'

//Code includes functions:
//*****/
//POST:
//--"/createUser"
//--"/checkUsername"
//--"/insertWishlistBook"
//--"/loginUser"
//--"/deleteFromWishlist"
//--"/checkOut"

//GET:
//--"/wishlist"
//--"/checked"
//--"/getNextID"
//*****/

var userID = "0000"

const express = require('express');
const path = require('path');
const { Client } = require('pg');
//const cors = require('cors');


//Sets the port as 3000:
const app = express();
const port = process.env.PORT || 3000;

//Set up the app:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true }));


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


// Insert into profile:
//*--Inserts a user based on information provided--*
app.post('/createUser', (req, res) => {
    //Gets information from html file:
    const { email, username, password, id } = req.body;
    //Display information:
    console.log(req.body);
    res.send("User created successfully.");
    //Create the query:
    const query = "INSERT INTO Profile (email, username, password, id) VALUES ('" + email + "', '" + username + "', '" + password + "', '" + id + "');";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            console.log('INSERTED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        });
        //Insert into general table:
    const generalQuery = "INSERT INTO GeneralUser (ID) VALUES ('" + id + "');";
    client.query(generalQuery);
});

//Checks if a username is used
app.post('/checkUsername', (req, res) => {
    //Gets information from html file:
    const { username } = req.body;
    //Display information:
    console.log(req.body);
    //Create the query:
    const query = "SELECT username from Profile WHERE username = '" + username + "';";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).send('Username not found');
                console.log("Username is unique: " + username)
            }
            else {
                res.status(200).send('Failed to execute query');
                console.log('Username already in profiles: ' + query);
            }
        })
        //Error occurred:
        .catch(err => {
            console.error('Username not found:', err);
            res.status(500).send('Failed to execute query');
        });
});

//Inserts a wishlistBook to wishlist table
app.post('/insertWishlistBook', (req, res) => {
    const { bookID, userID } = req.body;
    console.log(req.body);
    res.send("Book stored successfully.");
    //Create the query:
    const query = "INSERT INTO Wishlist (bookID, ID) VALUES ('" + bookID + "', '" + userID + "');";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            console.log('INSERTED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        });
    
});

//Logins a user:
//https://stackoverflow.com/questions/54473981/how-to-combine-app-post-and-app-get-to-one-in-node-js
app.post('/loginUser', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    res.send();
    //Create the query:
    const query = "SELECT ID FROM Profile WHERE userName = '" + username + "' AND password = '" + password + "';";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            if (result.rows.length > 0) {
                const userID = result.rows[0].ID;
                res.json({ userID });
              } else {
                // User not found:
                res.status(404).send('User not found');
              }
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        }); 
});

//Deletes a book from the wishlist
app.post('/deleteFromWishlist', (req, res) => {
    console.log(req.body);
    const { bookID, ID } = req.body;
    
    //Create the query:
    const query = "DELETE FROM wishlist WHERE bookID = '" + bookID + "' AND id = '" + ID + "';"; 
    //Query:
    client.query(query)
        .then(result => {
            console.log('DELETED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        });

});

//Checkes Out a book
app.post('/checkOut', (req, res) => {
    console.log(req.body);
    const { id, bookID } = req.body;
    const date = new Date();
    date.setDate(date.getDate() - 5);
    const currentDate = date.toISOString().substr(0, 10);
    console.log(currentDate);
    //Create the query:
    const query = "INSERT INTO checked_in_out VALUES ('" + id + "', '" + currentDate + "', 'true', '" + bookID + "');"
    //Query:
    client.query(query) 
        .then(result => {
            console.log('INSERTED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute query:', err);
            res.status(500).send('Failed to execute query');
        });
});

// app.post for wishlist.html: 
// *--Returns the wishlist table--*
app.get('/wishlist', (req, res) => {
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

// app.post for checked_in_out.html: 
// *--Returns the wishlist table--*
app.get('/checked', (req, res) => {
    // Gets query from the database:
    client.query('SELECT * FROM checked_in_out')
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

// Gets the maximum ID:
//*--Gets the maximum ID--*
app.get('/getNextID', (req, res) => {
    // Gets query from the database:
    client.query('SELECT MAX(ID) FROM Profile;')
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