const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'a78fa02634ccece87a8aff0ca2dc5baf';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            
            
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    document.body.style.backgroundImage = "url('images/clearbg.jpg')";
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    document.body.style.backgroundImage = "url('images/rainbg.jpg')";
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    document.body.style.backgroundImage = "url('images/snowbg.jpg')";
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    document.body.style.backgroundImage = "url('images/cloudbg.jpg')";
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    document.body.style.backgroundImage = "url('images/mist.jpg')";
                    break;

                default:
                    image.src = '';
            }

        

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });


});