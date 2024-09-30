
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p class="error">An error occurred: ${error.message}. Please try again later.</p>`;
    }
}

function displayWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    
    weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <div class="weather-main">
            <img src="${weatherIcon}" alt="${weather[0].description}">
            <p class="temperature">${Math.round(main.temp)}°C</p>
        </div>
        <p class="description">${weather[0].description}</p>
        <div class="weather-details">
            <p>Feels like: ${Math.round(main.feels_like)}°C</p>
            <p>Min: ${Math.round(main.temp_min)}°C</p>
            <p>Max: ${Math.round(main.temp_max)}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind: ${wind.speed} m/s</p>
            <p>Pressure: ${main.pressure} hPa</p>
        </div>
    `;
}
