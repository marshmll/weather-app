import styled from "styled-components";

const WeatherSecondaryWrapper = styled.section`
  div {
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding: .5rem 0;
    span {
      margin-left: 1rem;
    }
  }

  section {
    display: inline-block;
  }

  span section {
    transition: cubic-bezier(0.215, 0.610, 0.355, 1) 1s;
    margin-left: .8rem;
  }
`;

export default WeatherSecondaryWrapper;