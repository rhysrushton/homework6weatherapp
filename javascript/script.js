//Query URLS
var currentWeatherSearch = "https://api.openweathermap.org/data/2.5/weather?q=" ;
var forecastWeatherSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" ;
//var uvSearch =  "https://api.openweathermap.org/data/2.5/uvi?"; 

//API Key
var apiKey = "249525d4c4a0c98c46b32b44ba6865f2"; 




//Search event listener. 
$(document).ready(function(){


$("#searchBtn").on("click", function(){
  event.preventDefault(); 
  console.log(" click")
  search();
}); 

function search(){
  var city = $("#citySearch").val(); 
  console.log(city)
//AJAX request for current weather. 
  var request = $.ajax({
    url: currentWeatherSearch + city + "&appid=" + apiKey + "&units=metric",
    method: "GET"
  })
  request.done(function(call){
    console.log(call)
  }) .then(function(response){
    let recentSearch = {};
    recentSearch.city = response.name;
    recentSearch.country = response.sys.country; 
    console.log(recentSearch)
    let coordinates = response.coordinates; 
    let img = response.weather[0].icon 
    let dateAndTime = moment().utc().add(response.timezone).format("ddd, MMM Do HH:mm");
    $("#city").text("City: " + response.name + "," + response.sys.country);
    $("#icon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + img + ".png"
    );
    $("#dateAndTime").text("Local Time & Date: " + dateAndTime);
    $("#temp").text("The current temperature in" + `${recentSearch.city}` + "is" + response.main.temp.toFixed(0) + "C");
    $("#humidity").text("The Humdity is:" + response.main.humidity + "%");
    $("#wind").text("The Wind speed is: " + response.wind.speed + "m/sec");
  })



} ///forSearch function



















})//document.ready








