document.addEventListener('DOMContentLoaded', function () {
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
});