function changeTheme() {
  let body = document.querySelector("body");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    document.getElementsByClassName("dark-button")[0].innerHTML =
      "Dark View";
  } else {
    body.classList.add("dark");
    document.getElementsByClassName("dark-button")[0].innerHTML =
      "Bright View";
  }
}
let darkButton = document.querySelector(".dark-button");
darkButton.addEventListener("click", changeTheme);

function refreshWeather(response) {
  //pull and display data points - current temperature, today's high, and today's low
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(
    response.data.current.temperature_2m
  )}`;

  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = `${Math.round(
    response.data.daily.temperature_2m_max
  )}`;

  let minTemp = document.querySelector("#low");
  minTemp.innerHTML = `${Math.round(
    response.data.daily.temperature_2m_min
  )}`;
  // console.log(currentTemp);
  // console.log(maxTemp);
  // console.log(minTemp);
}

function loadCity(response) {
  // Get lat/long results from GeoCoding to fit into Open-Meteo call
  let latitude = response.data.results[0].latitude;
  let longitude = response.data.results[0].longitude;

  //make call to open-meteo api with latitude/longitude
  let weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&forecast_days=1`;
  console.log(weatherApiUrl);
  // Display search result as a city name
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.results[0].name;

  axios.get(weatherApiUrl).then(refreshWeather);
}

function searchCity(city) {
  //make call to GeoCoding to find city and convert to Lat/Long for Open-Meteo
  let geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  console.log(geoApiUrl);

  axios.get(geoApiUrl).then(loadCity);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#city-search");
searchElement.addEventListener("submit", handleSearch);

// load a default city
searchCity("Dublin");
