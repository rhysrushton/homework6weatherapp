//Query URLS
var currentWeatherSearch = "https://api.openweathermap.org/data/2.5/weather?q=" ;
var forecastweatherSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" ;
//var uvSearch =  "https://api.openweathermap.org/data/2.5/uvi?"; 

//API Key
var api = "249525d4c4a0c98c46b32b44ba6865f2"; 




//Search 
$("searchBn").on("click", search)

//Search Function
function search () {
    var location = $("#cityInput").val(); 
    $.ajax({URL: currentWeatherSearch + location +  "&appid=" + api + "&units=metric", method: "GET" })
    .then(function(response){
        var recentCity = {};
        recentCity.location = response.name;
        recentCity.country =response.sys.country;
        //addHistory(recentCity);
        var coords = response.coords;
        var icon = response.weather[0].icon;
        var currentDateTime = moment()
        .utc()
        .add(response.timezone, "s")
        .format("ddd, MMM Do HH:mm");

        $("#city").text(response.name + ", " + response.sys.country);
        $("#icon").attr(
          "src",
          "http://openweathermap.org/img/wn/" + icon + ".png"
        );
        $("#local").text(" " + currentDateTime);
        $("#temperature").text(
          "Temperature: " + response.main.temp.toFixed(0) + " ℃"
        );
        $("#humidity").text("Humidity: " + response.main.humidity + " %");
        $("#wind").text("Wind Speed: " + response.wind.speed + " m/sec");
        getUVI(coords);
      })
      .catch(function(error) {
        alert(error.responseJSON.message);
        location.reload();
      });
    $.ajax({
      url: forecastQueryURL + city + "&appid=" + APIkey + "&units=metric",
      method: "GET"
    }).then(function(response) {
      let weatherArr = [];
      for (let i = 0; i < response.list.length; i++) {
        let weatherObj = {};
        weatherObj.date = moment(
          (response.list[i].dt + response.city.timezone) * 1000
        )
          .utc()
          .format("DD/MM/YYYY");
        weatherObj.temp = response.list[i].main.temp;
        weatherObj.humidity = response.list[i].main.humidity;
        weatherObj.icon = response.list[i].weather[0].icon;
        weatherArr.push(weatherObj);
      }
      for (let i = 1; i <= 5; i++) {
        let card = $(".card[data-id=" + i + "] .card-body");
        let tempsDay = [];
        let humDay = [];
        let iconDay = [];
        let cardDate = moment()
          .utc()
          .add(response.city.timezone, "s")
          .add(i, "d")
          .format("DD/MM/YYYY");
        weatherArr.forEach(function(item) {
          if (item.date === cardDate) {
            tempsDay.push(item.temp);
            humDay.push(item.humidity);
            iconDay.push(item.icon);
          }
        });
        let maxTemp = Math.round(Math.max(...tempsDay));
        let minTemp = Math.round(Math.min(...tempsDay));
        let avgHum = humDay.reduce((a, b) => a + b, 0) / humDay.length;
        card.find(".date").text(cardDate);
        card.find(".temperature").text("Temp: " + minTemp + " / " + maxTemp);
        card.find(".humidity").text("Humidity: " + Math.round(avgHum));
        card
          .find("img")
          .attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              iconDay[Math.floor(iconDay.length / 2)] +
              ".png"
          );
      }
    });
  }













function previousSearch(){
    $("#recent").empty();
    recentCities.forEach(function(item){
        listItem = $("<li>").addClass("list-group-item");
        button = $("<button").addClass("btn btn-block btn-primary recentBtn");
        button.text(item.city + item.country);
        button.attr("data-city", item.city + item.country); 
        listItem.append(button);
        $("#recent").append(listItem); 
    });
    $(".recentBtn").on("click", function(){
        $("#cityInput").val($(this).attr("data-city"));
        search();
    });

}


//functions to call
previousSearch()
search()