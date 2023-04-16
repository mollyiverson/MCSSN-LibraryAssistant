document.addEventListener('DOMContentLoaded', function () {
  const paginationWrapper = document.getElementById("pagination-wrapper");
  paginationWrapper.style.visibility = "hidden";
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var outputList = document.getElementById("list-output");
  var placeHldr = "/FrontEnd/Static(images)/image-not-found-icon.png";
  var booksNext = true;
  let currpage = 1;
  var searchData = ""; // keeps track of the last search
  var selectedMethod = "";

  // Searchs for a book when the user inputs data
  document.querySelector('.search-form').addEventListener('submit', search);

  // Calls functions when the next page, previous page, and back to the start buttons are clicked
  document.querySelector('.fa-circle').addEventListener('click', reset);
  document.querySelector('.fa-angle-right').addEventListener('click', nextPage);
  document.querySelector('.fa-angle-left').addEventListener('click', previousPage);

  // Calls the API with the search data
  function search(e) {
    paginationWrapper.style.visibility = "hidden";
    booksNext = true;
    outputList.innerHTML = "";
    e.preventDefault();
    searchData = document.getElementById("input").value;
    if (searchData.trim() === "" || searchData == null) {
      //displayError();
    } else {
      selectedMethod = document.querySelector('input[name="searchMethod"]:checked').value;
      useAPI(currpage, searchData, selectedMethod);
    }
  }

  // Goes to the next 10 results from the API
  function nextPage() {
    if (booksNext) {
      window.scroll(0, 0);
      paginationWrapper.style.visibility = "hidden";
      currpage++;
      outputList.innerHTML = "";
      useAPI(currpage, searchData, selectedMethod);
    }
  }

  // Goes to the starting 10 results from the API
  function reset() {
    window.scroll(0, 0);
    currpage = 1;
    paginationWrapper.style.visibility = "hidden";
    outputList.innerHTML = "";
    useAPI(currpage, searchData, selectedMethod);
  }

  // Goes to the previous 10 results from the API
  function previousPage() {
    if (currpage > 1) {
      window.scroll(0, 0);
      paginationWrapper.style.visibility = "hidden";
      booksNext = true;
      currpage--;
      outputList.innerHTML = "";
      useAPI(currpage, searchData, selectedMethod);
    }
  }

  // Gets data from Google Books API
  function useAPI(curr, searchData, selectedMethod) {
    if (selectedMethod == "isbn") {
      url = bookUrl + `isbn:${searchData}&maxResults=10&startIndex=` + (curr - 1) * 10;
    } else if (selectedMethod == "title") {
      url = bookUrl + `intitle:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;

    } else if (selectedMethod == "author") {
      url = bookUrl + `inauthor:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;

    } else if (selectedMethod == "subject") {
      url = bookUrl + `subject:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;
    } else {
      // default
      url = bookUrl + searchData + "&maxResults=10&startIndex=" + (curr - 1) * 10;
    }
    $.ajax({
      url: url,
      dataType: "json",
      beforeSend: function () {
      },
      success: function (response) {
        $(".book-list").css("visibility", "visible");
        let bookNotFound = response.totalItems === 0;
        if (bookNotFound) {
          booksNext = false;
          outputList.innerHTML += "<h1>No results found</h1>";
        } else {
          displayResults(response);
          paginationWrapper.style.visibility = "visible";
        }
      },
      error: function () {
        alert("Error - could not find book");
      }
    });
  }

  // Displays the books as boxes on the screen
  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 2) {
      // create a new row for each pair of cards
      var row = document.createElement("div");
      row.classList.add("row");

      // card 1
      var item = response.items[i];
      var title1 = item.volumeInfo.title;
      var author1 = item.volumeInfo.authors || "";
      var bookID = item.id;
      var bookImg1 = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
      var card1 = formatOutput(bookImg1, title1, author1, bookID);
      var col1 = document.createElement("div");
      col1.classList.add("col-lg-6");
      col1.appendChild(card1);
      row.appendChild(col1);

      if (i + 1 < response.items.length) {
        // card 2
        var item2 = response.items[i + 1];
        var title2 = item2.volumeInfo.title;
        var author2 = item2.volumeInfo.authors || "";
        var bookID2 = item2.id;
        var bookImg2 = item2.volumeInfo.imageLinks && item2.volumeInfo.imageLinks.thumbnail ? item2.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
        var card2 = formatOutput(bookImg2, title2, author2, bookID2);
        var col2 = document.createElement("div");
        col2.classList.add("col-lg-6");
        col2.appendChild(card2);
        row.appendChild(col2);
      }

      outputList.appendChild(row);
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
                  <button id="readButton" class="btn btn-secondary">Read Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = htmlCard;
    var button = wrapper.querySelector("#readButton");
    button.addEventListener('click', function () {
      localStorage.setItem("bookID", bookID);
      window.location.href = "book.html";
    });


    return wrapper.firstChild;
  }



  // SIDE BAR LOGIC

  // Changes the color of the filter button when it is selected
  const radioButtons = document.querySelectorAll('input[name="searchMethod"]');
  const containers = document.querySelectorAll('.sidebar-container');

  // When the sidebar container or button is clicked, change the color of the container
  containers.forEach(container => {
    const label = container.querySelector('label');
    container.addEventListener('click', () => {
      button.checked = true;
      containers.forEach(c => c.classList.remove('selected'));
      container.classList.add('selected');
    });
    label.addEventListener('click', () => {
      button.checked = true;
      containers.forEach(c => c.classList.remove('selected'));
      container.classList.add('selected');
    });
  });

  radioButtons.forEach(button => {
    button.addEventListener('change', () => {
      containers.forEach(container => {
        if (button.id === container.id.replace("-container", "")) {
          container.classList.add('selected');
        } else {
          container.classList.remove('selected');
        }
      });
    });
  });

  // Clicks the default button first  
  const radioButton = document.querySelector('#default');
  radioButton.click();

});

