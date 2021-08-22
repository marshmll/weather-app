import React from 'react'
import Box from '../src/components/common/Box';
import HeaderWrapper from '../src/components/wrappers/HeaderWrapper';
import ContentWrapper from '../src/components/wrappers/ContentWrapper';
import LeftColumnWrapper from '../src/components/wrappers/LeftColumnWrapper';
import RightColumnWrapper from '../src/components/wrappers/RightColumnWrapper';
import WeatherWrapper from '../src/components/wrappers/WeatherWrapper';
import WeatherSecondaryWrapper from '../src/components/wrappers/WeatherSecondaryWrapper';

export default function Home() {

  const API_KEY = '588d93379fb2561d21907bfeb9eeb8b7'
  const STANDART_UNITS = 'metric'
  const [cityWeather, setCityWeather] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState('');
  const [favoriteButtonStatus, setFavoriteButtonStatus] = React.useState(false)

  React.useEffect(() => {

    if (localStorage.getItem('FAVORITE_CITY')) {
      setFavoriteButtonStatus(!favoriteButtonStatus);
      getWeatherFromCity(localStorage.getItem('FAVORITE_CITY'))
    } else {
      navigator.geolocation.getCurrentPosition(async position => {

        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed(1)}&lon=${position.coords.longitude.toFixed(1)}&units=${STANDART_UNITS}&appid=${API_KEY}&lang=pt_br`)
          .then(async (res) => {
  
            const response = await res.json();
            setCityWeather(response)
            updateLocalTime();
  
          })
          .catch((err) => {
            console.log(err);
          })
      })
    }
  }, [])

  async function getWeatherFromCity(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${STANDART_UNITS}&q=${city}&appid=${API_KEY}&lang=pt_br`)
      .then(async (res) => {

        const cityWeather = await res.json()
        setCityWeather(cityWeather);
        console.log(cityWeather);

      })
      .catch((err) => {

        console.log(err);

      })

  }

  function searchWeather(event) {

    event.preventDefault();
    const input = document.querySelector("#cityInput");
    if (!input.value) return;
    const city = input.value;
    input.value = "";

    setTimeout(() => {

      getWeatherFromCity(city);
      updateLocalTime();
    }, 1000);

  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function updateLocalTime() {
    const time = new Date();
    const hours = time.getHours().toString();
    const minutes = time.getMinutes().toString().length == 2 ? time.getMinutes() : `0${time.getMinutes()}`;
    setCurrentTime(`${hours}:${minutes}`)
  }

  return (
    <>
      <HeaderWrapper>
        <button onClick={searchWeather}>
          <i className="bi bi-search"></i>
        </button>
        <input id="cityInput" placeholder="Digite a cidade..."></input>
      </HeaderWrapper>
      <ContentWrapper>
        <LeftColumnWrapper>
          <Box>
            <WeatherWrapper>
              <button onClick={async () => {
                setFavoriteButtonStatus(!favoriteButtonStatus);

                if (!localStorage.getItem('FAVORITE_CITY')) {
                  localStorage.setItem('FAVORITE_CITY', cityWeather.name);
                } 
                
                else {
                  localStorage.removeItem('FAVORITE_CITY')
                }
              }}>
                <i className={`bi bi-star${favoriteButtonStatus ? "-fill" : ''}`} name="Favoritar"></i>
              </button>
              <h1>{cityWeather ? `${cityWeather.cod == 404 ? "Cidade não encontrada. Tente novamente." : `Clima Em ${cityWeather.name}`}` : "Pesquise sua cidade"}</h1>
              <span className="time">{cityWeather.cod == 404 ? "" : `${currentTime ? `Às ${currentTime} do seu fuso-horário` : ''}`}</span>
              <span>{cityWeather.main ? `${cityWeather.main.temp.toFixed(1)}°C` : ''}</span>
              <p className="feels-like">{cityWeather.main? `RealFeel: ${cityWeather.main.feels_like.toFixed(1)}°C` : ''}</p>
              <p>{cityWeather ? `${cityWeather.cod == 404 ? "" : cityWeather.weather[0].description.capitalize()}`: ''}</p>
            </WeatherWrapper>
          </Box>
        </LeftColumnWrapper>
        <RightColumnWrapper>
          <Box>
            <WeatherSecondaryWrapper>
            <div>
              <i className="bi bi-arrows-collapse"></i>
              <span>{cityWeather.cod == 200 ? `Pressão: ${cityWeather.main.pressure} mb` : ''}</span>
            </div>
            <div>
              <i className="bi bi-droplet-half"></i>
              <span>{cityWeather.cod == 200 ? `Umidade: ${cityWeather.main.humidity}%` : ''}</span>
            </div>
            <div>
              <i className="bi bi-wind"></i>
              <span>{cityWeather.cod == 200 ? `Vento: ${((cityWeather.wind.speed) * 3.6).toFixed(1)} km/h` : ''}
                <svg data-testid="Icon" className="Icon--icon--3wCKh Icon--darkTheme--3iVDF" style={{transform: `rotate(${cityWeather.wind ? cityWeather.wind.deg : "0"}deg)`, width: "18px", marginLeft: '.5rem'}} set="current-conditions" name="wind-direction" theme="dark" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind Direction</title><path stroke="currentColor" fill="none" d="M18.467 4.482l-5.738 5.738a1.005 1.005 0 0 1-1.417 0L5.575 4.482l6.446 16.44 6.446-16.44z"></path></svg>
              </span>
            </div>
            </WeatherSecondaryWrapper>
          </Box>
        </RightColumnWrapper>
      </ContentWrapper>
    </>
  )
}