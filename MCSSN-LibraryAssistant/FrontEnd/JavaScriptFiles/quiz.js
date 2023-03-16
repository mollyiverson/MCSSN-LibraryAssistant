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
  
    var a = countChecksByType("good");  //if >= 2, bad sign.
    var b = countChecksByType("ok"); //if >=2 bad sign
    var c = countChecksByType("bad");  //if >= 3, good sign
    var d = countChecksByType("worse");  //if >= 3, good sign

     // creation of my own 
          // a only
      if( a > b && a > c && a > d ) {//fail dep
        alert("Reccomended reading: Depression");
        //location.assign("dep.html");
      }
           // b only
      else if(b > a && b > c && b > d){//fail dep
        alert("Reccomended reading: Depression");
        //location.assign("dep.html");
      }

          // c only
      else if(c > a && c > b && c > d){//fail dep
        alert("Reccomended reading: Depression");
        //location.assign("dep.html");
      }

         // d only
      else if(d > a && d > b && d > c){//fail dep
        alert("Reccomended reading: Depression");
        //location.assign("dep.html");
      }
      
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
  }

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
  