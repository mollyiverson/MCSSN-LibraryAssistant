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
function countChecksByType(type) {

   var checkMarksOfType = document.getElementsByName(type);
   var totalChecked = 0;

   for (var i = 0; i < checkMarksOfType.length; i++) {
      if (checkMarksOfType[i].checked) {
         totalChecked++;
      }
   }
   return totalChecked;
}

function recommend() {

   var a = countChecksByType("good");  // 1
   var c = countChecksByType("ok"); // 1
   var e = countChecksByType("bad");  // 1
   var g = countChecksByType("worse");  // 1

   var b = countChecksByType("goood");  // 1
   var d = countChecksByType("okk"); // 1
   var f = countChecksByType("baad");  // 1
   var h = countChecksByType("worsee");  // 1

   // Getting the IDS of the books we want to display
   var goodBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var gooodBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var okBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var okkBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var badBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var baadBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var worseBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];
   var worseeBooks = ['3F4yY_v6dw7ZsC', 'oMXQBAAAQBAJ'];

   // As long as the user select an option, the user receives a book recommendation related to that feeling

   if (a >= 1) {
      var randomBookId = goodBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      // When the user chooses 'OK', the user will be redirected to another page 
      // When the user selects 'Cancel', the user stays on the same page

      if (window.confirm(question) == true) {
         setTimeout(function () {

            //window.location.href = "FrontEnd/Templates(html_files)/book.html?id=3F4yY_v6dw7ZsC";
            //window.location.href = "FrontEnd/Templates(html_files)/book.html?q=3F4yY_v6dw7ZsC";

            //window.location.href = "FrontEnd/Templates(html_files)/book.html";
            // window.location.href ="https://www.googleapis.com/books/v1/volumes?q=car";

            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (b == 1) {
      //alert("Reccomended reading: Contentment, satisfaction, relaxation books");
      var randomBookId = gooodBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (c == 1) {
      var randomBookId = okBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (d == 1) {
      var randomBookId = okkBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (e == 1) {
      var randomBookId = badBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (f == 1) {
      var randomBookId = baadBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (g == 1) {
      var randomBookId = worseBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }

   if (h == 1) {
      var randomBookId = worseeBooks[Math.floor(Math.random() * goodBooks.length)];
      let question = "Click 'OK' to go another page or 'Cancel' to stay on the same page";
      if (window.confirm(question) == true) {
         setTimeout(function () {
            redirectToBookPage(randomBookId);
         }, 10);
      }
   }
}


function redirectToBookPage(bookId) {
   localStorage.setItem("bookID", bookId);
   var url = "/FrontEnd/Templates(html_files)/book.html";
   window.location.href = url;  // Go to the other page
}

/* <button type="button" onclick="recommend()">Submit</button> */
