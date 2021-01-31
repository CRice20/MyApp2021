function displayDate (date){
let hour = date.getHours();
if (hour  > 12) {
  hour = (hour - 12) ;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weekdayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
  let currentDay = weekdayList[date.getDay()];
  let currentYear = date.getFullYear();
  let currentMonth = monthList[date.getMonth()];
  let currentDate = date.getDate();

 

 return  ` ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}` ; 
 
}

let dateElement = document.querySelector ("#date")
let now = new Date();
dateElement.innerHTML = displayDate(now);

let timeElement = document.querySelector ("#time")
 timeElement.innerHTML = now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});



 function displayWeather(response){
   console.log(response);
  document.querySelector ("#currentCity").innerHTML=response.data.name;
  document.querySelector ("#country").innerHTML = response.data.sys.country;
  document.querySelector("#current-temp").innerHTML= Math.round(response.data.main.temp);
 document.querySelector ("#humidity-percent").innerHTML=Math.round(response.data.main.humidity);
 document.querySelector("#high").innerHTML=Math.round(response.data.main.temp_max);
 document.querySelector("#low").innerHTML= Math.round(response.data.main.temp_min);
 document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
 document.querySelector("#weather-condition").innerHTML= response.data.weather[0].description;
 }

      function searchCity (city){
              let apiKey = "ccc551a649e7c44f231a9a2558e1aaae";
               let units = "imperial";
               let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
                axios.get(apiUrl).then(displayWeather);
        }


  function showCitySubmit(event) {
    event.preventDefault();
         let city = document.querySelector("#cityInput").value;
         searchCity (city);
      
        }

        function displayWeatherAtLocation(event){
          event.preventDefault();
          navigator.geolocation.getCurrentPosition(searchLocation)

        }
        function searchLocation (position){
         let lat= position.coords.latitude
          let lon = position.coords.longitude
           let apiKey = "ccc551a649e7c44f231a9a2558e1aaae";
           let units = "imperial";
         let apiUrl=` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
         axios.get(apiUrl).then(displayWeather);
        }

    let form= document.querySelector ("#searchCity");
form.addEventListener ("click", showCitySubmit);
    
    
searchCity ("New York");    

let currentLocationButton =document.querySelector ("#currentLocation");
currentLocationButton.addEventListener("click", displayWeatherAtLocation)

    
function cToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round ((temperature * 9)/ 5 +32);
}

function fToCelsius(event) {
  event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
    temperature.innerHTML = Math.round ((temperature - 32) * 5 /9);
}

let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", cToFahrenheit);
let celLink= document.querySelector ("#celsius");
celLink.addEventListener ("click", fToCelsius);