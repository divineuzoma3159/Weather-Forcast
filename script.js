const mySearch = document.querySelector(".mySearch");
const myDisplayer = document.querySelector(".myDisplayer");
const apiKey = "54ee3bc0b577a2b455900aeff404e7c3";
const card = document.querySelector(".card");

card.addEventListener('submit', async e =>{
    e.preventDefault()
    const vals = mySearch.value;
    if(vals){
        try{
            const weatherData = await getWeatherDate(vals);
            displayWeather(weatherData)
        }catch(error){
            console.error(error);
            errorDisplay(error)
        }
    }else{
        errorDisplay("Please input a city")
    }
});

async function getWeatherDate(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const responses = await fetch(url)
    if(!responses){
        throw new Error("City could not be found")
    }
    return await responses.json()
}
function displayWeather(data){
    const{
        name: city,
        main: {temp,humidity},
        weather: [{description,id}]
    } = data;
    
    myDisplayer.textContent = "";
    myDisplayer.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidDisplay = document.createElement('p');
    const descDisplay= document.createElement('p');
    const weatherDisplay = document.createElement('p');

    // to celcuis (temp - 273.15)
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherDisplay.textContent = getEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidDisplay.classList.add("humidDisplay");
    descDisplay.classList.add("descDisplay");
    weatherDisplay.classList.add("weatherDisplay");

    myDisplayer.appendChild(cityDisplay);
    myDisplayer.appendChild(tempDisplay);
    myDisplayer.appendChild(humidDisplay);
    myDisplayer.appendChild(descDisplay);
    myDisplayer.appendChild(weatherDisplay);
}
function getEmoji(weatherId){
    switch(true){
        case(weatherId >=200 && weatherId < 300):
        return "⛈️";
        case(weatherId >=300 && weatherId < 400):
        return "🌧️";
        case(weatherId >=500 && weatherId < 600):
        return "🌧️";
        case(weatherId >=600 && weatherId < 700):
        return "❄️";
        case(weatherId >=700 && weatherId < 800):
        return "💨";
        case(weatherId === 800):
        return "☀️";
        case(weatherId >=601 && weatherId < 810):
        return "☁️";
        default:
            return "❓";
    }

}
function errorDisplay(message){
    const p = document.createElement('p');
    p.textContent = message;
    p.classList.add('errorDisplay');

    myDisplayer.textContent = "";
    myDisplayer.style.display = "flex";
    myDisplayer.appendChild(p);
}