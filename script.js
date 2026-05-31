// Auto run
window.onload = () => {
    getLocation();
};

// Get user GPS location
function getLocation() {
    document.getElementById("location").innerText = "Getting location...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation not supported");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchWeather(lat, lon);
}

// fallback location (Bungoma/Nairobi region)
function error() {
    document.getElementById("location").innerText =
        "Location denied. Using default (Kenya).";

    fetchWeather(-1.286389, 36.817223);
}

// Fetch weather from Open-Meteo API
function fetchWeather(lat, lon) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,rain,precipitation_probability,precipitation&timezone=auto`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log(data);

            // Get current hour index
            const now = new Date();
            const hourIndex = now.getHours();

            const temp = data.hourly.temperature_2m[hourIndex];
            const humidity = data.hourly.relative_humidity_2m[hourIndex];
            const rain = data.hourly.rain[hourIndex];
            const precip = data.hourly.precipitation[hourIndex];

            document.getElementById("location").innerText =
                `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;

            document.getElementById("temp").innerText =
                `${temp}°C`;

            document.getElementById("humidity").innerText =
                `Humidity: ${humidity}%`;

            document.getElementById("rain").innerText =
                `Rain: ${rain} mm`;

            document.getElementById("precip").innerText =
                `Precipitation: ${precip} mm`;
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load weather data");
        });
}