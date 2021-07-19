$(document).ready(function () {

    var newCity = null;

//event listener when city is entered
$("form").submit(function (event) {
    event.preventDefault();
    $("#cityName h2").empty();
    //returns css properties to pre-ajax_error settings
    $("#cityName").css({ "width": "20%", "background-color": "grey", "color": "black" });
    $("#currentForecast .card-text:first").empty();
   
    newCity = $("input").val().trim();
   
    $("input").val("");
    variableCityCurrentCall(newCity);
    //displays ajax error as "location undefined"
    $(document).ajaxError(function () {
      $("#cityName h2").html("LOCATION UNDEFINED");
      $("#cityName").css({ "width": "80%", "background-color": "black", "color": "red" });
      cityPlacement = true;

    });

    cityIp(newCity);
  });

  function cityIp(location) {
    var queryURL = "https://ip-geo-location.p.rapidapi.com/ip/check"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
     
    });
 
  }



});