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
      // book 1

      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;

      // if no author
      if (author1 == undefined) {
        author1 = "";
      }
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookID = item.id;

      // if no isbn
      if (item.volumeInfo.industryIdentifiers && item.volumeInfo.industryIdentifiers.length >= 2) {
        bookIsbn = item.volumeInfo.industryIdentifiers[0].identifier; // isbn 13 not 10
      } else {
        bookIsbn = "ISBN not available";
      }

      // if no image
      if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
        bookImg1 = item.volumeInfo.imageLinks.thumbnail;
      } else if (placeHldr) {
        bookImg1 = placeHldr;
      } else {
        bookImg1 = "image not available";
      }

      if (i + 1 < response.items.length) {
        // book 2
        item2 = response.items[i + 1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        if (author2 == undefined) {
          author2 = "";
        }
        publisher2 = item2.volumeInfo.publisher;
        bookLink2 = item2.volumeInfo.previewLink;
        bookID2 = item2.id;

        // if no isbn
        if (item2.volumeInfo.industryIdentifiers && item2.volumeInfo.industryIdentifiers.length >= 2) {
          bookIsbn2 = item2.volumeInfo.industryIdentifiers[0].identifier;
        } else {
          bookIsbn2 = "ISBN not available";
        }

        // if no image
        if (item2.volumeInfo.imageLinks && item2.volumeInfo.imageLinks.thumbnail) {
          bookImg2 = item2.volumeInfo.imageLinks.thumbnail;

        } else if (placeHldr) {
          bookImg2 = placeHldr;
        } else {
          bookImg2 = "image not available";
        }

        outputList.innerHTML += '<div class="row mt-4">' +
          formatOutput(bookImg1, title1, author1, bookID, bookLink1, bookIsbn) +
          formatOutput(bookImg2, title2, author2, bookID2, bookLink2, bookIsbn2) +
          '</div>';

      } else {
        outputList.innerHTML += '<div class="row mt-4">' +
          formatOutput(bookImg1, title1, author1, bookID, bookLink1, bookIsbn) +
          '</div>';
      }
    }
  }

  function formatOutput(bookImg, title, author, bookID, bookLink, bookIsbn) {
    var viewUrl = 'book.html?isbn=' + bookID; //constructing link for bookviewer
    var htmlCard = `<div class="col-lg-6">
          <div class="card" style="">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${bookImg}" class="card-img" alt="...">
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${author}</p>
                  <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    return htmlCard;
  }

  function displayError() {
    alert("Search term can not be empty!");
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

