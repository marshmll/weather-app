import styled from "styled-components";

const WeatherWrapper = styled.section`
  position: relative;

  button {
    border: none;
    cursor: pointer;
    position: absolute;
    left: 100%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-weight: 400;
  }
  
  span {
    font-size: 80px;
    font-weight: 700;
  }

  p {
    font-size: 25px;
  }

  .time {
    font-size: 15px;
    display: block;
    font-weight: 200;
  }

  .feels-like {
    font-size: 16px;
  }
`

export default WeatherWrapper;