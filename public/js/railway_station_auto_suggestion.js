
function autocomplete(inp, arr) {
 
    var currentFocus;
    
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
     
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
       
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
         
        this.parentNode.appendChild(a);
       
        for (i = 0; i < arr.length; i++) {
           
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
           
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form fromcity being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class fromcity all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
   
  /*initiate the autocomplete function on the "fromcity" element, and pass along the countries array as possible autocomplete values:*/
  
  

function fromCity() {


  //let city = document.getElementById("city").value; // city name
  let city = document.getElementById("fromcity").value; // city name
  console.log(city)
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0d97aa5a99mshf4d4f47eab4962cp1610d0jsn48eddf4779be',
      'X-RapidAPI-Host': 'indianrailways.p.rapidapi.com'
    }
  };
  
  fetch(`https://indianrailways.p.rapidapi.com/findstations.php?station=${city}`, options)
    .then(response => response.json())
    .then(response => {
       
      // console.clear()
       let countries = [];
  
          let len =   response.stations.length
  
          for(let i = 0; i < len; i++){
              console.log(response.stations[i].stationName +" ("+ response.stations[i].stationCode +")")
             
              countries.push(response.stations[i].stationName +" ("+ response.stations[i].stationCode +")")
          }
          autocomplete(document.getElementById("fromcity"), countries);
          
    
    }) 
    .catch(err => console.error(err));
  
  
      //  let countries = [];
  
      //     let len = response.data.length
  
      //     for(let i = 0; i < len; i++){
      //         console.log(response.data[i].name +" ("+ response.data[i].code +")")
      //         console.log()
      //         countries.push(response.data[i].name +" ("+ response.data[i].code +")")
      //     }
      //     autocomplete(document.getElementById("fromcity"), countries);
  }
  
  
  function toCity() {
  
  
  //let city = document.getElementById("city").value; // city name
  let city = document.getElementById("tocity").value; // city name
  console.log(city)
  console.clear()
  
      // let countries = [];
  
      //     let len = response.data.length
  
      //     for(let i = 0; i < len; i++){
      //         console.log(response.data[i].name +" ("+ response.data[i].code +")")
      //         console.log()
      //         countries.push(response.data[i].name +" ("+ response.data[i].code +")")
      //     }
      //     autocomplete(document.getElementById("tocity"), countries);
  
      
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0d97aa5a99mshf4d4f47eab4962cp1610d0jsn48eddf4779be',
      'X-RapidAPI-Host': 'indianrailways.p.rapidapi.com'
    }
  };
  
  fetch(`https://indianrailways.p.rapidapi.com/findstations.php?station=${city}`, options)
    .then(response => response.json())
    .then(response => {
       
      // console.clear()
       let countries = [];
  
          let len =   response.stations.length
  
          for(let i = 0; i < len; i++){
              console.log(response.stations[i].stationName +" ("+ response.stations[i].stationCode +")")
             
              countries.push(response.stations[i].stationName +" ("+ response.stations[i].stationCode +")")
          }
          autocomplete(document.getElementById("tocity"), countries);
          
    
    }) 
    .catch(err => console.error(err));
  }
  document.getElementById("fromcity").onkeyup = function () {
    fromCity();
};
document.getElementById("tocity").onkeyup = function () {
  toCity();
};
document.getElementById("departureDate").value = new Date()
  .toISOString()
  .substring(0, 10);
$(function () {
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  var maxDate = year + "-" + month + "-" + day;
  $("#departureDate").attr("min", maxDate);
});
document.getElementById("returnDate").value = new Date()
  .toISOString()
  .substring(0, 10);