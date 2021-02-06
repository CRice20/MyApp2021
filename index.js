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

function formatHours (timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
 if (hours <10){
   hours = `0${hours}`;

 let minutes = date.getMinutes();
 if (minutes <10){
   minutes = `0${minutes}`
 }
   return `${hours}:${minutes}`;
}

let fahrenheitTemp = null; 

 function displayWeather(response){
   console.log(response);
let iconElement = document.querySelector ("#icon");


  document.querySelector ("#currentCity").innerHTML=response.data.name;
  document.querySelector ("#country").innerHTML = ","+ response.data.sys.country;
  document.querySelector("#current-temp").innerHTML= Math.round(fahrenheitTemp);
 document.querySelector ("#humidity-percent").innerHTML=Math.round(response.data.main.humidity);
 document.querySelector("#high").innerHTML=Math.round(response.data.main.temp_max);
 document.querySelector("#low").innerHTML= Math.round(response.data.main.temp_min);
 document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
 document.querySelector("#weather-condition").innerHTML= response.data.weather[0].description;
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

 fahrenheitTemp = response.data.main.temp; 
  
  
 }

 function displayHourlyForecast (response){
   
   let forecastElement1 = document.querySelector ("#hourlyForecast1");
      
   let forecast = response.data.list[0];
   forecastElement1.innerHTML=
   `<button class="hourly">
   <h6>${formatHours (forecast.dt * 1000)}</h6>
   <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
   <h6>
   ${Math.round(forecast.main.temp)}&#176
   </h6>
    </button>`;
   
    let forecastElement2 = document.querySelector ("#hourlyForecast2")
    forecast = response.data.list[1];
        forecastElement2.innerHTML =
    `<button class="hourly">
    <h6>${formatHours (forecast.dt * 1000)}</h6>
    <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
    <h6>
    ${Math.round(forecast.main.temp)}&#176
    </h6>
     </button>`;

     let forecastElement3 = document.querySelector ("#hourlyForecast3")
    forecast = response.data.list[2];
        forecastElement3.innerHTML =
    `<button class="hourly">
    <h6>${formatHours (forecast.dt * 1000)}</h6>
    <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
    <h6>
    ${Math.round(forecast.main.temp)}&#176
    </h6>
     </button>`;

     let forecastElement4 = document.querySelector ("#hourlyForecast4")
     forecast = response.data.list[3];
         forecastElement4.innerHTML =
     `<button class="hourly">
     <h6>${formatHours (forecast.dt * 1000)}</h6>
     <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
     <h6>
     ${Math.round(forecast.main.temp)}&#176
     </h6>
      </button>`;


   console.log (forecast);
 }

      function searchCity (city){
              let apiKey = "ccc551a649e7c44f231a9a2558e1aaae";
               let units = "imperial";
               let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
                axios.get(apiUrl).then(displayWeather);

              let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
              axios.get(apiForecastUrl).then (displayHourlyForecast);
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
    
  


let currentLocationButton =document.querySelector ("#currentLocation");
currentLocationButton.addEventListener("click", displayWeatherAtLocation);

    
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celLink.classList.remove("active");
  fahrLink.classList.add("active");

   temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}



function displayCelsiusTemp(event) {
  event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");

    fahrLink.classList.remove ("active");
    celLink.classList.add ("active");

    let celsiusTemp = (fahrenheitTemp - 32) * 5 /9;
    temperatureElement.innerHTML= Math.round(celsiusTemp);
}

let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", displayFahrenheitTemp);
let celLink= document.querySelector ("#celsius");
celLink.addEventListener ("click", displayCelsiusTemp);

searchCity ("New York");