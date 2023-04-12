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