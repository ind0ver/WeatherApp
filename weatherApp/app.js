window.addEventListener('load', ()=> {
let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/e237b812aab3a7c09db08badbf215055/${lat},${long}`;
    
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const { temperature, summary, icon } = data.currently;
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            
            let celsius = (temperature - 32) * (5 / 9);

            setIcons(icon, document.querySelector('.icon'));

            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureDegree.textContent = temperature;
                    temperatureSpan.textContent = "F"
                }
            })
        });
    });
}

function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currencIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currencIcon]);
}

})


