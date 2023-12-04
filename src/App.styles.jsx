import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media screen and (max-width: 800px) {
    padding: 10px;
  }
`;