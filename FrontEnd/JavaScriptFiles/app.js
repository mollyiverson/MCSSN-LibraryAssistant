//NOTE: Make sure if you are using school wifi you are using 
//WSU wireless and not WSU guest. WSU guest brings up some
//issues for some reason.

//Steps to download node js:
//Download for system and set path:
//https://nodejs.org/en/download
//Run in visual studios terminal:
// 'npm install'
// 'npm install pg'


// Run code with 'node app.js' in the terminal

const { Client } = require('pg')
//const mysql = require('mysql')
//const dotenv = require('dotenv')
//dotenv.config()
const client = new Client({
  user: 'caitlingraves',
  password: 'Duke2023',
  host: 'library.postgres.database.azure.com',
  port: 5432,
  database: 'postgres',
  ssl:true,
  authentication: {
    type: 'default'
  },
  set: {sslmode: 'require'},
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  client.query("SELECT * FROM profile;", function (err, result) {
    if (err) throw err;
    console.log(result);
    //Note: You need client.end() so that the code can end.
    //I assume in our code we will want client.end() after all
    //queries are called.
    client.end()
  });
  
});


//SOME SQL Notes:
// HOW TO SHOW A FULL TABLE:
//"SELECT * FROM [TABLE];"
//EXAMPLE:
/* client.query("SELECT * FROM wishlist;", function (err, result) {
  if (err) throw err;
  console.log(result);
  client.end()
}); */
//Note: SQL is not strict with names. For example, you can use either wishlist or Wishlist to call the table.

//HOW TO SELECT A SPECIFIC VALUE:
//EXAMPLE (SELECTS ALL USERNAMES AND PASSWORDS):
//"SELECT userName, password FROM Profile;"
//EXAMPLE (SELECTS ALL USERNAMES AND PASSWORDS THAT MATCH THE ID):
//"SELECT userName, password FROM PROFILE
//WHERE ID = '1111';"

// HOW TO INSERT:
// "INSERT INTO [TABLE] VALUES ([ATTRIBUTES]);"
//EXAMPLE:
// client.query("INSERT INTO Profile VALUES ('cgraves@gmail.com', '4235338765', 'Duke2023', 'calico', 'Caitlin', 'Graves', '1111');", function(err, result) {
  //if (err) throw err;
//});