// Declare my variables
const APIKEY = "9603944ddfe2d94ec534f7dbb5b11ec1";
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const usernameInput = document.getElementById("username");
const unitToggle = document.getElementById("unit-toggle");
const weatherCard = document.getElementById("weather-card");
const greetingDiv = document.getElementById("greeting");
const cityNameDiv = document.getElementById("city-name");
const weatherDescDiv = document.getElementById("weather-description");
const tempDiv = document.getElementById("temperature");

// First On page load, retrieve and display saved preferences
window.onload = function () {
  // Load city and username from sessionStorage/localStorage
  const savedCity = localStorage.getItem("lastSearchedCity"); //last searched data, City Humid, return Array //local storage, save all data
  const savedUnit = sessionStorage.getItem("unit"); //Session
  const savedUsername = localStorage.getItem("username"); //Cookies

  if (savedCity) {
    cityInput.value = savedCity;
    //Default to metric since in Canada we use Celcius
    getCurrentWeather(savedCity, savedUnit || "metric"); //Local storage TODO: LOOPS
    // parsing cookies
  }

  if (savedUsername) {
    usernameInput.value = savedUsername;
    document.cookie = `myCookie=${savedUnit}; max-age=300`;
    displayGreeting(savedUsername);
  }

  if (savedUnit) {
    unitToggle.value = savedUnit;
  }
};

// Handle form submission
weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const cityName = cityInput.value;
  const userName = usernameInput.value;
  const unit = unitToggle.value;

  // Save preferences
  document.cookie = `username=${userName}; max-age=300`;
  localStorage.setItem("lastSearchedCity", cityName);
  sessionStorage.setItem("unit", unit);

  // Display personalized greeting
  displayGreeting(userName);

  // Fetch weather data
  await getCurrentWeather(cityName, unit);
});

// Display personalized greeting
function displayGreeting(name) {
  // const para = document.createElement(p)
  greetingDiv.textContent = `Good Day, ${name}! Your weather stats below`;
}
//test

// Fetch current weather for a given city and unit
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

    // Update the DOM with weather data
    cityNameDiv.textContent = `Weather in ${city}`;
    weatherDescDiv.textContent = `Conditions: ${description}`;
    weatherDescDiv.textContent = `Humidity: ${humidity}`;
    if (unit === "metric") {
      tempDiv.textContent = `Temperature: ${temperature}°C`;
    } else {
      tempDiv.textContent = `Temperature: ${temperature}°F`;
    }
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    alert(`City: ${cityName} not found, please try again.`);
  }
}
