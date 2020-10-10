$(document).ready(function () {


  //time(by list #) that call is made on the 5 day forecast api
  var instance = -1;
  var i = 0;
  var lat = null;
  var lon = null;
  var newCity = null;
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



  // (predetermined city) current weather response with uv index response nested inside
  function predeterminedCurrentCall(location) {


    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405",
      method: "GET"
    }).then(function (response) {
      $("#cityName h2").append(response.name + "<br>");
      $("#currentForecast .card-text:first").append("<span> Time: </span>" + response.dt + " UTC (Unix time) <img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'><br>");
      $("#currentForecast .card-text:first").append("<span> Temperature: </span>" + response.main.temp + "&#8457<br>");
      $("#currentForecast .card-text:first").append("<span> Temp feels like: </span>" + response.main.feels_like + "&#8457<br>");
      $("#currentForecast .card-text:first").append("<span> Humidity: </span>" + response.main.humidity + "&#37;<br>");
      $("#currentForecast .card-text:first").append("<span> Weather Condition: </span>" + response.weather[0].main + ", " + response.weather[0].description + "<br>");
      $("#currentForecast .card-text:first").append("<span> Windspead & Direction: </span>" + response.wind.speed + " mph" + " at " + response.wind.deg + "&deg;<br>");
      //statement for a "404" city
      //     if (response.message="city not found"){
      // console.log("works");
      // }
      //using the current weather response to get lat and lon, inorder to get UV index response
      var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=715ee435d9e6cc809bc1cb6b62581405";

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {
        $("#currentForecast .card-text:first").append("<span> UV Index: </span> <span class='uvIndex'>" + response.value + "</span> <br>");
        if (response.value < 3) {
          $(".uvIndex").css("background-color", "green");
        }
        if (response.value >= 3 && response.value < 6) {
          $(".uvIndex").css("background-color", "yellow");
        }
        if (response.value >= 6) {
          $(".uvIndex").css("background-color", "red");
        }
        //when 'else' statement included, undefined is presented when it should not. maybe this has to do with 2nd 'if' statement
        // else{
        //   $(".uvIndex").text("undefined");
        // };


        //closes ajax.then call
      });
      //closes parent ajax.then call
    });
    //closes predeterminedCurrentCall function
  };

  // (predetermined city)5 day forecast
  function predetermined5DayCall(location) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405",
      method: "GET"
    }).then(function (response) {
      for (i = 0; i < 5; i++) {
        instance += i + 6;
        $("#day" + i + " .card-text").append("<span>Time:</span> " + response.list[instance].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[instance].weather[0].icon + "@2x.png'> <br>");
        $("#day" + i + " .card-text").append("<span>Temp:</span> " + response.list[instance].main.temp + "&#8457 <br>");
        $("#day" + i + " .card-text").append("<span>Humidity:</span> " + response.list[instance].main.humidity + "&#37; <br>");
        $("#day" + i + " .card-text").append("<span>Weather Condition:</span> " + response.list[instance].weather[0].main + " <br>");
      };
    });
  };

  // (searched city) current weather response with uv index response nested inside
  function variableCityCurrentCall(location) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#cityName h2").append(response.name + "<br>");
      $("#currentForecast .card-text:first").append("<span> Time: </span>" + response.dt + " UTC (Unix time) <img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'><br>");
      $("#currentForecast .card-text:first").append("<span> Temperature: </span>" + response.main.temp + "&#8457<br>");
      $("#currentForecast .card-text:first").append("<span> Temp feels like: </span>" + response.main.feels_like + "&#8457<br>");
      $("#currentForecast .card-text:first").append("<span> Humidity: </span>" + response.main.humidity + "&#37;<br>");
      $("#currentForecast .card-text:first").append("<span> Weather Condition: </span>" + response.weather[0].main + ", " + response.weather[0].description + "<br>");
      $("#currentForecast .card-text:first").append("<span> Windspead & Direction: </span>" + response.wind.speed + " mph" + " at " + response.wind.deg + "&deg;<br>");

      //using the current weather response to get lat and lon, inorder to get UV index response
      var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=715ee435d9e6cc809bc1cb6b62581405";

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {
        $("#currentForecast .card-text:first").append("<span> UV Index: </span> <div class='uvIndex'>" + response.value + "</div> <br>");
      });
      //closes parent ajax call
    });
    //closes variableCityCurrentCall()
  }




  // (searched city) 5day weather response
  function variableCity5DayCall(location) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405";
    var instance = -1;
    var i = 0;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (i = 0; i < 5; i++) {
        instance += i + 6;
        $("#day" + i + " .card-text").append("<span>Time:</span> " + response.list[instance].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[instance].weather[0].icon + "@2x.png'> <br>");
        $("#day" + i + " .card-text").append("<span>Temp:</span> " + response.list[instance].main.temp + "&#8457 <br>");
        $("#day" + i + " .card-text").append("<span>Humidity:</span> " + response.list[instance].main.humidity + "&#37; <br>");
        $("#day" + i + " .card-text").append("<span>Weather Condition:</span> " + response.list[instance].weather[0].main + " <br>");
      };
    });
    //closes variableCity5DayCall()
  }


  if (localStorage.length > 0) {
    predeterminedCurrentCall(localStorage[localStorage.length]);
    predetermined5DayCall(localStorage[localStorage.length]);
  }
  //statement for users first time visiting site
  else {
    predeterminedCurrentCall("hartford,connecticut");
    predetermined5DayCall("hartford,connecticut");
  }

  //event listener to have a new api call using previously searched city
  $("body").on("click", ".historyBTN", function () {
    searchedCity = $(this).html();
    $("#cityName h2").empty();
    $("#currentForecast .card-text:first").empty();
    for (i = 0; i < 5; i++) {
      $("#day" + i + " .card-text").empty();
    };
    variableCityCurrentCall(searchedCity);
    variableCity5DayCall(searchedCity);
  });



  //event listener to open sidenav
  $("#searchBTN").on("click", function () {
    openNav();
    //creating list of searched cities
    for (i = 1; i <= localStorage.length; i++) {
      $("#searchedCities").prepend("<button class='glow-on-hover historyBTN'>" + localStorage[i] + "</button><br>");
    };
  });




  //event listener when city is entered
  $("form").submit(function (event) {
    event.preventDefault();
    $("#cityName h2").empty();
    $("#currentForecast .card-text:first").empty();
    for (i = 0; i < 5; i++) {
      $("#day" + i + " .card-text").empty();
    };


    newCity = $("input").val().trim();
    localStorage.setItem(localStorage.length + 1, newCity);
    $("#searchedCities").prepend("<button class='glow-on-hover historyBTN'>" + localStorage[localStorage.length] + "</button><br>");
    $("input").val("");
    variableCityCurrentCall(newCity);
    variableCity5DayCall(newCity);
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405";

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function (response) {
    //   for (var i = 0; i < 5; i++) {
    //     var instance=0;
    //     instance += i + 4;
    //     $("#day" + i + " .card-text").append("<span>Time:</span> " + response.list[instance].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[instance].weather[0].icon + "@2x.png'> <br>");
    //     $("#day" + i + " .card-text").append("<span>Temp:</span> " + response.list[instance].main.temp + "&#8457 <br>");
    //     $("#day" + i + " .card-text").append("<span>Humidity:</span> " + response.list[instance].main.humidity + "&#37; <br>");
    //     $("#day" + i + " .card-text").append("<span>Weather Condition:</span> " + response.list[instance].weather[0].main + " <br>");
    //   };
    // });





    //event listener to have a new api call using previously searched city
    // $(".historyBTN").click(function () {

    //   $("#cityName h2").empty();
    //   $("#currentForecast .card-text:first").empty();
    //   searchedCity = $(this).html();
    //   variableCityCurrentCall(searchedCity);
    // });
    //closes form submit event listener
  });

  $("#clearHistory").on("click", function () {
    localStorage.clear();
    $("#searchedCities").empty();
    //or location.reload();
  })


  //event listener to close sidenav
  $(".closebtn").on("click", function () {
    closeNav()
    $("#searchedCities").empty();
  });





  //closes document.ready function
});





