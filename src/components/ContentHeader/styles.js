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

  button,
  a {
    margin-left: auto;
  }

  a + div {
    margin-left: 15px;
  }
`;
