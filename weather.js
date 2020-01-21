
// lets get weather data

$(".btn").on("click", function() {

var city = $(".searchBar").val();
console.log(city);
$(".searchHistory").append(city);
$(".searchHistory").append("<br>");

$(".city").empty();
$(".temp").empty();
$(".humidity").empty();
$(".windspeed").empty();
$(".uv").empty();

$(".dayone").empty();
$(".daytwo").empty();
$(".daythree").empty();
$(".dayfour").empty();
$(".dayfive").empty();

// create a place to store searches
var searchHistory = []
searchHistory.push(city);

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
    $(".city").append(city);

    //   * Date
    var date = response.dt;
    console.log(parseInt(date));
        // convert the date to human readable format
        var humanDate = moment(response.dt*1000).format("L");
        console.log(humanDate);
        $(".city").append(" ("+humanDate+")")

    //   * Icon image (visual representation of weather conditions)
    var icon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    console.log(icon);
    var imgIcon = $("<img>");
    imgIcon.attr("src", icon).attr("alt","icon");
    console.log(imgIcon);
    $(".city").append(imgIcon);

    //   * Temperature
    var temp = response.main.temp;
    var tempFarhen = Number(((parseInt(temp) - 273.15) * 1.80 + 32).toFixed(1));
    console.log(tempFarhen);
    $(".temp").append("Temperature: "+tempFarhen+ " °F");

    //   * Humidity
    var humidity = response.main.humidity;
    console.log(humidity);
    $(".humidity").append("Humidity " +humidity+ "%");


    //   * Wind speed
    var windSpeed = response.wind.speed;
    console.log(windSpeed);
    $(".windspeed").append("Windspeed "+windSpeed+ " MPH")

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
        $(".uv").append("UV: "+uvIndex)
        
    });

    // 5 day forecast
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&APPID=" + APIkey;
    console.log(queryURL3);
    $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(response3) {
        console.log(response3);

        var forecastOne = [response3.list[0].dt, response3.list[0].weather[0].icon, response3.list[0].main.temp, response3.list[0].main.humidity];
        var forecastTwo = [response3.list[4].dt, response3.list[4].weather[0].icon, response3.list[4].main.temp, response3.list[4].main.humidity];
        var forecastThree = [response3.list[8].dt, response3.list[8].weather[0].icon, response3.list[8].main.temp, response3.list[8].main.humidity];
        var forecastFour = [response3.list[12].dt, response3.list[12].weather[0].icon, response3.list[12].main.temp, response3.list[12].main.humidity];
        var forecastFive = [response3.list[16].dt, response3.list[16].weather[0].icon, response3.list[16].main.temp, response3.list[16].main.humidity];

        forecastOne[0] = moment(forecastOne[0]*1000).format("L");
        forecastTwo[0] = moment(forecastTwo[0]*1000).format("L");
        forecastThree[0] = moment(forecastThree[0]*1000).format("L");
        forecastFour[0] = moment(forecastFour[0]*1000).format("L");
        forecastFive[0] = moment(forecastFive[0]*1000).format("L");

        forecastOne[1] = "https://openweathermap.org/img/w/" + forecastOne[1] + ".png";
        forecastTwo[1] = "https://openweathermap.org/img/w/" + forecastTwo[1] + ".png";
        forecastThree[1] = "https://openweathermap.org/img/w/" + forecastThree[1] + ".png";
        forecastFour[1] = "https://openweathermap.org/img/w/" + forecastFour[1] + ".png";
        forecastFive[1] = "https://openweathermap.org/img/w/" + forecastFive[1] + ".png";
        
        forecastOne[2] = Number(((parseInt(forecastOne[2]) - 273.15) * 1.80 + 32).toFixed(2));
        forecastTwo[2] = Number(((parseInt(forecastTwo[2]) - 273.15) * 1.80 + 32).toFixed(2));
        forecastThree[2] = Number(((parseInt(forecastThree[2]) - 273.15) * 1.80 + 32).toFixed(2));
        forecastFour[2] = Number(((parseInt(forecastFour[2]) - 273.15) * 1.80 + 32).toFixed(2));
        forecastFive[2] = Number(((parseInt(forecastFive[2]) - 273.15) * 1.80 + 32).toFixed(2));

        var imgIconOne = $("<img>");
        imgIconOne.attr("src", forecastOne[1]).attr("alt","icon");
        var imgIconTwo = $("<img>");
        imgIconTwo.attr("src", forecastTwo[1]).attr("alt","icon");
        var imgIconThree = $("<img>");
        imgIconThree.attr("src", forecastThree[1]).attr("alt","icon");
        var imgIconFour = $("<img>");
        imgIconFour.attr("src", forecastFour[1]).attr("alt","icon");
        var imgIconFive = $("<img>");
        imgIconFive.attr("src", forecastFive[1]).attr("alt","icon");



        $(".fiveDay").append("<br>");
        $(".dayone").append(forecastOne[0],"<br>",imgIconOne,"<br>",forecastOne[2],"<br>",forecastOne[3])
        $(".daytwo").append(forecastTwo[0],"<br>",imgIconTwo,"<br>",forecastTwo[2],"<br>",forecastTwo[3])
        $(".daythree").append(forecastThree[0],"<br>",imgIconThree,"<br>",forecastThree[2],"<br>",forecastThree[3])
        $(".dayfour").append(forecastFour[0],"<br>",imgIconFour,"<br>",forecastFour[2],"<br>",forecastFour[3])
        $(".dayfive").append(forecastFive[0],"<br>",imgIconFive,"<br>",forecastFive[2],"<br>",forecastFive[3])


        console.log(forecastOne);
        console.log(forecastTwo);
        console.log(forecastThree);
        console.log(forecastFour);
        console.log(forecastFive);

        
    });
  });

});
