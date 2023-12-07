const apiKey ="86045692bdcd8e69f2bd09f6fa690206";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    try{
        // Fetch weather data from the API
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else { 
            // Parse the response JSON
            var data = await response.json();


        // Update the UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
                
        if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
        }
        else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
        }
                
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        }


    } catch(error){
        // Handle errors
        console.log("An error occurred:", error);
    }
}

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Add event listener to the search input for the "keydown" event
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        // Call the checkWeather function with the value of the search input
        checkWeather(searchBox.value);
    }
});

// Call checkWeather function with an empty city (you may want to provide a default city)
checkWeather();