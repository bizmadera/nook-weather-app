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

let currentTime = document.querySelector("#current-time");
currentTime.innerText = `${hour}:${minute}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerText = `${month} ${date}, ${year}`;

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let currentCity = document.querySelector("h1.city-name");
  currentCity.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("h3.temperature-now");
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
}

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
  let temperatureNow = document.querySelector("h3.temperature-now");
  temperatureNow.innerText = `19°C`;
}

let celsiusUnits = document.querySelector("#celsius-link");
celsiusUnits.addEventListener("click", showCelsiusUnits);

function showFahrenheitUnits(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("h3.temperature-now");
  temperatureNow.innerText = `66°F`;
}
let fahrenheitUnits = document.querySelector("#fahrenheit-link");
fahrenheitUnits.addEventListener("click", showFahrenheitUnits);
