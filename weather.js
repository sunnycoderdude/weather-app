// create a place to store searches
var searchHistory = []

// lets get weather data
var city = "London";
var APIkey = "2df89dfec0a2dd7ead286db49ac427f5";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    //   * City
    var city = response.name;
    console.log(city);

    //   * Date
    var date = response.dt;
    console.log(parseInt(date));
        // convert the date to human readable format
        var humanDate = moment(response.dt*1000).format("L");
        console.log(humanDate);

    //   * Icon image (visual representation of weather conditions)
    var icon = "http://openweathermap.org/img/w/" + response.weather.icon + ".png";
    console.log(icon);

    //   * Temperature
    var temp = response.main.temp;
    var tempFarhen = Number(((parseInt(temp) - 273.15) * 1.80 + 32).toFixed(2));
    console.log(tempFarhen);
    //   * Humidity
    var humidity = response.main.humidity;
    console.log(humidity);

    //   * Wind speed
    var windSpeed = response.wind.speed;
    console.log(windSpeed);

    //   * UV index
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);

    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+APIkey+"&lat="+lat+"&lon="+lon;
    console.log(queryURL2);
    var uvIndex = "";
    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response2) {

        var uvIndex = response2.value;
        console.log(uvIndex);
        
    });

    // 5 day forecast
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&APPID=" + APIkey;
    console.log(queryURL3);
    $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(response3) {
        console.log(response3);

        var forecastOne = [response3.list[0].dt, response3.list[0].weather.icon, response3.list[0].main.temp, response3.list[0].main.humidity];
        var forecastTwo = [response3.list[4].dt, response3.list[4].weather.icon, response3.list[4].main.temp, response3.list[4].main.humidity];
        var forecastThree = [response3.list[8].dt, response3.list[8].weather.icon, response3.list[8].main.temp, response3.list[8].main.humidity];
        var forecastFour = [response3.list[8].dt, response3.list[8].weather.icon, response3.list[8].main.temp, response3.list[8].main.humidity];
        console.log(forecastOne);
        console.log(forecastTwo);
        console.log(forecastThree);
        console.log(forecastFour);

        
    });
  });


