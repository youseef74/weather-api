const searchLocationInput = document.getElementById('searchLocation');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log(lat);
        console.log(lon);
        getWeatherData(`${lat},${lon}`);
    });
} else {
    console.log('Geolocation is not supported by your browser');
}

async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=40034cd4f2914e7dad5124640240107`);
    let data = await res.json();
    console.log(data);
    displayWeatherToday(data);
    displayWeatherTomorrow(data);
    displayWeatherDayAfterTomorrow(data);
}

searchLocationInput.addEventListener('input', function(e) {
    getWeatherData(e.target.value);
});

function displayWeatherToday(data) {
    const todayDate = data.current.last_updated;
    let date = new Date(todayDate);

    const todayWeekDay = date.toLocaleString('en-US', { weekday: 'long' });
    const todayDay = date.getDate();
    const todayMonth = date.toLocaleString('en-US', { month: 'long' });
    const cityName = data.location.name;
    const tempDay = data.current.temp_c;
    const textDay = data.current.condition.text;
    const icon = data.current.condition.icon;
    const iconToday = `https:${icon}`;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const windDirection = data.current.wind_kph;

    imgToday.src = iconToday;
    todayCond.innerHTML = textDay;
    tempToday.innerHTML = tempDay;
    cityToday.innerHTML = cityName;
    todayWeekDayMarkup.innerHTML = todayWeekDay;
    dateToday.innerHTML = `${todayDay} ${todayMonth}`;
    humidityToday.innerHTML = `${humidity}%`;
    windSpeedToday.innerHTML = `${windSpeed} kph`;
    windDirectionToday.innerHTML = `${windDirection} mph`;

    console.log('Humidity:', humidity);
    console.log('Wind Speed:', windSpeed);
}

function displayWeatherTomorrow({forecast}) {
    const tomorrowForecast = forecast.forecastday[1];
    let date = new Date(tomorrowForecast.date);

    const tomorrowWeekDay = date.toLocaleString('en-US', { weekday: 'long' });
    const tomorrowDay = date.getDate();
    const tomorrowMonth = date.toLocaleString('en-US', { month: 'long' });

    document.getElementById('tomorrowDay').innerHTML = tomorrowWeekDay;
    document.getElementById('dateTomorrow').innerHTML = `${tomorrowDay} ${tomorrowMonth}`;
    document.getElementById('iconTomorrow').setAttribute('src', `https:${tomorrowForecast.day.condition.icon}`);
    document.getElementById('tMaxTemp').innerHTML = `${tomorrowForecast.day.maxtemp_c}°C`;
    document.getElementById('tMinTemp').innerHTML = `${tomorrowForecast.day.mintemp_c}°C`;
}

function displayWeatherDayAfterTomorrow({forecast}) {
    const dayAfterTomorrowForecast = forecast.forecastday[2];
    let date = new Date(dayAfterTomorrowForecast.date);

    const dayAfterTomorrowWeekDay = date.toLocaleString('en-US', { weekday: 'long' });
    const dayAfterTomorrowDay = date.getDate();
    const dayAfterTomorrowMonth = date.toLocaleString('en-US', { month: 'long' });

    document.getElementById('aftertomorrowDay').innerHTML = dayAfterTomorrowWeekDay;
    document.getElementById('dateAfterTomorrow').innerHTML = `${dayAfterTomorrowDay} ${dayAfterTomorrowMonth}`;
    document.getElementById('iconAfterTomorrow').setAttribute('src', `https:${dayAfterTomorrowForecast.day.condition.icon}`);
    document.getElementById('daMaxTemp').innerHTML = `${dayAfterTomorrowForecast.day.maxtemp_c}°C`;
    document.getElementById('daMinTemp').innerHTML = `${dayAfterTomorrowForecast.day.mintemp_c}°C`;
    document.getElementById('dayAfterTomorrowCond').innerHTML = dayAfterTomorrowForecast.day.condition.text;
}

