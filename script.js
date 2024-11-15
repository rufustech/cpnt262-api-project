//Declare my variables

const APIKEY = "9603944ddfe2d94ec534f7dbb5b11ec1";
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const usernameInput = document.getElementById("username");
const unitToggle = document.getElementById("unit-toggle");
const weatherCard = document.getElementById("weather-card");
const greetingDiv = document.getElementById("greeting");      //My Divs
const cityNameDiv = document.getElementById("city-name");
const weatherDescDiv = document.getElementById("weather-description");
const tempDiv = document.getElementById("temperature");


// When the page loads, retrieve and display saved preferences
window.onload = function () {
  const savedCity = localStorage.getItem("lastSearchedCity");
  const savedUnit = sessionStorage.getItem("unit");

  // Retrieve the username from the cookie
  const savedUsername = document.cookie
    .split('; ')
    .find(row => row.startsWith('username='))
    ?.split('=')[1];

  if (savedUsername) {
    usernameInput.value = savedUsername;
    displayGreeting(savedUsername);
  }

  if (savedCity && savedUnit) {
    cityInput.value = savedCity;
    unitToggle.value = savedUnit;

    // Load weather data from localStorage and display it using a loop
    const savedWeatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (savedWeatherData) {
      for (const [key, value] of Object.entries(savedWeatherData)) {
        if (key === "city") {
          cityNameDiv.textContent = `Weather in ${value}`;
        } else if (key === "description") {
          weatherDescDiv.textContent = `Conditions: ${value}`;
        } else if (key === "humidity") {
          weatherDescDiv.textContent += ` | Humidity: ${value}%`;
        } else if (key === "temperature") {
          tempDiv.textContent = `Temperature: ${value}°${savedUnit === "metric" ? "C" : "F"}`;
        }
      }
    }
  }
};

// Handle form submission
weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const cityName = cityInput.value;
  const userName = usernameInput.value;
  const unit = unitToggle.value;

  // Set username as a cookie
  document.cookie = `username=${userName}; max-age=300`;
  localStorage.setItem("lastSearchedCity", cityName);
  sessionStorage.setItem("unit", unit);
  displayGreeting(userName);

  // Fetch and display weather data, then store it in localStorage
  const weatherData = await getCurrentWeather(cityName, unit);
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
});

function displayGreeting(name) {
  greetingDiv.textContent = `Good Day, ${name}! Your weather stats below`;
}


async function getCurrentWeather(cityName, unit = "metric") {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${APIKEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const city = data.name;

    cityNameDiv.textContent = `Weather in ${city}`;
    weatherDescDiv.textContent = `Conditions: ${description} | Humidity: ${humidity}%`;
    tempDiv.textContent = `Temperature: ${temperature}°${unit === "metric" ? "C" : "F"}`;

    return { city, description, humidity, temperature };
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    alert(`City: ${cityName} not found, please try again.`);
  }
}










