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

// When the page loads, retrieve and display saved preferences
window.onload = function () {
  // Retrieve saved city and unit preferences
  const savedCity = localStorage.getItem("lastSearchedCity");
  const savedUnit = sessionStorage.getItem("unit");

  // Retrieve the username from cookies
  const savedUsername = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1];

  // Log saved values to check if they exist Debug
  console.log("Saved City:", savedCity);
  console.log("Saved Unit:", savedUnit);
  console.log("Saved Username:", savedUsername);

  if (savedUsername) {
    usernameInput.value = savedUsername;
    displayGreeting(savedUsername);
  }

  if (savedCity || savedUnit) {
    cityInput.value = savedCity;
    unitToggle.value = savedUnit;

    // Retrieve weather data from localStorage
    const savedWeatherData =
      JSON.parse(localStorage.getItem("weatherData")) || [];
    console.log("Saved Weather Data:", savedWeatherData);

    // Check if there's weather data to display
    if (savedWeatherData.length > 0) {
      savedWeatherData.forEach((data) => {
        displayWeather(data, savedUnit); // Call displayWeather for each saved weather data
      });
    } else {
      console.log("No saved weather data found.");
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

  // Fetch and display weather data
  const weatherData = await getCurrentWeather(cityName, unit);

  // Retrieve existing data or initialize an empty array
  const weatherArray = JSON.parse(localStorage.getItem("weatherData")) || [];
  weatherArray.push(weatherData); // Add new data to the array

  // Save the updated array back to localStorage
  localStorage.setItem("weatherData", JSON.stringify(weatherArray));
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

    //
    cityNameDiv.textContent = `Weather in ${city}`;
    weatherDescDiv.textContent = `Conditions: ${description} | Humidity: ${humidity}%`;
    tempDiv.textContent = `Temperature: ${temperature}°${
      unit === "metric" ? "C" : "F" //TENARY OPERATOR TODO:
    }`;

    return { city, description, humidity, temperature };
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    alert(`City: ${cityName} not found, please try again.`);
  }
}

function displayWeather(weatherData, unit) {
  const { city, description, humidity, temperature } = weatherData;

  // Update the DOM elements with the weather data
  cityNameDiv.textContent = `Weather in ${city}`;
  weatherDescDiv.textContent = `Conditions: ${description} | Humidity: ${humidity}%`;
  tempDiv.textContent = `Temperature: ${temperature}°${
    unit === "metric" ? "C" : "F"
  }`;
}
