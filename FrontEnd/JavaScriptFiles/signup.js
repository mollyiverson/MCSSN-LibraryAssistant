/* 
document.getElementById('signfirst-btn').onclick = function() 
{
  
  /*var email = document.getElementById('Email').value;
  var password = document.getElementById('Password').value;
  var username = document.getElementById('Username').value;
  alert(email); 
  const { Client } = require('pg')
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
  client.connect(function(err){
    if (err) throw err;
    console.log("Connected!");

    //client.query("INSERT INTO Profile VALUES ('" + email + "', '1111111112', '" + password + "', '" + user +"', 'testFirst1', 'testLast1', '0002');", function(err, result) 
    client.query("INSERT INTO Profile VALUES ('testingsingup', '1111111112', 'testingsingup', 'testingsingup', 'testFirst1', 'testLast1', '0002');", function(err, result) 
    {
      if (err) throw err;
      client.end();
    });
});
}
*/
/*
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
  
});*/

      //Creates a user with the next id using form answers:
      function createUser() {
        //Gets user typed values:
        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var id = "0000";
        //Generates id:
        getLargestID(function(id) {
          console.log(id);
          var xhr = new XMLHttpRequest();
          //Runs the script:
          xhr.open("POST", "http://localhost:3000/createUser", true);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          //Set payload and send in string format:
          var payload = ({ email: email, username: username, password: password, id:id });
          xhr.send(JSON.stringify( payload ));
          xhr.onreadystatechange = function() {
            //Checks the request:
            if (xhr.readyState === XMLHttpRequest.DONE) {
              //Success:
              if (xhr.status === 200) {
                console.log("Inserted");
              } else {
                //Failure:
                console.error('Failed to make POST request:', xhr.status);
              }
            }
          };  
        });
      };