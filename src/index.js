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
    let name = document.querySelector("#current-location");
    name.innerHTML = response.data.name;
    let temp = document.querySelector("#current-temp");
    temp.innerHTML = Math.round(response.data.main.temp) + "˚C";
    let precipication = document.querySelector("#current-prec");
    precipication.innerHTML = `Precipication ${Math.round(
      response.data.clouds.all
    )}%`;
    let humidity = document.querySelector("#current-humidity");
    humidity.innerHTML = `Humidity ${Math.round(response.data.main.humidity)}%`;
    let wind = document.querySelector("#current-wind-speed");
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
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", city);
