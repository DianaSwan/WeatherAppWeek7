function displayCurrentDateTime(timezoneoffset) {
  let now = new Date();
  let localTime = new Date(now.getTime() + timezoneOffset * 1000);

  let options = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  let formattedDateTime = localTime
    .toLocaleDateString("en-US", options)
    .replace(",", "");

  let currentDetailsElement = document.querySelector("#current-details");
  currentDetailsElement.innerHTML = `${formattedDateTime}, moderate rain <br /> Humidity: <strong>87%</strong>, Wind: <strong>7.2 km/h</strong>`;
}

function getWeatherData(city) {
  let apiKey = "24a843192c3oc0c5tab227801f7a3edf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.temperature && data.temperature.current) {
        let currentCityElement = document.querySelector("#current-city");
        currentCityElement.textContent = data.city;

        let currentTemperatureElement = document.querySelector(
          ".current-temperature-value"
        );
        currentTemperatureElement.textContent = Math.round(
          data.temperature.current
        );

        let currentDetailsElement = document.querySelector(".current-details");
        currentDetailsElement.innerHTML = `${data.condition.description} <br /> Humidity: <strong>${data.temperature.humidity}%</strong>, Wind: <strong>${data.wind.speed} km/h</strong>`;

        displayCurrentDateTime(data.timezone.offset);
      } else {
        console.log("Temperature data not available");
      }
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

function searchCity(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    getWeatherData(city);
  }
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchCity);

searchCity(new Event("submit"));

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
