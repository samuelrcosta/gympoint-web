import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 30px auto;
  text-align: center;
  background: #fff;
  padding: 45px 30px;
  border-radius: 4px;

  img {
    max-width: 153px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      text-align: left;
      text-transform: uppercase;
      font-weight: bold;
      color: #444;
      margin: 7px 0;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #999;
      margin: 0 0 10px;

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

    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
