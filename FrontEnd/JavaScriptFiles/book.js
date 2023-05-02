document.addEventListener('DOMContentLoaded', function () {

    window.onload = function () {
        if (!localStorage.getItem("bookID")) // the value of the current user should have been set when they log in
        {
            alert("Error! No book selected");
        } else {



            var searchData = localStorage.getItem("bookID");
            search();
            console.log("update called")
            //Checks if a book is checked out:
            checkCheckedOut(searchData)
                //Book not in checked:
                .then(function (response) {
                    const button = document.getElementById("checkoutButton");
                    button.disabled = false
                    button.textContent = "Check out";
                    //Adds the book to checked when the button is pressed:
                    button.addEventListener("click", function () {
                        onCheckOutButtonClick(searchData)
                        console.log("checkout clicked");
                        const button = document.getElementById("checkoutButton");
                        button.textContent = "Checked out";
                        button.disabled = true;
                    });
                })
                //Book found in checked:
                .catch(function (error) { //found
                    const button = document.getElementById("checkoutButton");
                    button.textContent = "Checked out";
                    //Disables button:
                    button.disabled = true;
                });
            //Checks if a book is already in wishlist:
            checkWishlist(searchData)
                //Book not in wishlist:
                .then(function (response) {       //not found    
                    const button = document.getElementById("wishlistButton");
                    button.disabled = false
                    button.textContent = "Wishlist Book";
                    //Adds the book to wishlist when the button is pressed:
                    button.addEventListener("click", function () {
                        onInsertIntoWishlistClick(searchData)
                        console.log("wishlist clicked");
                        const button = document.getElementById("wishlistButton");
                        button.textContent = "Wishlisted Book";
                        //Disables button:
                        button.disabled = true;
                    });
                })
                //Book in wishlist:
                .catch(function (error) { //found
                    const button = document.getElementById("wishlistButton");
                    button.textContent = "Wishlisted Book";
                    //Disables button:
                    button.disabled = true;
                });
        }

    }

    var bookUrl = "https://www.googleapis.com/books/v1/volumes/";
    var bookDisplay = document.getElementById("book-output");
    var placeHldr = "/FrontEnd/Static(images)/image-not-found-icon.png";


    function search() {
        //bookDisplay.innerHTML = "";
        var searchData = localStorage.getItem("bookID");
        //document.getElementById('here').innerHTML = searchData;
        useAPI(searchData);
    }


    function useAPI(searchData) {
        url = bookUrl + searchData;
        $.ajax({
            url: url,
            dataType: "json",
            beforeSend: function () {
            },
            success: function (response) {
                displayResults(response);
            },
            error: function () {
                alert("Error - try again!");
            }
        });
    }

    function displayResults(response) {

        if (!response || response.length === 0) {
            bookDisplay.innerHTML += "<h1>No results found</h1>";
            return;
        }

        // var row = document.createElement("div");
        // row.classList.add("row");

        // gets book info 

        var previewLink = response.volumeInfo.previewLink;
        var previewButton = document.getElementById("readButton");
        previewButton.innerHTML = "<a href='" + previewLink + "' target='blank'>Read Now</a>";

        /*
        var webReaderLink = response.accessInfo.webReaderLink;
        var previewButton = document.getElementById("readButton");
        previewButton.innerHTML = "<a href='" + webReaderLink + "' target='blank'>Read Now</a>";

        
        previewButton.addEventListener("click", function(event) {
        event.preventDefault(); // prevent default behavior of following the link
        var bookID = response.id;
        window.location.href = "readBook5.html?id=" + bookID; // replace with the path to your file
        });
        */

        var title1 = response.volumeInfo.title;
        var author1 = response.volumeInfo.authors || "";

        var publisher1 = response.volumeInfo.publisher || "";
        var bookID = response.id;

        var bookIsbn = response.volumeInfo.industryIdentifiers && response.volumeInfo.industryIdentifiers.length >= 2 ? response.volumeInfo.industryIdentifiers[0].identifier : "ISBN not available";
        var bookImg1 = response.volumeInfo.imageLinks && response.volumeInfo.imageLinks.thumbnail ? response.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
        var bookDesc = response.volumeInfo.description || "";

        // Sets image
        var img = document.getElementById("bookcover");
        img.setAttribute("src", bookImg1);
        if (bookImg1 !== placeHldr) {
            img.style.borderRight = "5px solid black";
        }


        var title = document.getElementById("title");
        title.innerHTML += '<div class="row mt-4">' + '<h1 style= "font-family: Cambria, serif; font-size: 40px">' + title1 + '</h1> </div';

        var author = document.getElementById("author");
        author.innerHTML += '<div class="row mt-4">' + '<h1 style= "font-family: Cambria, serif; font-size: 30px">' + author1 + '</h1> </div';

        var publisher = document.getElementById("publisher");
        publisher.innerHTML += '<div class="row mt-4">' + '<h1 style= "font-size: 15px; font-family: Cambria, serif">' + publisher1 + '</h1> </div';

        var description = document.getElementById("description");
        description.innerHTML += '<div class="row mt-4">' + '<p>' + bookDesc + '</p> </div';

    }
    //Checks if a book is already checked out:
    function checkCheckedOut(bookID) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var id = "0001"
            //Runs the script:
            xhr.open("POST", "http://localhost:3000/checkCheckedOut", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            var payload = ({ bookID: bookID, id: id });
            xhr.send(JSON.stringify(payload));
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
});
//Checks if a book is already wishlisted:
function checkWishlist(bookID) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        //Runs the script:
        var id = "0001"
        xhr.open("POST", "http://localhost:3000/checkWishlist", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var payload = ({ bookID: bookID, id: id });
        xhr.send(JSON.stringify(payload));
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
    });
}
//Inserts to CheckOut:
function onCheckOutButtonClick(constant) {
    alert("Checking Out Book: " + constant);
    //Gets user typed values:
    var book = constant
    console.log(constant);
    var xhr = new XMLHttpRequest();
    //Runs the script:
    xhr.open("POST", "http://localhost:3000/checkOut", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //Set payload and send in string format:
    var payload = ({bookID: book });
    xhr.send(JSON.stringify(payload));
    console.log(JSON.stringify(payload));
    xhr.onreadystatechange = function () {
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
};

//Puts a book into the wishlist on the click of a button:
function onInsertIntoWishlistClick(constant) {
    //Gets user typed values:
    var book = constant
    console.log(constant);
    //Generates id:
    var xhr = new XMLHttpRequest();
    //Runs the script:
    xhr.open("POST", "http://localhost:3000/insertWishlistBook", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //Set payload and send in string format:
    var payload = ({ bookID: book});
    xhr.send(JSON.stringify(payload));
    console.log(JSON.stringify(payload));
    xhr.onreadystatechange = function () {
        //Checks the request:
        if (xhr.readyState === XMLHttpRequest.DONE) {
            //Success:
            if (xhr.status === 200) {
                console.log("Inserted");
            }
            else if (xhr.status === 409) {
                console.log("Cannot insert. Value already inserted.");
                alert("Book already wishlisted.")
            } else {
                //Failure:
                console.error('Failed to make POST request:', xhr.status);
            }
        };
    };
};




/*
    function readBook() {
        // Get the ID of the book from the URL parameters
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
      
        // Fetch data for the book using the Google Books API
        // const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
        const url = bookDisplay;
        const apiKey = "AIzaSyBhAizzEwMNbNSU8U3omaRwHw1dw1oTIgs";
      
        fetch(`${url}?key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            const previewLink = data.volumeInfo.previewLink;
            // Open the book in a new window or tab
            window.open(previewLink, "_blank");
          })
          .catch(error => console.log(error));
      }

      const button = document.getElementById("readButton");
      button.addEventListener("click", readBook())
    */