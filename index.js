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

let dateElement = document.querySelector ("#date");
let now = new Date();
dateElement.innerHTML = displayDate(now);

let timeElement = document.querySelector ("#time");
 timeElement.innerHTML = now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

function formatDate (timestamp){
  let formatteddate = new Date (timestamp);
  let formattedhours = formatteddate.getHours();
    if (formattedhours <10){
        formattedhours = `0${formattedhours}`;
    }
  let formattedminutes = formatteddate.getMinutes();
     if (formattedminutes < 10){
       formattedminutes = `0${formattedminutes}`;
     }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedday = days [formatteddate.getDay()];
  return `${formattedday} ${formattedhours}:${formattedminutes}`;
}


 function formatHours (timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
  if (hours <10){
  hours = `0${hours}`;
 }
 let minutes = date.getMinutes();
  if (minutes <10){
  minutes = `0${minutes}`
 }
   return `${hours}:${minutes}`;
}



 //document.querySelector ("#country").innerHTML = ","+ response.data.sys.country;

 function displayWeather(response){
   console.log(response);

let cityElement = document.querySelector ("#currentCity");
let temperatureElement = document.querySelector("#current-temp");
let humidityElement = document.querySelector ("#humidity-percent");
let tempMaxElement = document.querySelector("#high");
let tempMinElement = document.querySelector("#low");
let feelsLikeElement = document.querySelector("#feels-like");
let descriptionElement = document.querySelector("#weather-condition");
let dtElement = document.querySelector ("#dt");
let iconElement = document.querySelector ("#icon");

fahrenheitTemp = (response.data.main.temp); 

 cityElement.innerHTML= response.data.name;
 temperatureElement.innerHTML= Math.round(fahrenheitTemp);
 //temperatureElement.innerHTML= Math.round(response.data.main.temp);
 humidityElement.innerHTML= Math.round(response.data.main.humidity);
 tempMaxElement.innerHTML=Math.round(response.data.main.temp_max);
 tempMinElement.innerHTML= Math.round(response.data.main.temp_min);
 feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
 descriptionElement.innerHTML= response.data.weather[0].description;
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 dtElement.innerHTML = formatDate(response.data.dt * 1000);
}

 

 


 function displayHourlyForecast (response){
  let forecastElement = document.querySelector (".hourly");
    forecastElement.innerHTML = null;
  let forecast = null; 
 

    for (let index = 0; index < 4; index ++){
      let forecast = response.data.list[index];
      forecastElement.innerHTML +=
      `<button class="hourly">
      <h6>${formatHours (forecast.dt * 1000)}</h6>
        <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
        <h6>
      ${Math.round(forecast.main.temp)}&#176
        </h6>
      </button>`;

    }

      console.log (response.data);
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

      searchCity ("New York"); 

      let form= document.querySelector ("#searchCity");
      form.addEventListener ("click", showCitySubmit);


   function displayWeatherAtLocation(event){
          event.preventDefault();
          navigator.geolocation.getCurrentPosition(searchLocation);

        }

        
   function searchLocation (position){
     let lat= position.coords.latitude
     let lon = position.coords.longitude
     let apiKey = "ccc551a649e7c44f231a9a2558e1aaae";
     let units = "imperial";
     let apiUrl=` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
         axios.get(apiUrl).then(displayWeather);
        }

let currentLocationButton =document.querySelector ("#currentLocation");
currentLocationButton.addEventListener("click", displayWeatherAtLocation);

    
function displayFahrenheitTemp (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celLink.classList.remove("active");
  fahrLink.classList.add("active");

   temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    let celsiusTemp = (fahrenheitTemp - 32) * 5 /9;

    fahrLink.classList.remove ("active");
    celLink.classList.add ("active");

    temperatureElement.innerHTML= Math.round(celsiusTemp);
}

let fahrenheitTemp = null; 

let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", displayFahrenheitTemp);

let celLink= document.querySelector ("#celsius");
celLink.addEventListener ("click", displayCelsiusTemp);