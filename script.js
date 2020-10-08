$(document).ready(function () {

  var city = null;
  var lat = null;
  var lon = null;
  var searchedCity = null;


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
function currentCityFunction(){
     // (searched city) current weather response with uv index response nested inside
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405";
       
     $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#cityName").append(response.name + "<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'> <br>");
      $(".card-body").append("<span> Time: </span>" + response.dt + " UTC (Unix time)<br>");
      $(".card-body").append("<span> Temperature: </span>" + response.main.temp + "&#8457<br>");
      $(".card-body").append("<span> Temp feels like: </span>" + response.main.feels_like + "&#8457<br>");
      $(".card-body").append("<span> Humidity: </span>" + response.main.humidity + "&#37;<br>");
      $(".card-body").append("<span> Weather Condition: </span>" + response.weather[0].main + ", " + response.weather[0].description + "<br>");
      $(".card-body").append("<span> Windspead & Direction: </span>" + response.wind.speed + " mph" + " at " + response.wind.deg + "&deg;<br>");
  
      //using the current weather response to get lat and lon, inorder to get UV index response
      var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=715ee435d9e6cc809bc1cb6b62581405";
  
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {
        $(".card-body").append("<span> UV Index: </span> <div class='uvIndex'>" + response.value + "</div> <br>");
      });
    });
  
}
  
  // (predetermined city) current weather response with uv index response nested inside
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=hartford,connecticut&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405",
    method: "GET"
  }).then(function (response) {
    $("#cityName").append(response.name + "<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'> <br>");
    $(".card-body").append("<span> Time: </span>" + response.dt + " UTC (Unix time)<br>");
    $(".card-body").append("<span> Temperature: </span>" + response.main.temp + "&#8457<br>");
    $(".card-body").append("<span> Temp feels like: </span>" + response.main.feels_like + "&#8457<br>");
    $(".card-body").append("<span> Humidity: </span>" + response.main.humidity + "&#37;<br>");
    $(".card-body").append("<span> Weather Condition: </span>" + response.weather[0].main + ", " + response.weather[0].description + "<br>");
    $(".card-body").append("<span> Windspead & Direction: </span>" + response.wind.speed + " mph" + " at " + response.wind.deg + "&deg;<br>");

    //using the current weather response to get lat and lon, inorder to get UV index response
    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=715ee435d9e6cc809bc1cb6b62581405";

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {
      $(".card-body").append("<span> UV Index: </span> <span class='uvIndex'>" + response.value + "</span> <br>");
      if(response.value<3){
        $(".uvIndex").css("background-color","green");
      }
      if(response.value>=3&&response.value<6){
        $(".uvIndex").css("background-color","yellow");
      }
      if(response.value>=6){
        $(".uvIndex").style("background-color","red");
      }
      //when 'else' statement included, undefined is presented when it should not. maybe this has to do with 2nd 'if' statement
      // else{
      //   $(".uvIndex").text("undefined");
      // };
    });





  });



//event listener to open sidenav
  $("button").click(function () {
    openNav();
//creating list of searched cities
    for (i = 1; i <= localStorage.length; i++) {
      $("#searchSidenav").append("<button class='glow-on-hover historyBTN'>"+localStorage[i]+"</button><br>" );
    };
//changed li to button to test
  //event listener to have a new api call using previously searched city
  $(".historyBTN").click(function(){
    searchedCity=$(this).html();
    $("#cityName").empty();
        $(".card-body").empty();
        currentCityFunction();
    
 
    
    });



  });



//event listener to close sidenav
  $(".closebtn").click(function () {
    closeNav()
    $("#history").empty();
  });
//event listener when city is entered
  $("form").submit(function (event) {

    event.preventDefault();
    $("#cityName").empty();
    $(".card-body").empty();
    city = $("input").val().trim();

// (searched city) current weather response with uv index response nested inside
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405";
   
   $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#cityName").append(response.name + "<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'> <br>");
    $(".card-body").append("<span> Time: </span>" + response.dt + " UTC (Unix time)<br>");
    $(".card-body").append("<span> Temperature: </span>" + response.main.temp + "&#8457<br>");
    $(".card-body").append("<span> Temp feels like: </span>" + response.main.feels_like + "&#8457<br>");
    $(".card-body").append("<span> Humidity: </span>" + response.main.humidity + "&#37;<br>");
    $(".card-body").append("<span> Weather Condition: </span>" + response.weather[0].main + ", " + response.weather[0].description + "<br>");
    $(".card-body").append("<span> Windspead & Direction: </span>" + response.wind.speed + " mph" + " at " + response.wind.deg + "&deg;<br>");

    //using the current weather response to get lat and lon, inorder to get UV index response
    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=715ee435d9e6cc809bc1cb6b62581405";

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {
      $(".card-body").append("<span> UV Index: </span>" + response.value + "<br>");
    });
  });
  
    localStorage.setItem(localStorage.length + 1, city);

    $("#history").append(localStorage[localStorage.length] + "<br>");

    $("input").val("");
  


  });





});
