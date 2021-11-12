let currentDayTime = document.querySelector("#current-day-time");
let currentFullDate = new Date();
let hours = currentFullDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentFullDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

currentDayTime.innerHTML = `${
  days[currentFullDate.getDay()]
} ${hours}:${minutes}`;

function showCurrentWeather(response) {
  let description = response.data.weather[0].main;
  let descriptionDisplayed = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let tempDisplayed = document.querySelector("#current-temp");
  let humidity = response.data.main.humidity;
  let humidityDisplayed = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedDisplayed = document.querySelector("#windSpeed");
  let cityNameDisplayed = document.querySelector("h1");
  descriptionDisplayed.innerHTML = description;
  tempDisplayed.innerHTML = temperature;
  humidityDisplayed.innerHTML = humidity;
  windSpeedDisplayed.innerHTML = windSpeed;
  cityNameDisplayed.innerHTML = response.data.name;
}

function search(cityName) {
  let apiKey = "42d967004f943c4e9a88d5763e34cc28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  let cityName = searchInput.value;
  search(cityName);
}

function showPositionWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "42d967004f943c4e9a88d5763e34cc28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentWeather);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

search("New York");
