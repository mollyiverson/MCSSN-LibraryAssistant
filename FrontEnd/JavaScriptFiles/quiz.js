// Audio Logic

var audio = document.getElementById("myAudio");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");

playButton.addEventListener("click", function () {
   audio.play();
   playButton.style.display = "none";
   pauseButton.style.display = "block";
});

pauseButton.addEventListener("click", function () {
   audio.pause();
   pauseButton.style.display = "none";
   playButton.style.display = "block";
});

// Keep track of the option selected
function countChecksById(id) {
   const checkboxes = document.querySelectorAll(`input[type="radio"][name="book"][id="${id}"]`);
   let count = 0;
   checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
         count++;
      }
   });
   return count;
}

function recommend(event) {
   event.preventDefault();
   var a = countChecksById("happy");  // 1
   var c = countChecksById("confused"); // 1
   var e = countChecksById("anger");  // 1
   var g = countChecksById("sad");  // 1

   var b = countChecksById("content");  // 1
   var d = countChecksById("despair"); // 1
   var f = countChecksById("fear");  // 1
   var h = countChecksById("guilt");  // 1

   // Getting the IDS of the books we want to display from the API
   var happyBooks = ['7GlqKE_s4vwC', '9CPXCwAAQBAJ', 'OkwVkUv2yYcC'];
   var contentBooks = ['nGLibwAACAAJ', '6t9M6EvD0tAC', '-IPSJjbtYoQC'];
   var confusedBooks = ['Xo9MAAAAIAAJ', 'pTr44Sx6oWQC', 'MLacAgAAQBAJ'];
   var despairBooks = ['whlgAAAAMAAJ', 'MhkKyAEACAAJ', 'LNsMvgAACAAJ'];
   var angryBooks = ['x-OVAwAAQBAJ', '2E6PEAAAQBAJ', 'aDDeRMWIqw4C'];
   var fearBooks = ['gKeOqLFgQ8oC', 'UvXWAAAAMAAJ', 'CdZIn4b9s4UC'];
   var sadBooks = ['0Z8HoLfjOQQC', 'hJpExsJiTW8C', 'sEH18bk4wakC'];
   var guiltBooks = ['Ut-jmAEACAAJ', 'kKhPEAAAQBAJ', 'uLMhEAAAQBAJ'];

   // As long as the user select an option, the user receives a book recommendation related to that feeling

   if (a == 1) {
      var randomBookId = happyBooks[Math.floor(Math.random() * happyBooks.length)];
      displayBookPage(randomBookId);
   }

   if (b == 1) {
      var randomBookId = contentBooks[Math.floor(Math.random() * contentBooks.length)];
      displayBookPage(randomBookId);
   }

   if (c == 1) {
      var randomBookId = confusedBooks[Math.floor(Math.random() * confusedBooks.length)];
      displayBookPage(randomBookId);
   }

   if (d == 1) {
      var randomBookId = despairBooks[Math.floor(Math.random() * despairBooks.length)];
      displayBookPage(randomBookId);
   }

   if (e == 1) {
      var randomBookId = angryBooks[Math.floor(Math.random() * angryBooks.length)];
      displayBookPage(randomBookId);
   }

   if (f == 1) {
      var randomBookId = fearBooks[Math.floor(Math.random() * fearBooks.length)];
      displayBookPage(randomBookId);
   }

   if (g == 1) {
      var randomBookId = sadBooks[Math.floor(Math.random() * sadBooks.length)];
      displayBookPage(randomBookId);
   }

   if (h == 1) {
      var randomBookId = guiltBooks[Math.floor(Math.random() * guiltBooks.length)];
      displayBookPage(randomBookId);
   }
}


function displayBookPage(bookId) {
   localStorage.setItem("bookID", bookId);
   window.location.href = "/FrontEnd/Templates(html_files)/book.html";
   var link = "/FrontEnd/Templates(html_files)/book.html";
   window.location.href = link;
}
