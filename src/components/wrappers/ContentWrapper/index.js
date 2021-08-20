import styled from "styled-components";

const ContentWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  @media screen and (max-width: 768px) {
    flex-direction:column;
    align-items: center;
  }
`;

export default ContentWrapper;