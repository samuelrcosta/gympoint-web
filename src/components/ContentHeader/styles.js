import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;

  h1 {
    font-family: 'Roboto';
    font-size: 24px;
    color: ${colors.textDark};
    font-weight: bold;
  }

  button {
    padding: 10px 20px;
    margin: 0;
    height: 38px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 8px;
    }
  }

  button,
  a {
    margin-left: auto;
  }

  a + div,
  a + button {
    margin-left: 15px;
  }
`;
