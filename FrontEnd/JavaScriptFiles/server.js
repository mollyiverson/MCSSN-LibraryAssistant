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
//--"/checkWishlist"
//--"/checkCheckedOut"
//--"/insertWishlistBook"
//--"/loginUser"
//--"/deleteFromWishlist"
//--"/checkOut"

//GET:
//--"/wishlist"
//--"/checked"
//--"/getNextID"
//*****/

var myData = ""


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
    const { email, username, password } = req.body;
    //Display information:
    console.log(req.body);
    res.send("User created successfully.");
    //Create the query:
    const query = "INSERT INTO Profile (email, username, password, id) VALUES ('" + email + "', '" + username + "', '" + password + "', '" + myData + "');";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            console.log('INSERTED: ' + query);
            myData = (req.body[0].id)
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute createUser query:', err);
            res.status(500).send('Failed to execute createUser query');
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
            console.error('Username not found and incorrect query:', err);
            res.status(500).send('Failed to execute checkUsername query');
        });
});


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
            console.error('Username not found and incorrect query:', err);
            res.status(500).send('Failed to execute checkUsername query');
        });
});

//Checks if a username is used
app.post('/checkWishlist', (req, res) => {
    //Gets information from html file:
    const { bookID } = req.body;
    //Display information:
    console.log(req.body);
    //Create the query:
    const query = "SELECT id from Wishlist WHERE id = '" + myData + "' AND bookID='" + bookID + "';";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).send('Book not found');
                console.log("Book is unique: " + bookID)
            }
            else {
                res.status(200).send('Failed to execute query');
                console.log('Book already in wishlist: ' + query);
            }
        })
        //Error occurred:
        .catch(err => {
            console.error('Book not found and incorrect query:', err);
            res.status(500).send('Failed to execute checkWishlist query');
        });
});

//Checks if a username is used
app.post('/checkCheckedOut', (req, res) => {
    //Gets information from html file:
    const { bookID } = req.body;
    //Display information:
    console.log(req.body);
    //Create the query:
    const query = "SELECT id from checked_in_out WHERE id = '" + myData + "' AND bookID='" + bookID + "';";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).send('Book not found');
                console.log("Book is unique: " + bookID)
            }
            else {
                res.status(200).send('Failed to execute query');
                console.log('Book already in checked: ' + query);
            }
        })
        //Error occurred:
        .catch(err => {
            console.error('Book not found and incorrect query:', err);
            res.status(500).send('Failed to execute checkCheckedOut query');
        });
});

//Inserts a wishlistBook to wishlist table
app.post('/insertWishlistBook', (req, res) => {
    const { bookID } = req.body;
    console.log(req.body);
    res.send("Book stored successfully.");
    const element = myData
    //Create the query:
    const query = "INSERT INTO Wishlist (bookID, ID) VALUES ('" + bookID + "', '" + myData + "');";
    //Query:
    client.query(query)
        //Successful:
        .then(result => {
            console.log('INSERTED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.log(query)
            console.error('Failed to execute insertWishlistBook query:', err);
            res.status(500).send('Failed to execute insertWishlistBook query');
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
                myData.push(req.body[0].id)                //res.json({ globalUserID });
              } else {
                // User not found:
                res.status(404).send('User not found');
              }
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute loginUser query:', err);
            res.status(500).send('Failed to execute loginUser query');
        })
});

//Deletes a book from the wishlist
app.post('/deleteFromWishlist', (req, res) => {
    console.log(req.body);
    const { bookID } = req.body;
    
    //Create the query:
    const query = "DELETE FROM wishlist WHERE bookID = '" + bookID + "' AND id = '" + myData + "';"; 
    //Query:
    client.query(query)
        .then(result => {
            console.log('DELETED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute deleteFromWishlist query:', err);
            res.status(500).send('Failed to execute deleteFromWishlist query');
        });

});

app.post('/deleteFromCheckedOut', (req, res) => {
    console.log(req.body);
    const { bookID } = req.body;
    
    //Create the query:
    const query = "DELETE FROM checked_in_out WHERE bookID = '" + bookID + "' AND id = '" + myData + "';"; 
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
    const { bookID } = req.body;
    const date = new Date();
    if (date.getDate() > 28) {
        date.setDate(date.getDate() - 4) }
    date.setMonth(date.getMonth() + 2);
    const currentDate = date.toISOString().substr(0, 10);
    console.log(currentDate);
    //Create the query:
    const query = "INSERT INTO checked_in_out VALUES ('" + myData + "', '" + currentDate + "', 'true', '" + bookID + "');"
    //Query:
    client.query(query) 
        .then(result => {
            console.log('INSERTED: ' + query);
        })
        //Error occurred:
        .catch(err => {
            console.error('Failed to execute checkOut query:', err);
            res.status(500).send('Failed to execute checkOut query');
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
            console.error('Failed to execute wishlist query:', err);
            res.status(500).send('Failed to execute wishlist query');
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
            console.error('Failed to execute checked query:', err);
            res.status(500).send('Failed to execute checked query');
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
                console.error('Failed to execute getNextID query:', err);
                res.status(500).send('Failed to execute query');
            });
});

// Starts up the express server with the port:
app.listen(port);
console.log('Server started at http://localhost:' + port);