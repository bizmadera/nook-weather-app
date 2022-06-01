let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let months = [
  `January`,
  `Febuary`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let days = [`Sun.`, `Mon.`, `Tue.`, `Wed.`, `Thu.`, `Fri.`, `Sat.`];
let day = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerText = `${hour}:${minute}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerText = `${month} ${date}`;

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;

let celsiusTemperature = null;

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let currentCity = document.querySelector("h1.city-name");
  currentCity.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = `${temp}°C`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${description}`;
  let humidity = response.data.main.humidity
  let humidityNow = document.querySelector("#humidity");
  humidityNow.innerHTML = `Humidity: ${humidity}%`;
  let windspeed = response.data.wind.speed;
  let windNow = document.querySelector("#windspeed");
  windNow.innerHTML = `Wind: ${windspeed} km/h`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `img/${description}.png`);
}

function showForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = [`Thu`, `Fri`, `Sat`];
  days.forEach(function(day) {
  forecastHTML = forecastHTML +
  `<div class="col-4">
      <div class="day rounded-border">
        ${day}.
      </div>
      <div class="forecasted-weather-icon">
        <img id="forecasted-weather-icon" src="img/clear sky.png" width="100%">
      </div>
      <div class="forecasted-weather-temperature">
        <span class="forecased-weather-temperature-max">
          22°
        </span>
        <span class="forecased-weather-temperature-min">
          18°
        </span>
      </div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
};

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("h1.city-name");
  cityName.innerText = `${cityInput.value}`;
  let apiKey = `76f96a93beeb1a74b7f32846e978f838`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchCityForm = document.querySelector("body #search-submit");
searchCityForm.addEventListener("click", showCity);

function handlePosition(position) {
  let locationSwitch = document.querySelector("#switch");
  locationSwitch.innerHTML = `on`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `76f96a93beeb1a74b7f32846e978f838`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);

let geolocation = document.querySelector("#geolocation");
geolocation.addEventListener("click", handlePosition);

function showCelsiusUnits(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerText = `${celsiusTemperature}°C`;
}

let celsiusUnits = document.querySelector("#celsius-link");
celsiusUnits.addEventListener("click", showCelsiusUnits);

function showFahrenheitUnits(event) {
  event.preventDefault();
  let fahrenheitTemerature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerText = `${fahrenheitTemerature}°F`;
}
let fahrenheitUnits = document.querySelector("#fahrenheit-link");
fahrenheitUnits.addEventListener("click", showFahrenheitUnits);

showForecast();
