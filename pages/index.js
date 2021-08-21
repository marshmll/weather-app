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
  const [currentTime, setCurrentTime] = React.useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed(4)}&lon=${position.coords.longitude.toFixed(4)}&units=${STANDART_UNITS}&appid=${API_KEY}&lang=pt_br`)
        .then(async (res) => {
          const response = await res.json();
          setCityWeather(response)
          updateLocalTime();
        })
    })
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
              <h1>{cityWeather ? `${cityWeather.cod == 404 ? "Cidade não encontrada. Tente novamente." : `Clima Em ${cityWeather.name}`}` : "Pesquise sua cidade"}</h1>
              <span className="time">{cityWeather.cod == 404 ? "" : `${currentTime ? `Às ${currentTime} do seu fuso-horário.` : ''}`}</span>
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
                <section style={{transform: `rotate(calc(311deg ${cityWeather.cod == 200 ? `- ${cityWeather.wind.deg}deg` : ""}))`}}>
                  <i className="bi bi-cursor"></i>
                </section>
              </span>
            </div>
            </WeatherSecondaryWrapper>
          </Box>
        </RightColumnWrapper>
      </ContentWrapper>
    </>
  )
}