import styled from "styled-components";

const LeftColumnWrapper = styled.div`
  width: 50%;
  display: inline-block;
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`

export default LeftColumnWrapper;