// Declare your variables
const APIKEY = "9603944ddfe2d94ec534f7dbb5b11ec1";
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const usernameInput = document.getElementById("username");
const unitToggle = document.getElementById("unit-toggle");
const weatherCard = document.getElementById("weather-card");
const greetingDiv = document.getElementById("greeting"); // My Divs
const cityNameDiv = document.getElementById("city-name");
const weatherDescDiv = document.getElementById("weather-description");
const tempDiv = document.getElementById("temperature");

// Error message handling
const cityError = document.createElement("div");
cityError.style.color = "red";
cityError.style.marginTop = "5px";

const usernameError = document.createElement("div");
usernameError.style.color = "red";
usernameError.style.marginTop = "5px";

// Append errors to the form
cityInput.parentNode.appendChild(cityError);
usernameInput.parentNode.appendChild(usernameError);

// Handle form submission
weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Clear previous error messages
  cityError.textContent = "";
  usernameError.textContent = "";

  // Validate inputs
  let hasError = false;
  const cityName = cityInput.value.trim();
  const userName = usernameInput.value.trim();
  const unit = unitToggle.value;

  if (!cityName) {
    cityError.textContent = "Please enter a city name.";
    hasError = true;
  }

  if (!userName) {
    usernameError.textContent = "Please enter your name.";
    hasError = true;
  }

  if (hasError) return; // Stop form submission if there are errors

  // Set username as a cookie with a longer expiry time
  document.cookie = `username=${userName}; max-age=300`;
  localStorage.setItem("lastSearchedCity", cityName); // Save city in loacl, unit in seesion and username in Cookie
  sessionStorage.setItem("unit", unit);
  displayGreeting(userName);

  // Fetch and display weather data
  const weatherData = await getCurrentWeather(cityName, unit);

  // Retrieve existing data or initialize an empty array
  const weatherArray = JSON.parse(localStorage.getItem("weatherData")) || [];
  weatherArray.push(weatherData);

  // Save the updated array back to localStorage
  localStorage.setItem("weatherData", JSON.stringify(weatherArray));
});

// Display greeting
function displayGreeting(name) {
  greetingDiv.textContent = `Good Day, ${name}! Your weather stats below`;
}

// Fetch current weather
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
    tempDiv.textContent = `Temperature: ${temperature}°${
      unit === "metric" ? "C" : "F"
    }`;

    return { city, description, humidity, temperature };
  } catch (error) {
    console.error("Error fetching weather data: ", error);

    // Display error message
    cityNameDiv.textContent = `City: ${cityName} not found. Please try again.`;
    cityNameDiv.style.color = "red";

    // Clear weather stats and greeting
    greetingDiv.style.display = "none";
    weatherDescDiv.style.display = "none";
    tempDiv.style.display = "none";

    // Refresh the page after showing the error after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);

    return;
  }
}

// Display weather data
function displayWeather(weatherData, unit) {
  const { city, description, humidity, temperature } = weatherData;

  // Update the DOM elements with the weather data
  cityNameDiv.textContent = `Weather in ${city}`;
  weatherDescDiv.textContent = `Conditions: ${description}  Humidity: ${humidity}%`;
  tempDiv.textContent = `Temperature: ${temperature}°${
    unit === "metric" ? "C" : "F"
  }`;
}

// Load data on page load
window.onload = function () {
  const savedCity = localStorage.getItem("lastSearchedCity");
  const savedUnit = sessionStorage.getItem("unit");
  const savedUsername = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1];

  if (savedUsername) {
    usernameInput.value = savedUsername;
    displayGreeting(savedUsername);
  }

  if (savedCity) {
    cityInput.value = savedCity;
  }

  if (savedUnit) {
    unitToggle.value = savedUnit;
  }

  const savedWeatherData =
    JSON.parse(localStorage.getItem("weatherData")) || [];

  if (savedWeatherData.length > 0) {
    // Display the last searched weather data
    const latestWeatherData = savedWeatherData[savedWeatherData.length - 1];
    displayWeather(latestWeatherData, savedUnit);
  }
};
