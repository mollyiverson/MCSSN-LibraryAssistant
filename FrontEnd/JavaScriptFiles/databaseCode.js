
//Code includes functions:

//Wishlist:
//checkWishlist()
//sendData()
//onDeleteButtonClick(constant)
//onInsertIntoWishlistClick(constant)

//Checked Out In:
//checkCheckedOut()
//getCheckOut_In()
//onCheckOutButtonClick(constant)

//CreateUser:
//checkUsername(username, callback)
//getLargestID(callback)
//createUser()

//Login:
//login()

//***********************************************************************8
//WISHLIST FUNCTIONS!!!
function checkWishlist(bookID) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        //Runs the script:
        var id = "0001"
        xhr.open("POST", "http://localhost:3000/checkWishlist", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var payload = ({ bookID: bookID, id: id });
        xhr.send(JSON.stringify( payload ));
        xhr.onreadystatechange = function () {
            //Checks the request:
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 404) {
                console.log("not found");
                resolve(xhr.responseText);
                
            }  
            if (xhr.status === 200) {
                console.log("found");
                reject(xhr.statusText);
            }
            else {
                console.error('Failed to make POST request:', xhr.status);
                reject(xhr.statusText);
            }
            };
        };
        console.log("Test")
        });        
    }

//function to get wishlist data and display in a table:
function sendData() {
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("GET", "http://localhost:3000/wishlist", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function () {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
        //Response from the function:
        var response = xhr.response;
        //Parses the response as it is originally a string but needs to become the returned list from the database:
        var response = JSON.parse(response)
        //Displays in a table:
        var table = '<table><tr><th>Number</th><th>BookID</th><th>Delete</th></tr>';
        for (var i = 0; i < response.length; i++) {
                //logs the row as a test:
                console.log(response[i]);
                //Displays isbn and id:
                table += '<tr><td>' + (i + 1) + '</td><td>' + response[i].bookid + '</td>' + '<td><button onclick="onDeleteButtonClick(\'' + response[i].bookid + '\')">Delete</button></td></tr>';
            }
            table += '</table>';
            document.getElementById("result").innerHTML = table;
    } else {
        console.error('Failed to make POST request:', xhr.status);
    }
    }
};
xhr.send(/* payload */);
};

//Code for deleting a wishlist item on a button click:
function onDeleteButtonClick(constant) {
alert("Deleting book: " + constant);
//Gets user typed values:
var book = constant;
var id = '0001';
console.log(constant);
//Generates id:
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("POST", "http://localhost:3000/deleteFromWishlist", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Set payload and send in string format:
var payload = ({ bookID: book, ID: id });
xhr.send(JSON.stringify( payload ));
console.log(JSON.stringify(payload));
xhr.onreadystatechange = function() {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    //Success:
    if (xhr.status === 200) {
        console.log("Deleted");
    } else {
        //Failure:
        console.error('Failed to make POST request:', xhr.status);
    }
    };
};
sendData()
};


//Puts a book into the wishlist on the click of a button:
function onInsertIntoWishlistClick(constant) {
//Gets user typed values:
var book = constant;
var id = '0001';
console.log(constant);
//Generates id:
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("POST", "http://localhost:3000/insertWishlistBook", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Set payload and send in string format:
var payload = ({ bookID: book, ID: id });
xhr.send(JSON.stringify( payload ));
console.log(JSON.stringify(payload));
xhr.onreadystatechange = function() {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    //Success:
    if (xhr.status === 200) {
        console.log("Inserted");
    } 
    else if (xhr.status === 409) {
        console.log("Cannot insert. Value already inserted.");
        alert("Book already wishlisted.");
    } else {
        //Failure:
        console.error('Failed to make POST request:', xhr.status);
    }
    };
};
sendData()
};

//***************************************************
//CHECKED OUT IN FUNCTIONS!!!
//Checks if a function is checked out
function checkCheckedOut(bookID) {
return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var id = "0001";
    //Runs the script:
    xhr.open("POST", "http://localhost:3000/checkCheckedOut", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var payload = ({ bookID: bookID, id: id });
    xhr.send(JSON.stringify( payload ));
    xhr.onreadystatechange = function () {
        //Checks the request:
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 404) {
            console.log("not found")
            resolve(xhr.responseText);
            
        }  
        if (xhr.status === 200) {
            console.log("found")
            reject(xhr.statusText);
        }
        else {
            console.error('Failed to make POST request:', xhr.status);
            reject(xhr.statusText);
        }
        };
    };
    console.log("Test")
    });
};
    

//Creates a table for checked out and checked in books:
function getCheckOut_In() {
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("GET", "http://localhost:3000/checked", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function () {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
        //Response from the function:
        var response = xhr.response;
        //Parses the response as it is originally a string but needs to become the returned list from the database:
        var response = JSON.parse(response)
        //Displays in a table:
        var table = '<table><tr><th>Number</th><th>BookID</th><th>Return Date</th><th>Checked Out</th></tr>';
        for (var i = 0; i < response.length; i++) {
                //logs the row as a test:
                console.log(response[i]);
                //Displays isbn and id:
                table += '<tr><td>' + (i + 1) + '</td><td>' + response[i].bookid + '</td><td>' + response[i].return_date.substr(0,10) + '</td><td>' + response[i].check_in + '</td></tr>';
            }
            table += '</table>';
            document.getElementById("result").innerHTML = table;
    } else {
        console.error('Failed to make POST request:', xhr.status);
    }
    }
};
xhr.send(/* payload */);
};

//Function to insert a book into checked_out_in as a checked out book on a button click:
function onCheckOutButtonClick(constant) {
alert("Checking Out Book: " + constant);
//Gets user typed values:
var book = constant;
var id = '0001';
console.log(constant);
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("POST", "http://localhost:3000/checkOut", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Set payload and send in string format:
var payload = ({ id: id, bookID: book });
xhr.send(JSON.stringify( payload ));
console.log(JSON.stringify(payload));
xhr.onreadystatechange = function() {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    //Success:
    if (xhr.status === 200) {
        console.log("Checked Out Book");
    } 
    else if (xhr.status === 409) {
        console.log("Cannot insert. Value already inserted.");
        alert("Book already checked out")
    }
    else {
        //Failure:
        console.error('Failed to make POST request:', xhr.status);
    }
    };
};
sendData()
};


//*****************************************************************8
///CREATEUSER FUNCTIONS!!!

//Checks a username to make sure that it is not used
function checkUsername(username, callback) {
return new Promise(function(resolve, reject) {
var xhr = new XMLHttpRequest();
//Runs the script:
call = false
xhr.open("POST", "http://localhost:3000/checkUsername", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
var payload = ({ username: username });
xhr.send(JSON.stringify( payload ));
xhr.onreadystatechange = function () {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 404) {
        console.log("not found")
        resolve(xhr.responseText);
        
    }  
    if (xhr.status === 200) {
        console.log("found")
        reject(xhr.statusText);
    }
    else {
        console.error('Failed to make POST request:', xhr.status);
        reject(xhr.statusText);
    }
    };
};
console.log("Test")
});
};


//Javascript code for getting maximum id and returning the next one:
function getLargestID(callback) {
var id = "0000";
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("GET", "http://localhost:3000/getNextID", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = function () {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        //Parse the response:
        response = JSON.parse(xhr.response);
        response = parseInt(response[0].max) + 1
        //Insert any 0's:
        while (response.toString().length < 4) {
            response = "0" + response.toString();
        };
        id = response;
        //Return the id:
        callback(id);
        } else {
            console.error('Failed to make POST request:', xhr.status);
        }
    };
};
xhr.send();
};

//Creates a user with the next id using form answers:
function createUser() {
//NOTE MAKE SURE email, username, password are ENTERED
//if (email.len() > 0)
//Gets user typed values:
var email = document.getElementById("email").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var id = "0000";
if (username.length > 3 && password.length > 3) {
    checkUsername(username) 
    .then(function(response){       //not found    
    console.log("testing");
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
            alert("User Created");
            console.log("Inserted");
        } else {
            //Failure:
            console.error('Failed to make POST request:', xhr.status);
        }
        };
    }
    });  
})
//Username already exists
.catch(function(error) { //found
alert("Username already exists. Choose a different one.");
});   
}
else {
alert("Username and password need to be more than 3 characters.");
} 
}

//*************************************************8
//LOGIN FUNCTIONS:
//Logins a user:
function login() {
//Gets user typed values:
var username2 = document.getElementById("username2").value;
var password2 = document.getElementById("password2").value;
console.log(username2 + password2);
//Generates id:
var xhr = new XMLHttpRequest();
//Runs the script:
xhr.open("POST", "http://localhost:3000/loginUser", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Set payload and send in string format:
var payload = ({ username: username2, password: password2 });
xhr.send(JSON.stringify( payload ));
console.log(JSON.stringify(payload));
xhr.onreadystatechange = function() {
    //Checks the request:
    if (xhr.readyState === XMLHttpRequest.DONE) {
    //Success:
    if (xhr.status === 200) {
        console.log("Logged In");
    } else {
        //Failure:
        console.error('Failed to make POST request:', xhr.status);
        alert("Incorrect username or password");
    }
    };
};
};