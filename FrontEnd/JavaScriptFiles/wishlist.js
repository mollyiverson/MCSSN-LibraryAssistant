document.addEventListener('DOMContentLoaded', function () {
    // pagnination wrapper
    const paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.style.visibility = "hidden";

    // wishlist data
    const books = [];
    bookCount = 0;
    currentIndex = 0;
    const booksPerPage = 10;

    // displaying books
    var bookUrl = "https://www.googleapis.com/books/v1/volumes/";
    var outputList = document.getElementById("list-output");
    var placeHldr = "/FrontEnd/Static(images)/image-not-found-icon.png";
    var row = document.createElement("div");

    // Calls functions when the next page, previous page, and back to the start buttons are clicked
    document.querySelector('.fa-circle').addEventListener('click', reset);
    document.querySelector('.fa-angle-right').addEventListener('click', nextPage);
    document.querySelector('.fa-angle-left').addEventListener('click', previousPage);



    window.onload = function () {
        if (!localStorage.getItem("currentUser")) // the value of the current user should have been set when they log in
        {
            localStorage.currentUser = "0001";
        }
        sendData();
    }

    function sendData() {
        books.length = 0;
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
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].id.trim() == localStorage.getItem("currentUser")) {
                            //logs the row as a test:
                            console.log(response[i]);
                            books[bookCount] = response[i].bookid;
                            bookCount = bookCount + 1;
                        }
                    }
                    getBookData();
                } else {
                    console.error('Failed to make POST request:', xhr.status);
                }
            }
        };
        xhr.send(/* payload */);
    }

    function getBookData() {
        max = currentIndex + booksPerPage;
        for (var i = currentIndex; i < max; i++) {
            if (i < bookCount) {
                if (i % 2 == 0) {
                    row.classList.add("row"); // add row class to row variable
                    useAPI(i, row);
                }
                else {
                    useAPI(i, row);
                }
                currentIndex++;
            }
        }
        outputList.appendChild(row); // append row to outputList after all books are added
    }

    // search for the books
    function useAPI(index, row) {
        url = bookUrl + books[index];
        $.ajax({
            url: url,
            dataType: "json",
            beforeSend: function () {
            },
            success: function (response) {
                displayResults(response, row);


            },
            error: function () {
                alert("Error - try again!");
            }
        });
    }

    function displayResults(response, row) {
        if (!response || response.length === 0) {
            alert("Book ID incorrect");
            return;
        } else if (response.length > 1) {
            alert("Book ID incorrect");
            return;
        }

        // card 1
        var title1 = response.volumeInfo.title;
        var author1 = response.volumeInfo.authors || "";
        var bookID = response.id;
        var bookImg1 = response.volumeInfo.imageLinks && response.volumeInfo.imageLinks.thumbnail ? response.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
        var card1 = formatOutput(bookImg1, title1, author1, bookID);
        var col1 = document.createElement("div");
        col1.classList.add("col-lg-6");
        col1.appendChild(card1);
        row.appendChild(col1);
        outputList.appendChild(row);

        // displays the prev/next/current page buttons after all books have been displayed
        if (currentIndex >= bookCount || currentIndex >= max) {
            paginationWrapper.style.visibility = "visible";
        }
    }

    function formatOutput(bookImg, title, author, bookID) {
        var htmlCard = `<div class="col-lg-11">
              <div class="card" style="">
                <div class="row no-gutters">
                  <div class="col-md-6">
                    <img src="${bookImg}" class="card-img" alt="book cover" height="300">
                  </div>
                  <div class="col-md-5">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${author}</p>
                      <button id="checkOutButton" class="btn btn-secondary">Check out book</button>
                      <button id="wishlistButton" class="btn btn-secondary">Remove from wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

        var wrapper = document.createElement('div');
        wrapper.innerHTML = htmlCard;
        var button = wrapper.querySelector("#wishlistButton");
        button.addEventListener('click', function () {
            onDeleteButtonClick(bookID);
        });
        return wrapper.firstChild;
    }

    function onDeleteButtonClick(constant) {
        alert("Deleting book: " + constant);
        
        //Gets user typed values:
        var book = constant;
        var id = localStorage.currentUser;
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
              bookCount--;
            } else {
              //Failure:
              console.error('Failed to make POST request:', xhr.status);
            }
          };

        };
        currentIndex = 1;
        outputList.innerHTML = "";
        row.innerHTML = "";
        sendData()
      };


    // Goes to the next 10 results from the wishlist
    function nextPage() {
        if (currentIndex < bookCount) {
            window.scroll(0, 0);
            paginationWrapper.style.visibility = "hidden";
            outputList.innerHTML = "";
            row.innerHTML = "";
            getBookData();
        }
    }

    // Goes to the starting 10 results from the wishlist
    function reset() {
        paginationWrapper.style.visibility = "hidden";
        window.scroll(0, 0);
        currentIndex = 0;
        outputList.innerHTML = "";
        row.innerHTML = "";
        getBookData();
    }

    // Goes to the previous 10 results from the wishlist
    function previousPage() {
        if (currentIndex > booksPerPage) {
            window.scroll(0, 0);
            paginationWrapper.style.visibility = "hidden";
            currentIndex -= booksPerPage;
            outputList.innerHTML = "";
            row.innerHTML = "";
            getBookData();
        }
    }
});
