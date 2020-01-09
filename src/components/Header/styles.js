import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.nav`
  width: 100%;
  display: flex;
  border: 1px solid ${darken(0.05, colors.secondary)};
  border-top: 0;
  background: #fff;
  padding: 15px;

  ul {
    display: flex;
    align-items: center;

    li {
      margin: 0 12px;

      &:first-of-type {
        margin-left: 0;
      }

      a {
        font-size: 15px;
        color: #999999;
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;

export const LogoArea = styled.div`
  padding-right: 30px;
  margin-right: 30px;
  border-right: 1px solid ${darken(0.05, colors.secondary)};
`;

export const UserArea = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;

  strong {
    font-size: 14px;
    color: ${colors.textLight};
  }

  button {
    background: none;
    border: 0;
    font-size: 14px;
    color: #de3b3b;
  }
`;
