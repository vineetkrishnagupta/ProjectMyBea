
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
  
  let countries = ["Delhi","Mumbai","Kolkāta","Bangalore","Chennai","Hyderābād","Pune","Ahmedabad","Sūrat","Lucknow","Jaipur","Cawnpore","Mirzāpur","Nāgpur","Ghāziābād","Indore","Vadodara","Vishākhapatnam","Bhopāl","Chinchvad","Patna","Ludhiāna","Āgra","Kalyān","Madurai","Jamshedpur","Nāsik","Farīdābād","Aurangābād","Rājkot","Meerut","Jabalpur","Thāne","Dhanbād","Allahābād","Vārānasi","Srīnagar","Amritsar","Alīgarh","Bhiwandi","Gwalior","Bhilai","Hāora","Rānchi","Bezwāda","Chandīgarh","Mysore","Raipur","Kota","Bareilly","Jodhpur","Coimbatore","Dispur","Guwāhāti","Solāpur","Trichinopoly","Hubli","Jalandhar","Bhubaneshwar","Bhayandar","Morādābād","Kolhāpur","Thiruvananthapuram","Sahāranpur","Warangal","Salem","Mālegaon","Kochi","Gorakhpur","Shimoga","Tiruppūr","Guntūr","Raurkela","Mangalore","Nānded","Cuttack","Chānda","Dehra Dūn","Durgāpur","Āsansol","Bhāvnagar","Amrāvati","Nellore","Ajmer","Tinnevelly","Bīkaner","Agartala","Ujjain","Jhānsi","Ulhāsnagar","Davangere","Jammu","Belgaum","Gulbarga","Jāmnagar","Dhūlia","Gaya","Jalgaon","Kurnool","Udaipur","Bellary","Sāngli","Tuticorin","Calicut","Akola","Bhāgalpur","Sīkar","Tumkūr","Quilon","Muzaffarnagar","Bhīlwāra","Nizāmābād","Bhātpāra","Kākināda","Parbhani","Pānihāti","Lātūr","Rohtak","Rājapālaiyam","Ahmadnagar","Cuddapah","Rājahmundry","Alwar","Muzaffarpur","Bilāspur","Mathura","Kāmārhāti","Patiāla","Saugor","Bijāpur","Brahmapur","Shāhjānpur","Trichūr","Barddhamān","Kulti","Sambalpur","Purnea","Hisar","Fīrozābād","Bīdar","Rāmpur","Shiliguri","Bāli","Pānīpat","Karīmnagar","Bhuj","Ichalkaranji","Tirupati","Hospet","Āīzawl","Sannai","Bārāsat","Ratlām","Handwāra","Drug","Imphāl","Anantapur","Etāwah","Rāichūr","Ongole","Bharatpur","Begusarai","Sonīpat","Rāmgundam","Hāpur","Uluberiya","Porbandar","Pāli","Vizianagaram","Puducherry","Karnāl","Nāgercoil","Tanjore","Sambhal","Naihāti","Secunderābād","Kharagpur","Dindigul","Shimla","Ingrāj Bāzār","Ellore","Puri","Haldia","Nandyāl","Bulandshahr","Chakradharpur","Bhiwāni","Gurgaon","Burhānpur","Khammam","Madhyamgram","Ghāndīnagar","Baharampur","Mahbūbnagar","Mahesāna","Ādoni","Rāiganj","Bhusāval","Bahraigh","Shrīrāmpur","Tonk","Sirsa","Jaunpur","Madanapalle","Hugli","Vellore","Alleppey","Cuddalore","Deo","Chīrāla","Machilīpatnam","Medinīpur","Bāramūla","Chandannagar","Fatehpur","Udipi","Tenāli","Sitalpur","Conjeeveram","Proddatūr","Navsāri","Godhra","Budaun","Chittoor","Harīpur","Saharsa","Vidisha","Pathānkot","Nalgonda","Dibrugarh","Bālurghāt","Krishnanagar","Fyzābād","Silchar","Shāntipur","Hindupur","Erode","Jāmuria","Hābra","Ambāla","Mauli","Kolār","Shillong","Bhīmavaram","New Delhi","Mandsaur","Kumbakonam","Tiruvannāmalai","Chicacole","Bānkura","Mandya","Hassan","Yavatmāl","Pīlibhīt","Pālghāt","Abohar","Pālakollu","Kānchrāpāra","Port Blair","Alīpur Duār","Hāthras","Guntakal","Navadwīp","Basīrhat","Hālīsahar","Rishra","Dharmavaram","Baidyabāti","Darjeeling","Sopur","Gudivāda","Adilābād","Titāgarh","Chittaurgarh","Narasaraopet","Dam Dam","Vālpārai","Osmānābād","Champdani","Bangaon","Khardah","Tādpatri","Jalpāiguri","Suriāpet","Tādepallegūdem","Bānsbāria","Negapatam","Bhadreswar","Chilakalūrupet","Kalyani","Gangtok","Kohīma","Khambhāt","Aurangābād","Emmiganūr","Rāyachoti","Kāvali","Mancherāl","Kadiri","Ootacamund","Anakāpalle","Sirsilla","Kāmāreddipet","Pāloncha","Kottagūdem","Tanuku","Bodhan","Karūr","Mangalagiri","Kairāna","Mārkāpur","Malaut","Bāpatla","Badvel","Jorhāt","Koratla","Pulivendla","Jaisalmer","Tādepalle","Armūr","Jatani","Gadwāl","Nagari","Wanparti","Ponnūru","Vinukonda","Itānagar","Tezpur","Narasapur","Kothāpet","Mācherla","Kandukūr","Sāmalkot","Bobbili","Sattenapalle","Vrindāvan","Mandapeta","Belampalli","Bhīmunipatnam","Nāndod","Pithāpuram","Punganūru","Puttūr","Jalor","Palmaner","Dholka","Jaggayyapeta","Tuni","Amalāpuram","Jagtiāl","Vikārābād","Venkatagiri","Sihor","Jangaon","Mandamāri","Metpalli","Repalle","Bhainsa","Jasdan","Jammalamadugu","Rāmeswaram","Addanki","Nidadavole","Bodupāl","Rājgīr","Rajaori","Naini Tal","Channarāyapatna","Maihar","Panaji","Junnar","Amudālavalasa","Damān","Kovvūr","Solan","Dwārka","Pathanāmthitta","Kodaikānal","Udhampur","Giddalūr","Yellandu","Shrīrangapattana","Angamāli","Umaria","Fatehpur Sīkri","Mangūr","Pedana","Uran","Chimākurti","Devarkonda","Bandipura","Silvassa","Pāmidi","Narasannapeta","Jaynagar-Majilpur","Khed Brahma","Khajurāho","Koilkuntla","Diu","Kulgam","Gauripur","Abu","Curchorem","Kavaratti","Panchkula","Kagaznāgār", "Banda", "Kanpur"];

function fromCity() {


  //let city = document.getElementById("city").value; // city name
  let city = document.getElementById("fromcity").value; // city name

 
            
              
    
                        
    
    
                        
                        //console.clear()
                        
                        autocomplete(document.getElementById("fromcity"), countries);
                     
                    // .then(response => document.write(JSON.stringify(response)))
    
                    
    
  }
  
  
  function toCity() {
  
    let city = document.getElementById("tocity").value; // city name
  
    //console.clear()
    
    autocomplete(document.getElementById("tocity"), countries);

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