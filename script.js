const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const myIcon = document.querySelector('.fa-location-arrow');

myIcon.addEventListener('click', () => {
  // code to execute when the icon is clicked
  getLocation();
});

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
                 
                case 'Drizzle':
                    image.src = 'images/rain.png';
                    document.body.style.backgroundImage = "url('images/drizzlebg.jpg')";
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
                    document.body.style.backgroundImage = "url('images/hazebg.jpg')";
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

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// Get the user's current geolocation
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let query = latitude + ',' + longitude;
    
  
 
    
      var api_key = '745141ddd0c547169b9c3c25e995fc7d';

      
      // forward geocoding example (address to coordinate)
      // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
      // note: query needs to be URI encoded (see below)
    
      var api_url = 'https://api.opencagedata.com/geocode/v1/json'
    
      var request_url = api_url
        + '?'
        + 'key=' + api_key
        + '&q=' + encodeURIComponent(query)
        + '&abbrv=1'
        + '&address_only=0'
        + '&roadinfo=1';
        
    
      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward
    
      var request = new XMLHttpRequest();
      request.open('GET', request_url, true);
    
      request.onload = function() {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes
    
        if (request.status === 200){
          // Success!
          var data = JSON.parse(request.responseText);
          let city = (data.results[0].formatted);
          let input = document.getElementById("location-input");
         input.value = city;
    
        } else if (request.status <= 500){
          // We reached our target server, but it returned an error
    
          console.log("unable to geocode! Response code: " + request.status);
          var data = JSON.parse(request.responseText);
          console.log('error msg: ' + data.status.message);
        } else {
          console.log("server error");
        }
      };
    
      request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");
      };
    
      request.send();  // make the request
  }

  // Handle geolocation errors
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
