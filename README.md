# Weather Dashboard Web App

## Course and Assignment Information: CPNT-262

This project is part of a course assignment designed to demonstrate key web development concepts. The Weather Dashboard web app allows users to fetch live weather data for any city, personalize their experience, and save their preferences using cookies, local storage, and session storage.

---

## Author

**Rufaro Mucheri**  
CPNT-262 .

---

## Project Overview

The Weather Dashboard Web App provides:

1. **Live Weather Data**: Fetches current weather details using the OpenWeatherMap API.
2. **Personalization Features**:
   - Greets users by name using cookies.
   - Saves the last searched city in local storage.
   - Stores temperature unit preferences in session storage.
3. **Error Handling**: Displays helpful messages when invalid data is entered or when errors occur during API requests.

---

## Key Features

- **Modern Web Development Concepts**:
  - **Forms and Validation**: Ensures valid user input before processing.
  - **Async/Await**: Handles API requests efficiently.
  - **DOM Manipulation**: Dynamically updates the UI with real-time data.
  - **Error Handling**: Improves user experience with intuitive error messages.
  - **Storage Techniques**: Implements cookies, local storage, and session storage to enhance user experience.
- **Weather Data**:
  - Displays city, conditions, temperature, and humidity.
  - Supports both metric (Celsius) and imperial (Fahrenheit) units.

---

## Technologies Used

- **HTML**: Structure for the web app.
- **CSS**: Styling for a modern and responsive user interface.
- **JavaScript**: Core logic for API interaction, DOM manipulation, and storage handling.
- **OpenWeatherMap API**: Provides live weather data.

---

## Pseudo Code

### 1. Initial Setup

- Declare variables for API key, form elements, and UI containers.
- Set up error containers for user feedback.

### 2. Form Submission Logic

- Validate user inputs (city and name).
- Display error messages if inputs are invalid.
- Store user preferences:
  - **Username**: Saved as a cookie.
  - **City Name**: Stored in local storage.
  - **Unit Preference**: Saved in session storage.

### 3. Fetch Weather Data

- Use the OpenWeatherMap API to get live weather details.
- Handle errors during API calls (e.g., invalid city name).
- Update the DOM with weather information:
  - City name
  - Description (conditions)
  - Temperature
  - Humidity

### 4. Greeting and Personalization

- Use cookies to greet the user by name.
- Retrieve and display the last searched city and unit preferences on page load.

### 5. Error Handling

- Display intuitive error messages for missing or invalid inputs.
- Reload the app after displaying errors for easy correction.

### 6. On Page Load

- Retrieve saved data from cookies, local storage, and session storage.
- Automatically display the last searched weather data (if available).

---

## How to Run

1. Clone or download the repository. [REPO](https://github.com/rufustech/cpnt262-api-project.git)
2. Open the `index.html` file in your browser.
3. Enter your name and a city to fetch weather details.
4. Toggle between Celsius and Fahrenheit for temperature units.
5. Refresh the page to see saved preferences in action.
6. Alternatively go to github pages URL and use the Application [page Link](https://rufustech.github.io/cpnt262-api-project/)

---

## Attributions

- **Weather Data**: [OpenWeatherMap API](https://openweathermap.org/)
- **Icons and UI Inspiration**: [Font Awesome](https://fontawesome.com/)
- **Fonts** [Google fonts](https://fonts.google.com/)

---

## Future Enhancements

- Implement a dark/light mode for better usability.

---

## Contact

For questions or feedback, reach out at rufaro.mucheri@edu.sait.ca
