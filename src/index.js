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

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.textContent = formattedDateTime;
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

let currentDate = document.querySelector("#current-date");
let now = new Date();
let formattedNow = now.toLocaleDateString("en-US", {
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

currentDate.textContent = formattedNow;
