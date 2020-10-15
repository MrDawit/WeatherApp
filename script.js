
$(document).ready(function () {
  //time(by list #) that call is made on the 5 day forecast api
  //var instance = -1;
  var i = 0;
  var b = -1;
  var lat = null;
  var lon = null;
  var newCity = null;
  var searchedCity = null;
  var cityPlacement = false;

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
      $("#cityName h2").html(response.name);
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
      //get placement (#day+i)id to match list i
      for (b = -1, i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          b++;
          $("#day" + b + " .card-text").append("<span>Time:</span> " + response.list[i].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'> <br>");
          $("#day" + b + " .card-text").append("<span>Temp:</span> " + response.list[i].main.temp + "&#8457 <br>");
          $("#day" + b + " .card-text").append("<span>Humidity:</span> " + response.list[i].main.humidity + "&#37; <br>");
          $("#day" + b + " .card-text").append("<span>Weather Condition:</span> " + response.list[i].weather[0].main + " <br>");
        };
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
      $("#cityName h2").html(response.name);
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
    //var instance = -1;
    var i = 0;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (b = -1, i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          b++;
          $("#day" + b + " .card-text").append("<span>Time:</span> " + response.list[i].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'> <br>");
          $("#day" + b + " .card-text").append("<span>Temp:</span> " + response.list[i].main.temp + "&#8457 <br>");
          $("#day" + b + " .card-text").append("<span>Humidity:</span> " + response.list[i].main.humidity + "&#37; <br>");
          $("#day" + b + " .card-text").append("<span>Weather Condition:</span> " + response.list[i].weather[0].main + " <br>");
        };
      };
    });
    //closes variableCity5DayCall()
  }
  
  //statement for users first time visiting site and undefined citie in localstorage
  //future development should be to try to refactor this part of the code. This section of code makes 4 ajax calls instead of 2 in some cases.
  predeterminedCurrentCall("hartford,connecticut");
  predetermined5DayCall("hartford,connecticut");
  //for users who return to the site
  if (localStorage.length > 0 && cityPlacement == false) {
    predeterminedCurrentCall(localStorage[localStorage.length]);
    predetermined5DayCall(localStorage[localStorage.length]);
  }
  // }else{
  //   predeterminedCurrentCall("hartford,connecticut");
  //   predetermined5DayCall("hartford,connecticut");
  //   
  // }

  //event listener to have a new api call using previously searched city
  $("body").on("click", ".historyBTN", function () {
    searchedCity = $(this).html();

    $("#cityName h2").empty();
    //returns css properties to pre-ajax_error settings
    $("#cityName").css({ "width": "20%", "background-color": "grey", "color": "black" });
    $("#currentForecast .card-text:first").empty();
    for (i = 0; i < 5; i++) {
      $("#day" + i + " .card-text").empty();
    };
    variableCityCurrentCall(searchedCity);
    //displays ajax error as "location undefined"
    $(document).ajaxError(function () {
      $("#cityName h2").html("LOCATION UNDEFINED");
      $("#cityName").css({ "width": "80%", "background-color": "black", "color": "red" });
      cityPlacement = true;

    });
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
    //returns css properties to pre-ajax_error settings
    $("#cityName").css({ "width": "20%", "background-color": "grey", "color": "black" });
    $("#currentForecast .card-text:first").empty();
    //clean code with all the i and b variables
    for (i = 0; i < 5; i++) {
      $("#day" + i + " .card-text").empty();
    };
    newCity = $("input").val().trim();
    localStorage.setItem(localStorage.length + 1, newCity);
    $("#searchedCities").prepend("<button class='glow-on-hover historyBTN'>" + localStorage[localStorage.length] + "</button><br>");
    $("input").val("");
    variableCityCurrentCall(newCity);
    //displays ajax error as "location undefined"
    $(document).ajaxError(function () {
      $("#cityName h2").html("LOCATION UNDEFINED");
      $("#cityName").css({ "width": "80%", "background-color": "black", "color": "red" });
      cityPlacement = true;

    });
    variableCity5DayCall(newCity);
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


});





