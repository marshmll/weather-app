import React from "react";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";

const Styles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    background: #0066cc;
    color: white;
    user-select: none;
  }

  .header {
    background: #00000050;
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }

  .header__search-btn {
    height: 2rem;
    width: 2rem;
    border: none;
    background-color: white;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    cursor: pointer;
  }

  .btn-search-icon {
    
  }

  .header__input {
    height: 2rem;
    width: 15rem;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border: none;
    outline: none;
  }

  .content {
    padding: 1rem 10%10%;
  }

  .weather-wrapper {
    background-color: #ffffff50;
    padding: 1rem .8rem;
    max-width: 500px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px #00000050;
  }

  .weather-data {
    display: flex;
    align-items: center;
    justify-content: space-between
  }

  .weather-temps-wrapper {
    text-align: start;
  }

  .weather-temperature {
    font-size: 70px;
    font-weight: 400;
  }

  .weather-illustration-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .weather-image {
    width: 3rem;
    height: 3rem;
    display: none;
    border: none;
    background-position: center;
  }

  .Clear {
    background: url("https://ssl.gstatic.com/onebox/weather/48/sunny.png");
    display: inline-block;
  }

  .Clouds {
    background: url("https://ssl.gstatic.com/onebox/weather/64/cloudy.png");
    display: inline-block;
    background-position: center;
    background-size: cover;
  }

  .Rain {
    background: url("https://ssl.gstatic.com/onebox/weather/48/rain.png");
    display: inline-block;
    background-position: center;
    background-size: cover;
  }
`;

export default function Home() {
  const API_KEY = "588d93379fb2561d21907bfeb9eeb8b7";
  const STANDART_UNITS = "metric";

  const [weather, setWeather] = React.useState({});
  const [currentWeatherIllustration, setCurrentWeatherIllustration] =
    React.useState("");
  const [translatedWeatherImageLabel, setTranslatedWeatherImageLabel] =
    React.useState("");

  async function getWeather(city) {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${STANDART_UNITS}&q=${city}&appid=${API_KEY}`
    ).then(async (response) => {
      const convertedResponse = await response.json();
      if (convertedResponse.cod == 404) {
        setWeather({
          name: "(cidade não encontrada.)",
        });
        setCurrentWeatherIllustration("");
        setTranslatedWeatherImageLabel("");
        return;
      }
      setWeather(convertedResponse);
      setCurrentWeatherIllustration(convertedResponse.weather[0].main);
      const translatedLabel = translateWeatherLabel(
        convertedResponse.weather[0].main
      );
      setTranslatedWeatherImageLabel(translatedLabel);
    });
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=${STANDART_UNITS}&lat=${position.coords.latitude.toFixed(
          1
        )}&lon=${position.coords.longitude.toFixed(1)}&appid=${API_KEY}`
      ).then(async (response) => {
        const convertedResponse = await response.json();
        setWeather(convertedResponse);
        setCurrentWeatherIllustration(convertedResponse.weather[0].main);
        const translatedLabel = translateWeatherLabel(
          convertedResponse.weather[0].main
        );
        setTranslatedWeatherImageLabel(translatedLabel);
      });
    });
  }, []);

  function translateWeatherLabel(label) {
    switch (label) {
      case "Clear":
        return "Sol";
      case "Clouds":
        return "Nuvens";
      default:
        return "";
    }
  }

  function searchWeather(event) {
    event.preventDefault();
    const input = document.querySelector("#cityInput");
    if (!input.value) return;
    setTimeout(() => {
      getWeather(input.value);
      input.value = "";
    }, 1000);
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        ></link>
      </Head>
      <Styles />
      <header className="header">
        <form>
          <button
            className="header__search-btn"
            type="submit"
            onClick={searchWeather}
          >
            <i className="btn-search-icon bi bi-search"></i>
          </button>
          <input
            className="header__input"
            placeholder="Pesquise sua cidade"
            id="cityInput"
          ></input>
        </form>
      </header>
      <div className="content">
        <section className="weather-wrapper">
          <h3>
            {weather.name
              ? `Clima em ${weather.name} ${
                  weather.sys ? `(${weather.sys.country})` : ""
                }`
              : "Pesquise sua cidade"}
          </h3>
          <div className="weather-data">
            <div className="weather-temps-wrapper">
              <h2 className="weather-temperature">
                {weather.main ? `${weather.main.temp.toFixed(1)}°C` : ":("}
              </h2>
              <p>
                {weather.main
                  ? `RealFeel: ${weather.main.feels_like.toFixed(1)}°C`
                  : ""}
              </p>
            </div>
            <div className="weather-illustration-wrapper">
              <div
                className={`weather-image ${currentWeatherIllustration}`}
              ></div>
              <span>{translatedWeatherImageLabel}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
