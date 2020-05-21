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
  }); 

var requestForecast = $.ajax({
  url: forecastWeatherSearch + city + "&appid=" + apiKey + "&units=metric",
  method: "GET"
}) 
requestForecast.done(function(call){
  console.log(call)

 
}).then(function(response){
  var dateArray = [];
  var iconArray = [];
  var tempArray = [];
  var humidityArray = []; 
  var div = $(".forecast[data-id="+ i +"]" ); 
  for(var i=1; i < 40; i++){
    var option = response.list[i].dt_txt.substring(11);
   // console.log(option)
    var dateValue = response.list[i].dt_txt.substring(0,10);
   // console.log(dateValue);
    var currentDate = moment().format("ddd, MMM Do HH:mm");
   // console.log(currentDate);
    if("15:00:00" == option && dateValue != currentDate){
      var dateString = response.list[i].dt_txt.substring("0,10");
      var date = new moment(dateString)
      var formatDate = date.format("DD/MM/YYYY")
      dateArray.push(formatDate);
      iconArray.push(response.list[i].weather[0].icon);
      tempArray.push(response.list[i].main.temp);
      humidityArray.push(response.list[i].main.humidity);
        console.log(humidityArray)
        console.log(iconArray)
        console.log(tempArray)
        console.log(dateArray)
    };
 
  };

  for (let i = 0; i <dateArray.length; i++) {


    var newDate = $("<p>").html("Date: " + dateArray[i]);
    $(".forecast[data-id="+ i +"]" ).append(newDate);  

  var newHumidity = $("<p>").html("Humidity:" + humidityArray[i]);
  $(".forecast[data-id="+ i +"]" ).append(newHumidity); 
  console.log(humidityArray)


  var newTemp = $("<p>").html("Temperature:" + tempArray[i]);
  $(".forecast[data-id="+ i +"]" ).append(newTemp);  

  var newImg = $("<img>");
  newImg.attr("src",  "http://openweathermap.org/img/wn/" + iconArray[i] + "@2x.png")
  $(".forecast[data-id="+ i +"]" ).append(newImg); 



  }
 


})


} ///forSearch function



















})//document.ready








