let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let today = document.querySelector("h1");
today.innerHTML = day;
let time = document.querySelector("h2");
if (minutes < 10) {
  time.innerHTML = `${hours}:0${minutes}`;
} else {
  time.innerHTML = `${hours}:${minutes}`;
}
///

///
function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  let currentLocation = document.querySelector("#current-location");
  cityInput = `${cityInput.value}`;
  currentLocation.innerHTML = cityInput;
  let apiKey = "ef930d0f984af2e7bd795e895a02ad6e";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;
  axios.get(`${weatherUrl}&appid=${apiKey}`).then(cityWeather);

  function cityWeather(response) {
    let iconElement = document.querySelector("#icon");
    let name = document.querySelector("#current-location");
    let temp = document.querySelector("#current-temp");
    let description = document.querySelector("#current-descr");
    let humidity = document.querySelector("#current-humidity");
    let wind = document.querySelector("#current-wind-speed");

    celsiusTemperature = response.data.main.temp;

    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    name.innerHTML = response.data.name;
    temp.innerHTML = Math.round(celsiusTemperature) + "˚C";
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = `Humidity ${Math.round(response.data.main.humidity)}%`;
    wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}mph`;

    function showPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let units = "metric";
      let apiKey = "ef930d0f984af2e7bd795e895a02ad6e";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(cityWeather);
    }
    function getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    let currentButton = document.querySelector("#current");
    currentButton.addEventListener("click", getCurrentPosition);
  }

  let citySearch = document.querySelector("#city-form");
  citySearch.addEventListener("submit", city);
  axios.get(`${weatherUrl}&appid=${apiKey}`).then(cityWeather);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "˚F";
}
function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "˚C";
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", city);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
