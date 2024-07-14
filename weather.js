function refreshWeather(response) {
  let currentTemp = response.data.current.temperature_2m;
  console.log(currentTemp);
}

function loadCity(response) {
  let latitude = response.data.results[0].latitude;
  let longitude = response.data.results[0].longitude;

  //make call to open-meteo api with latitude/longitude
  let weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit`;
  console.log(weatherApiUrl);

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
  // let searchInput = document.querySelector("#search-text-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchInput = document.querySelector("#search-text-input");

let searchElement = document.querySelector("#city-search");
searchElement.addEventListener("submit", handleSearch);
