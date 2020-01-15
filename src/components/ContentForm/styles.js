import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  padding: 10px;

  label {
    display: block;
    font-size: 14px;
    color: #444444;
    font-weight: bold;
    margin: 7px 0;
  }

  input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #999;
    margin: 0 0 10px;
    font-size: 16px;

    &::placeholder {
      color: #999;
    }
  }

  span {
    color: ${colors.primary};
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;
