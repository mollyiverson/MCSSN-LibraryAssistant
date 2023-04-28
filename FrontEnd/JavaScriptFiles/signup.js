document.addEventListener('DOMContentLoaded', function () {app.post('/createUser', (req, res) => {
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
    const generalQuery = "INSERT INTO GeneralUser (ID) VALUES ('" + userID + "');";
    client.query(generalQuery);
});
});