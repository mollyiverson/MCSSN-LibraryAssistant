    
// var audio = new Audio('/FrontEnd/Static(images)/catch-it-117676.mp3');
// audio.play();

var audio = document.getElementById("myAudio");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");

  playButton.addEventListener("click", function() {
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  });

  pauseButton.addEventListener("click", function() {
    audio.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "block";
  });

        /* End of sound logic */

print(searchBooks("9780310709626"))

function getBooks(id) {
      href = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
      resp = href(api + id);
      data = json.load(resp);
      print(data["items"]);

      displayBook(data);
}


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
  }

   // Example usage:
  search("The Hitchhiker's Guide to the Galaxy", (error, books) => {
  if (error) {
    console.error(error);
  } else {
    const book = books[0];
    displayBook(book);
  }
  });

});



function countChecksByType(type){

    var checkMarksOfType = document.getElementsByName(type);
    var totalChecked = 0;
  
    for(var i = 0; i < checkMarksOfType.length; i++ )
    {
      if(checkMarksOfType[i].checked)
      {
          totalChecked++;
      }
    }
    return totalChecked;
  }
  
  function reccomend()
  {
  
    var a = countChecksByType("good");  // 1
    var c = countChecksByType("ok"); // 1
    var e = countChecksByType("bad");  // 1
    var h = countChecksByType("worse");  // 1

    var b = countChecksByType("goood");  // 1
    var d = countChecksByType("okk"); // 1
    var f = countChecksByType("baad");  // 1
    var i = countChecksByType("worsee");  // 1
    var g = countChecksByType("baaad");  // 1

     // creation of my own 
     // As long as the user select an option, the user receives a book recommendation related to that feeling
          
     if( a == 1 && b == 1 && c == 1 && d == 1 && e == 1 && f == 1 
      && g == 1 && h == 1 && i == 1  ) {
      alert("Reccomended reading: Happiness, joy, excitement books");
      alert("Reccomended reading: Contentment, satisfaction, relaxation books");
      alert("Reccomended reading: confusion books");
      alert("Reccomended reading: Despair, hopelessness, distress books");
      alert("Reccomended reading: Anger, frustration, hostility books");
      alert("Reccomended reading: Fear, apprehension, panic books");
      alert("Reccomended reading: Disgust, revulsion, aversion books");
      alert("Reccomended reading: Sadness, disappointment, grief books");
      alert("Reccomended reading: Guilt, regret, shame books");
     }

     //write this above first
     let book1 = document.createElement('book1');
     book1.target = '_blank';
     book1.href = 'https://www.google.com';

      if( a >= 1 )
       {
        alert("Reccomended reading: Happiness, joy, excitement books");
        //location.assign("dep.html");

        // alert("Reccomended reading: Happiness, joy, excitement books");
        // location.assign("http://127.0.0.1:5500/FrontEnd/Templates(html_files)/book.html");
        // alert("http://127.0.0.1:5500/FrontEnd/Templates(html_files)/book.html");

        if (window.confirm('Click "ok" to confirm. Click Cancel to stay here')) 
          {
             window.location.href="http://127.0.0.1:5500/FrontEnd/Templates(html_files)/book.html";
             //windown.open('http://127.0.0.1:5500/FrontEnd/Templates(html_files)/book.html', '_blank');
            //  book1.click();
          };

       }


      

      if( b >= 1 ) {
        alert("Reccomended reading: Contentment, satisfaction, relaxation books");
      }

      if( c >=1 ) {
        alert("Reccomended reading: confusion books");
      }

      if( d >=1 ) {
        alert("Reccomended reading: Despair, hopelessness, distress books");
      }

      if( e >=1 ) {
        alert("Reccomended reading: Anger, frustration, hostility books");
      }

      if( f >=1 ) {
        alert("Reccomended reading: Fear, apprehension, panic books");
      }

      if( g >=1 ) {
        alert("Reccomended reading: Disgust, revulsion, aversion books");
      }

      if( h >=1 ) {
        alert("Reccomended reading: Sadness, disappointment, grief books");
      }

      if( i >=1 ) {
        alert("Reccomended reading: Guilt, regret, shame books");
      }

  }
