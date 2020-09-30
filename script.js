var queryURL="http://api.openweathermap.org/data/2.5/weather?q=hartford,connecticut&appid=715ee435d9e6cc809bc1cb6b62581405"
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
$("#currentForecast").append(response);
  });
