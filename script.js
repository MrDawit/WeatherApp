$(document).ready(function(){

    var city=null;
   
    
    
        /* sidenav opener */
        function openNav() {
          document.getElementById("searchSidenav").style.width = "400px";
          document.getElementById("main").style.marginLeft = "400px";
        }
    
        /* sidenav closer */
        function closeNav() {
          document.getElementById("searchSidenav").style.width = "0";
          document.getElementById("main").style.marginLeft = "0";
        }
    
        $("button").click(function () {
          openNav();
        
          for (i = 1; i <= localStorage.length; i++) {
            $("#history").append(localStorage[i] + "<br>");
          };
        });
    
    
        $(".closebtn").click(function () {
          closeNav()
          $("#history").clear();
        });
    
        $("form").submit(function (event) {
          event.preventDefault();
          //closeNav()
          var city = $("input").val().trim();
    
         
          var queryURL="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=715ee435d9e6cc809bc1cb6b62581405";
          $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
          $("#cityName").append(response.name);
          $(".card-body").append("Humidity: "+response.main.humidity);
            });
    
          //var prevCities=[];
          //if(localStorage!==null || undefined){
          //localStorage.setItem("preCities",city);
          //var cities=JSON.stringify(localStorage.getItem("preCities"));
          //prevCities.push=cities;
          localStorage.setItem(localStorage.length + 1, city);
    
          $("#history").append(localStorage[localStorage.length] + "<br>");

          $("input").val("");
          //}
          //var i={a:{"city":city}}
          //var city = document.getElementsByTagName("input")[0].value
    
          
        });
    
      
    
        
    
    
    //localStorage for objects refresher example:
    //start
    // var food={meal:"steak"};
    // var food_serialized=JSON.stringify(food);
    // //console.log(food_serialized);
    // localStorage.setItem("foodie",food_serialized);
    // //console.log(localStorage);
    // var pToTheArsed=JSON.parse(localStorage.getItem("foodie"));
    // console.log(pToTheArsed); 
    //end
    
    
    //$("#currentForecast").append("<div></div>");
    //const DIV=$("div").attr("id","city");
    
    
    
    
    
    
    // var queryURL="http://api.openweathermap.org/data/2.5/weather?q=hartford,connecticut&appid=715ee435d9e6cc809bc1cb6b62581405"
    
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response) {
    //   //  const CITY=$("#city").html(response.name);
    
    //     //var currentForecVar=$("#currentForecast");
    //     const DIV=$("<div>");
    // var inDiv =$("<div>").text("City : "+ response.name);
    //   DIV.append(inDiv);
    // $("#currentForecast").append(DIV);
    // console.log(response.name);
    //   });
    
     });
