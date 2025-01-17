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

  input:not([id^='react-select']),
  select,
  textarea {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #999;
    margin: 0 0 10px;
    font-size: 16px;
    background: #fff;

    &::placeholder {
      color: #999;
    }
  }

  textarea {
    height: auto;
    padding: 15px;
    font-size: 15px;
  }

  input:read-only {
    background: rgba(0, 0, 0, 0.05);
  }

  span {
    color: ${colors.primary};
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;
