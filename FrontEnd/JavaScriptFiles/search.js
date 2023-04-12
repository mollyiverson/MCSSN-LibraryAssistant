document.addEventListener('DOMContentLoaded', function () {
  let currpage = 1;
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var outputList = document.getElementById("list-output");
  var placeHldr = "/FrontEnd/Static(images)/image-not-found-icon.png";


  document.querySelector('.search-form').addEventListener('submit', search);

  function search(e) {
    outputList.innerHTML = "";
    e.preventDefault();
    let searchData = document.getElementById("input").value;
    if (searchData.trim() === "" || searchData == null) {
      //displayError();
    } else {
      useAPI(currpage, searchData);
    }

  }

  // If we want to implement arrows for viewing the next page of book results
  function nextPage() {
    let searchData = document.getElementById("input").value;
    // let searchMethod = document.querySelector('input[name="searchMethod"]:checked').value;
    currPage++;
    useAPI(currPage, searchData);
  }

  function previousPage() {
    let searchData = document.getElementById("input").value;
    // let searchMethod = document.querySelector('input[name="searchMethod"]:checked').value;
    currPage--;
    useAPI(currPage, searchData);
  }



  function useAPI(curr, searchData) {
    var url; //= `https://www.googleapis.com/books/v1/volumes?q="${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10
    var selectedMethod = document.querySelector('input[name="searchMethod"]:checked').value;
    if (selectedMethod == "isbn") {
      url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchData}&maxResults=10&startIndex=` + (curr - 1) * 10;
    } else if (selectedMethod == "title") {
      url = `https://www.googleapis.com/books/v1/volumes?q=intitle:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;

    } else if (selectedMethod == "author") {
      url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;

    } else if (selectedMethod == "subject") {
      url = `https://www.googleapis.com/books/v1/volumes?q=subject:"${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10;
    } else {
      // default
      url = bookUrl + searchData;
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
          outputList.innerHTML += "<h1>No results found</h1>";
        } else {
          displayResults(response);
        }
      },
      error: function () {
        alert("Error - try again!");
      }
    });
  }

function displayResults(response) {
  for (var i = 0; i < response.items.length; i += 2) {
    // create a new row for each pair of cards
    var row = document.createElement("div");
    row.classList.add("row");

    // card 1
    var item = response.items[i];
    var title1 = item.volumeInfo.title;
    var author1 = item.volumeInfo.authors || "";
    var publisher1 = item.volumeInfo.publisher || "";
    var bookLink1 = item.volumeInfo.previewLink || "";
    var bookID = item.id;
    var bookIsbn = item.volumeInfo.industryIdentifiers && item.volumeInfo.industryIdentifiers.length >= 2 ? item.volumeInfo.industryIdentifiers[0].identifier : "ISBN not available";
    var bookImg1 = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
    var card1 = formatOutput(bookImg1, title1, author1, bookID, bookLink1, bookIsbn);
    var col1 = document.createElement("div");
    col1.classList.add("col-lg-6");
    col1.appendChild(card1);
    row.appendChild(col1);

    if (i + 1 < response.items.length) {
      // card 2
      var item2 = response.items[i + 1];
      var title2 = item2.volumeInfo.title;
      var author2 = item2.volumeInfo.authors || "";
      var publisher2 = item2.volumeInfo.publisher || "";
      var bookLink2 = item2.volumeInfo.previewLink || "";
      var bookID2 = item2.id;
      var bookIsbn2 = item2.volumeInfo.industryIdentifiers && item2.volumeInfo.industryIdentifiers.length >= 2 ? item2.volumeInfo.industryIdentifiers[0].identifier : "ISBN not available";
      var bookImg2 = item2.volumeInfo.imageLinks && item2.volumeInfo.imageLinks.thumbnail ? item2.volumeInfo.imageLinks.thumbnail : placeHldr || "image not available";
      var card2 = formatOutput(bookImg2, title2, author2, bookID2, bookLink2, bookIsbn2);
      var col2 = document.createElement("div");
      col2.classList.add("col-lg-6");
      col2.appendChild(card2);
      row.appendChild(col2);
    }

    outputList.appendChild(row);
  }
}

  function formatOutput(bookImg, title, author, bookID, bookLink, bookIsbn) {
    var viewUrl = 'book.html?id=' + bookID; //constructing link for bookviewer
    var htmlCard = `<div class="col-lg-11">
          <div class="card" style="">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${bookImg}" class="card-img" alt="...">
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
      localStorage["bookID"] = bookID;
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

