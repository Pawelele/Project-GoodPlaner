const cityName = document.querySelector('.weather-city');
const temperature = document.querySelector('.weather-temperature');
const humidity = document.querySelector('.weather-humidity');
const pressure = document.querySelector('.weather-pressure');
const weatherIcon = document.querySelector('.weather-img');

// weather settings variables
const weatherChangeSection = document.querySelector('.weather-change')
const weatherSettingsBtn = document.querySelector('.weather-settings');
const weatherSettingsInput = document.querySelector('.weather-change-input');
const weatherSettingsSubmit = document.querySelector('.weather-change-button');
let currentCity = 'Katowice';


// Weather API
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=38ee23d28167d91ea9c6263c8241e6ff';
const API_UNITS = '&units=metric';
const API_LANGUAGE = '&lang=pl';

const getWeather = () => {
    const city = currentCity;
    const URL = API_LINK + city + API_KEY + API_UNITS + API_LANGUAGE;

    axios.get(URL).then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;

        cityName.textContent = res.data.name;
        temperature.textContent = Math.round(temp) + ' ℃';
        humidity.textContent = hum + '%';
        pressure.textContent = res.data.main.pressure + ' hPa';

        if(res.data.weather[0].id < 233)
        {
            weatherIcon.setAttribute('src', './img/weather/thunderstorm.png');
        }
        else if(res.data.weather[0].id >= 300 && res.data.weather[0].id <= 321)
        {
            weatherIcon.setAttribute('src', './img/weather/drizzle.png');
        }
        else if(res.data.weather[0].id >= 500 && res.data.weather[0].id <= 531)
        {
            weatherIcon.setAttribute('src', './img/weather/rain.png');
        }
        else if(res.data.weather[0].id >= 600 && res.data.weather[0].id <= 622)
        {
            weatherIcon.setAttribute('src', './img/weather/ice.png');
        }
        else if(res.data.weather[0].id >= 701 && res.data.weather[0].id <= 781)
        {
            weatherIcon.setAttribute('src', './img/weather/fog.png');
        }
        else if(res.data.weather[0].id == 800)
        {
            weatherIcon.setAttribute('src', './img/weather/sun.png');
        }
        else if(res.data.weather[0].id >= 801 && res.data.weather[0].id <= 804)
        {
            weatherIcon.setAttribute('src', './img/weather/cloud.png');
        }
        else
        {
            console.log("błąd");
        }

    })
}

// change city
const changeCity = () => {
    currentCity = weatherSettingsInput.value;

        getWeather();
        weatherChangeSection.classList.remove('weather-change-active');
}


// EventListeners
weatherSettingsSubmit.addEventListener('click', changeCity);
weatherSettingsBtn.addEventListener('click', () => weatherChangeSection.classList.toggle('weather-change-active'));


getWeather();
window.setInterval(getWeather, 60000);