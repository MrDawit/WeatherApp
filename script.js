$(document).ready(function () {

  var city = null;
  var lat = null;
  var lon = null;


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
      $(".card-body").append("<span> UV Index: </span>" + response.value + "<br>");
    });





  });




  $("button").click(function () {
    openNav();

    for (i = 1; i <= localStorage.length; i++) {
      $("#history").append(localStorage[i] + "<br>");
    };
  });


  $(".closebtn").click(function () {
    closeNav()
    $("#history").empty();
  });

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
