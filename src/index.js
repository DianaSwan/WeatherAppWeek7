function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    let currentCityElement = document.querySelector("#current-city");
    currentCityElement.textContent = city;
  }
}

let searchform = document.querySelector("form");
searchform.addEventListener("submit", searchCity);

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
let minutes = currentTime.getMinutes();
let hours = currentTime.getHours();
let day = currentTime.getDay();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
