function displayCurrentDateTime(timezoneOffset) {
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

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.textContent = formattedDateTime;
}

function getWeatherData(city) {
  let apiKey = "24a843192c3oc0c5tab227801f7a3edf";

  let geocodingApiUrl = `https://api.shecodes.io/weather/v1/geocode?query=${city}&key=${apiKey}`;

  fetch(geocodingApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data[0]) {
        let lat = data[0].latitude;
        let lon = data[0].longitude;

        let weatherApiURL = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
        return fetch(weatherApiURL);
      } else {
        console.log("City not found");
      }
    })
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

document.addEventListener("DOMContentLoaded", () => {
  getWeatherData("Nairobi");
});

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchCity);
