import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #00000075;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;

  button {
    height: 2rem;
    width: 2rem;
    border: none;
    background-color: white;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    cursor: pointer;
  }

  input {
    height: 2rem;
    width: 15rem;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border: none;
    outline: none;
  }
`
export default HeaderWrapper;