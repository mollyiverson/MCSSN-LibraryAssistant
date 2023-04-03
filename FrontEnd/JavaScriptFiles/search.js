document.addEventListener('DOMContentLoaded', function () {
  let currpage = 1;
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var outputList = document.getElementById("list-output");
  var placeHldr = '<img src="/FrontEnd/Static(images)/image-not-found-icon.png">';

  document.querySelector('.search-form').addEventListener('submit', search);

  function search(e) {
    outputList.innerHTML = "";
    e.preventDefault();
    let searchData = document.getElementById("input").value;
    // let searchMethod = document.querySelector('input[name="choice"]:checked').value;
    if (searchData.trim() === "" || searchData == null) {
      displayError();
    } else {
      useAPI(currpage, searchData);
    }

  }

  // If we want to implement arrows for viewing the next page of book results
  function nextPage() {
    let searchData = document.getElementById("input").value;
    // let searchMethod = document.querySelector('input[name="choice"]:checked').value;
    currPage++;
    useAPI(currPage, searchData);
  }

  function previousPage() {
    let searchData = document.getElementById("input").value;
    // let searchMethod = document.querySelector('input[name="choice"]:checked').value;
    currPage--;
    useAPI(currPage, searchData);
  }



  function useAPI(curr, searchData) {
    //let url = `https://www.googleapis.com/books/v1/volumes?q="${searchData}"&maxResults=10&startIndex=` + (curr - 1) * 10
    url = bookUrl + searchData
    $.ajax({
      url: url,
      dataType: "json",
      beforeSend: function () {
      },
      success: function (response) {
        $(".book-list").css("visibility", "visible");
        displayResults(response);
      },
      error: function () {
        alert("Error - try again!");
      }
    });
  }

  // Will need to make code more unique
  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
      bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

      // in production code, item.text should have the HTML entities escaped.
      outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
        formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
        '</div>';

    }

  }

  // Will need to make code more unique
  function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
    var viewUrl = 'book.html?isbn=' + bookIsbn; //constructing link for bookviewer
    var htmlCard = `<div class="col-lg-6">
          <div class="card" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${bookImg}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">Author: ${author}</p>
                  <p class="card-text">Publisher: ${publisher}</p>
                  <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    return htmlCard;
  }

  function displayError() {
    alert("Search term can not be empty!")
  }

});