import React from 'react'
import Box from '../src/components/common/Box';
import HeaderWrapper from '../src/components/wrappers/HeaderWrapper';
import ContentWrapper from '../src/components/wrappers/ContentWrapper';
import LeftColumnWrapper from '../src/components/wrappers/LeftColumnWrapper';
import RightColumnWrapper from '../src/components/wrappers/RightColumnWrapper';
import WeatherWrapper from '../src/components/wrappers/WeatherWrapper';

export default function Home() {

  const API_KEY = '588d93379fb2561d21907bfeb9eeb8b7'
  const STANDART_UNITS = 'metric'
  const [cityWeather, setCityWeather] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState("");

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

      const time = new Date();
      setCurrentTime(`${time.getHours()}:${time.getMinutes()}`)
      getWeatherFromCity(city);

    }, 1000);

  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
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
              <span className="time">{cityWeather.cod == 404 ? "" : `${currentTime ? `Às ${currentTime}` : ''}`}</span>
              <span>{cityWeather.main ? `${cityWeather.main.temp.toFixed(1)}°C` : ''}</span>
              <p className="feels-like">{cityWeather.main? `RealFeel: ${cityWeather.main.feels_like.toFixed(1)}°C` : ''}</p>
              <p>{cityWeather ? `${cityWeather.cod == 404 ? "" : cityWeather.weather[0].description.capitalize()}`: ''}</p>
            </WeatherWrapper>
          </Box>
        </LeftColumnWrapper>
        <RightColumnWrapper>
          <Box>
           
          </Box>
        </RightColumnWrapper>
      </ContentWrapper>
    </>
  )
}