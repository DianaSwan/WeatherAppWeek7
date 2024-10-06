function displayCurrentDateTime() {
  let now = new Date();
  let options = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  let formattedDateTime = now
    .toLocaleDateString("en-US", options)
    .replace(",", "");

  let currentDetailsElement = document.querySelector("#current-details");
  currentDetailsElement.innerHTML = `${formattedDateTime}, moderate rain <br /> Humidity: <strong>87%</strong>, Wind: <strong>7.2 km/h</strong>`;
}

function searchCity(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    let currentCityElement = document.querySelector("#current-city");
    currentCityElement.textContent = city;
  }
}
let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchCity);

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
let minutes = currentTime.getMinutes();
let hours = currentTime.getHours();
let day = currentTime.getDay();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let formattedDay = days[day];

currentDate.innerHTML = `${formattedDay} ${hours}:${minutes}`;

displayCurrentDateTime();
