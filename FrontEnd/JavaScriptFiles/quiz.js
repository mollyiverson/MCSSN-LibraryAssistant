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

function recommend() {
   var a = countChecksById("good");  // 1
   var c = countChecksById("ok"); // 1
   var e = countChecksById("bad");  // 1
   var g = countChecksById("worse");  // 1

   var b = countChecksById("goood");  // 1
   var d = countChecksById("okk"); // 1
   var f = countChecksById("baad");  // 1
   var h = countChecksById("worsee");  // 1

   // Getting the IDS of the books we want to display from the API
   var goodBooks = ['7GlqKE_s4vwC','9CPXCwAAQBAJ','OkwVkUv2yYcC'];
   var gooodBooks = ['nGLibwAACAAJ','6t9M6EvD0tAC','-IPSJjbtYoQC'];
   var okBooks = ['Xo9MAAAAIAAJ','pTr44Sx6oWQC','MLacAgAAQBAJ'];
   var okkBooks = ['whlgAAAAMAAJ','MhkKyAEACAAJ','LNsMvgAACAAJ'];
   var badBooks = ['x-OVAwAAQBAJ','2E6PEAAAQBAJ','aDDeRMWIqw4C'];
   var baadBooks = ['gKeOqLFgQ8oC','UvXWAAAAMAAJ','CdZIn4b9s4UC'];
   var worseBooks = ['0Z8HoLfjOQQC','hJpExsJiTW8C','sEH18bk4wakC'];
   var worseeBooks = ['Ut-jmAEACAAJ','kKhPEAAAQBAJ','uLMhEAAAQBAJ'];

   let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";

   // As long as the user select an option, the user receives a book recommendation related to that feeling

   if (a == 1) {
      var randomBookId = goodBooks[Math.floor(Math.random() * goodBooks.length)];
      // When the user chooses 'OK', the user will be redirected to another page 
      // When the user selects 'Cancel', the user stays on the same page

      if (window.confirm(question) == true) {
         setTimeout(function () {
            // window.location.href ="https://www.googleapis.com/books/v1/volumes?q=car";
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (b == 1) {
      var randomBookId = gooodBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (c == 1) {
      var randomBookId = okBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (d == 1) {
      var randomBookId = okkBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (e == 1) {
      var randomBookId = badBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (f == 1) {
      var randomBookId = baadBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (g == 1) {
      var randomBookId = worseBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }

   if (h == 1) {
      var randomBookId = worseeBooks[Math.floor(Math.random() * goodBooks.length)];
      if (window.confirm(question) == true) {
         setTimeout(function () {
            displayBookPage(randomBookId);
         }, 10);
      }
   }
}


function displayBookPage(bookId) {
   localStorage.setItem("bookID", bookId);
   var link = "/FrontEnd/Templates(html_files)/book.html";
   window.location.href = link; 
}
