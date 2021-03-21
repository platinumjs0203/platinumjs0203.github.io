const weather = document.querySelector(".weather")

const API_KEY = "c862c3099b0324626bd7075d12cb7d47"
const COORDS = 'coords'

function getWeather(위, 경){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${위}&lon=${경}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const feel = json.main.feels_like;
        weather.innerText = `Current Location : ${place}
        Current temperature ${temperature} degrees
        Current wind chill temperature is ${feel} degrees         
        `;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const 위도 = position.coords.latitude;
    const 경도 = position.coords.longitude;
    const coordsObj = {
        위도,
        경도
    };
    saveCoords(coordsObj);
    getWeather(위도, 경도)
}

function handleGeoError(){
    console.log("error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.위도, parsedCoords.경도);
    }
}

function init(){
    loadCoords();
}
init();