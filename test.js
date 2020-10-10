
for (var b=0,a=0;a<5;a++){
    b+=a+5;

    console.log("a="+a+" ,b="+b);
}

function predetermined5DayCall() {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + localStorage[localStorage.length] + "&units=imperial&appid=715ee435d9e6cc809bc1cb6b62581405",
      method: "GET"
    }).then(function (response) {
      for ( var instance=0,i=0; i < 5; i++) {
        instance +=i+5;
        $("#day" + i + " .card-text").append("<span>Time:</span> " + response.list[instance].dt_txt + " <img src='https://openweathermap.org/img/wn/" + response.list[instance].weather[0].icon + "@2x.png'> <br>");
        $("#day" + i + " .card-text").append("<span>Temp:</span> " + response.list[instance].main.temp + "&#8457 <br>");
        $("#day" + i + " .card-text").append("<span>Humidity:</span> " + response.list[instance].main.humidity + "&#37; <br>");
        $("#day" + i + " .card-text").append("<span>Weather Condition:</span> " + response.list[instance].weather[0].main + " <br>");
      };
    });
  };

// for (var b=0,a=0;a<5;a++,b+6){
//     console.log("a="+a+" ,b="+b);
//}