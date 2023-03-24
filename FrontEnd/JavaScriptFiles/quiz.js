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

      if( a >= 1 ) {
        alert("Reccomended reading: Happiness, joy, excitement books");
        //location.assign("dep.html");
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


  // function reccomend()
  // {
  
  //   var a = countChecksByType("good");  // 2
  //   var b = countChecksByType("ok"); // 2
  //   var c = countChecksByType("bad");  // 3
  //   var d = countChecksByType("worse");  // 2

  //    // creation of my own 
  //         // a only
  //     if( a > b && a > c && a > d ) {//fail dep
  //       alert("Reccomended reading: Depression");
  //       //location.assign("dep.html");
  //     }
  //          // b only
  //     else if(b > a && b > c && b > d){//fail dep
  //       alert("Reccomended reading: Depression");
  //       //location.assign("dep.html");
  //     }

  //         // c only
  //     else if(c > a && c > b && c > d){//fail dep
  //       alert("Reccomended reading: Depression");
  //       //location.assign("dep.html");
  //     }

  //        // d only
  //     else if(d > a && d > b && d > c){//fail dep
  //       alert("Reccomended reading: Depression");
  //       //location.assign("dep.html");
  //     }
  // }   
    // // a alone
    // if(a >= 1 && b < 1 && c < 1 && d < 1){//fail alc
    //   alert("Reccomended reading: happy books");
    //   //location.assign("alc.html");       TODO we gotta make these result pages
    // }

    //      // creation of my own // a only
    // else if(a > b && a > b && a > c  && a > d ){//fail dep
    //     alert("Reccomended reading: Depression");
    //     //location.assign("dep.html");
    //   }
   
    // // b alone
    // else if(a < 1 && b >= 1 && c < 1 && d < 1){//fail dep
    //   alert("Reccomended reading: Depression");
    //   //location.assign("dep.html");
    // }
    // else if(alc < 2 && dep < 2 && stu < 3){//fail stu
    //   alert("Reccomended reading: Study");
    //   //location.assign("stu.html");
    // }
    // else if(alc >= 2 && dep >= 2 && stu >= 3){//fail alc and dep
    //   alert("Reccomended readings: Alcohol and Depression");
    //   //location.assign("alcdep.html");
    // }
    // else if(alc >= 2 && dep < 2 && stu < 3){//fail alc and stu
    //   alert("Reccomended readings: Alcohol and Study");
    //   //location.assign("alcstu.html");
  
    // }
    // else if(alc < 2 && dep >= 2 && stu < 3){//fail dep and stu
    //   alert("Reccomended readings: Depression and Study");
    //   //location.assign("depstu.html");
  
    // }
    // else if (alc >= 2 && dep >= 2 && stu < 3){//fail all three :()
    //   alert("Reccomended readings: Alcohol, Depression, and Study");
    //   //location.assign("alcdepstu.html");
  
    // }
    // else{//succeed all 3
    //   alert("No reccomended readings!");
    //   //location.assign("none.html");
  
    // }
   //}

//   function reccomend()
//   {
  
//     var alc = countChecksByType("alcohol");  //if >= 2, bad sign.
//     var dep = countChecksByType("depression"); //if >=2 bad sign
//     var stu = countChecksByType("study");  //if >= 3, good sign
//     var stu = countChecksByType("study");  //if >= 3, good sign
  
//     if(alc >= 2 && dep < 2 && stu >= 3){//fail alc
//       alert("Reccomended reading: Alcohol");
//       //location.assign("alc.html");       TODO we gotta make these result pages
//     }
//     else if(alc < 2 && dep >= 2 && stu >= 3){//fail dep
//       alert("Reccomended reading: Depression");
//       //location.assign("dep.html");
//     }
//     else if(alc < 2 && dep < 2 && stu < 3){//fail stu
//       alert("Reccomended reading: Study");
//       //location.assign("stu.html");
//     }
//     else if(alc >= 2 && dep >= 2 && stu >= 3){//fail alc and dep
//       alert("Reccomended readings: Alcohol and Depression");
//       //location.assign("alcdep.html");
//     }
//     else if(alc >= 2 && dep < 2 && stu < 3){//fail alc and stu
//       alert("Reccomended readings: Alcohol and Study");
//       //location.assign("alcstu.html");
  
//     }
//     else if(alc < 2 && dep >= 2 && stu < 3){//fail dep and stu
//       alert("Reccomended readings: Depression and Study");
//       //location.assign("depstu.html");
  
//     }
//     else if (alc >= 2 && dep >= 2 && stu < 3){//fail all three :()
//       alert("Reccomended readings: Alcohol, Depression, and Study");
//       //location.assign("alcdepstu.html");
  
//     }
//     else{//succeed all 3
//       alert("No reccomended readings!");
//       //location.assign("none.html");
  
//     }
//   }

