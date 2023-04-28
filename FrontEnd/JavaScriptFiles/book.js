document.addEventListener('DOMContentLoaded', function () {

    window.onload = function () {
        search();
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
        title.innerHTML += '<div class="row mt-4">' + '<h1>' + title1 + '</h1> </div';

        var title = document.getElementById("author");
        title.innerHTML += '<div class="row mt-4">' + '<h1>' + author1 + '</h1> </div';

        var title = document.getElementById("publisher");
        title.innerHTML += '<div class="row mt-4">' + '<h1>' + publisher1 + '</h1> </div';

        var title = document.getElementById("publisher");
        title.innerHTML += '<div class="row mt-4">' + '<p>' + bookDesc + '</p> </div';

    }
});

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